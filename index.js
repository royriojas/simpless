var dispatcher = require( 'dispatchy' );
var extend = require( 'extend' );
var os = require( 'os' );
var compileLess = require( './lib/compile-less' );
var write = require( 'write' ).sync;
var Promise = require( 'es6-promise' ).Promise;
var path = require( 'path' );
var url = require( 'url' );
var format = require( 'stringformat' );
var fs = require( 'fs-extra' );
var autoPrefix = require( './lib/autoprefix' );

var isNull = function ( val ) {
  return typeof val === 'undefined' || val === null;
};

var trim = function ( str ) {
  return (str || '').trim();
};

var makeMinName = function ( fileName ) {
  var rgex = /(.+)\.(\w+)$/gi;
  return fileName.replace( rgex, '$1.min.$2' );
};

var addVersion = function ( fileName, version ) {
  if ( !version ) {
    return fileName;
  }
  var rgex = /(.+)\.(\w+)$/gi;
  return fileName.replace( rgex, '$1.' + version + '.$2' );
};

/**
 * check if this is a relative (to the document) url
 *
 * We need to rewrite if the url is relative. This function will return false if:
 * - starts with "/", cause it means it is relative to the main domain
 * - starts with "data:", cause it means is a data uri
 * - starts with a protocol
 *
 * in all other cases it will return true
 *
 * @param urlToCheck the url to test
 * @returns {boolean}
 */
var checkIfRelativePath = function ( urlToCheck ) {
  var DATA_URI_MATCHER = /^data:/gi, //regex to test for an url with a data uri
    PROTOCOL_MATCHER = /^http|^https:\/\//gi, //regex to test for an url with an absolute path
    RELATIVE_TO_HOST_MATCHER = /^\//g; //regex to test for an url relative to the host

  return urlToCheck.match( DATA_URI_MATCHER ) ? false : urlToCheck.match( RELATIVE_TO_HOST_MATCHER ) ? false : !urlToCheck.match( PROTOCOL_MATCHER );
};

module.exports = {
  create: function () {
    var fileCache = {};
    var idCounter = 0;

    return extend( dispatcher.create(), {
      getId: function ( pathToFile ) {
        var id = fileCache[ pathToFile ] = fileCache[ pathToFile ] || idCounter++;
        return id;
      },
      rewriteURLS: function ( ctn, src, destDir, options ) {
        var me = this;
        var URL_MATCHER = /url\(\s*[\'"]?\/?(.+?)[\'"]?\s*\)/gi; //regex used to match the urls inside the less or css files

        var version = options.revision;
        var rewritePathTemplate = options.assetsPathFormat;

        if ( !isNull( ctn ) ) {
          ctn = ctn.replace( URL_MATCHER, function ( match, foundURL ) {
            foundURL = trim( foundURL );
            var needRewrite = checkIfRelativePath( foundURL );

            if ( needRewrite ) {
              var pathToFile = me.copyFileToNewLocation( src, destDir, foundURL, version, rewritePathTemplate );

              var outputPath = format( 'url({0})', pathToFile );
              //verbose.writeln( format( '===> This url will be transformed : {0} ==> {1}', url, outputPath ) );
              me.fire( 'url:transformed', {
                from: foundURL,
                to: outputPath
              } );

              return outputPath;
            }

            return match;
          } );
        }

        return ctn;
      },
      copyFileToNewLocation: function ( src, destDir, relativePathToFile, version, rewritePathTemplate ) {
        rewritePathTemplate = rewritePathTemplate || '';

        var me = this;
        var dirOfFile = path.dirname( src );

        var urlObj = url.parse( relativePathToFile );
        var relativePath = trim( urlObj.pathname );
        var lastPart = trim( urlObj.search ) + trim( urlObj.hash );

        if ( relativePath === '' ) {
          throw new Error( 'Not a valid url' );
        }

        var absolutePathToResource = path.normalize( path.resolve( dirOfFile, relativePath ) );

        var fileId = me.getId( absolutePathToResource ); //md5( absolutePathToResource );

        var fName = format( '{0}', path.basename( relativePath ) );

        var relativeOutputFn = rewritePathTemplate.replace( /\{REVISION\}/g, version ) // fileId, fName );
          .replace( /\{GUID\}/g, fileId )
          .replace( /\{FNAME\}/g, fName );

        var newPath = path.normalize( path.join( destDir, relativeOutputFn ) );

        fs.copySync( absolutePathToResource, newPath );

        me.fire( 'resource:copied', {
          from: absolutePathToResource,
          to: newPath
        } );

        var outName = relativeOutputFn + lastPart;

        me.fire( 'url:replaced', {
          from: relativePathToFile,
          to: outName
        } );

        return outName;
      },
      process: function ( descriptor, options ) {
        var me = this;

        var opts = extend( true, {
          banner: '',
          copyAssetsToDestFolder: true,
          revision: '',
          minimize: false,
          assetsPathFormat: 'assets/{REVISION}_{GUID}_{FNAME}',
          autoprefixer: {
            browsers: [
              'last 2 versions'
            ]
          },
          lessOptions: {
            paths: [],
            relativeUrls: true,
            compress: false,
            dumpLineNumbers: 'comments'
          },
          userFns: {},
          cssoOptions: {
            structureModifications: false
          }
        }, options );

        var src = Array.isArray( descriptor.src ) ? descriptor.src : [
          descriptor.src
        ];
        var dest = descriptor.dest;

        dest = addVersion( dest, opts.revision );

        me.fire( 'compile:start', {
          descriptor: descriptor,
          modifiedDest: dest,
          options: opts
        } );

        var promises = src.map( function ( file ) {
          me.fire( 'compile:file', {
            file: file
          } );
          return compileLess( file, opts.lessOptions, opts.userFns ).then( function ( result ) {

            if ( opts.copyAssetsToDestFolder ) {
              result = me.rewriteURLS( result, file, path.dirname( dest ), opts );
            }

            return autoPrefix( result, {
              file: file,
              dest: dest,
              autoprefixer: opts.autoprefixer
            } );
          } );
        } );

        return Promise.all( promises ).then( function ( results ) {
          results = results || [];
          var args = {
            results: results
          };

          me.fire( 'compile:end', args );

          me.fire( 'before:write', extend( args, {
            dest: dest
          } ) );

          if ( args.cancel ) {
            return;
          }

          var result = args.results.join( os.EOL );

          var banner = opts.banner ? opts.banner + os.EOL : '';

          write( dest, (banner + result ) );

          me.fire( 'write:file', args );

          if ( opts.minimize ) {
            var csso = require( 'csso' );
            var cssoOptions = opts.cssoOptions || {};
            var minimized = csso.justDoIt( result, !!cssoOptions.structureModifications );
            var minimizedDest = makeMinName( dest );

            write( minimizedDest, (banner + minimized ) );

            me.fire( 'write:minimized', extend( {}, args, {
              dest: minimizedDest
            } ) );
          }
        } ).catch( function ( err ) {
          //console.log(err);
          me.fire( 'error', err );
          //throw err;
        } );
      }
    } );
  }
};
