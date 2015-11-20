var Promise = require( 'es6-promise' ).Promise;
var trim = require( 'jq-trim' );

var read = function ( path ) {
  return require( 'fs' ).readFileSync( path, { encoding: 'utf8' } );
};

var extend = require( 'extend' );
var typeOf = require( './type-of' );

module.exports = function ( file, options, userFns ) {
  userFns = userFns || { };

  var path = require( 'path' );
  var less = require( 'less' );

  var inlineUrlsPlugin = require( 'less-plugin-inline-urls' );

  var opts = {
    paths: [],
    compress: false,
    relativeUrls: true,
    filename: file,
    plugins: [
      require( 'less-plugin-glob' ),
      inlineUrlsPlugin
    ]
  };

  extend( true, opts, options );

  opts.paths = opts.paths.concat( [ '.', path.dirname( file ) ] );

  var content = trim( opts.content );

  if ( !content ) {
    content = read( file );
  }

  delete opts.content;

  Object.keys( userFns ).forEach( function ( name ) {
    less.functions.functionRegistry.add( name.toLowerCase(), function () {
      var res = userFns[ name ].apply( less, arguments );
      return typeOf( res ) === 'object' ? res : new less.tree.Anonymous( res );
    } );
  } );

  return new Promise( function ( resolve, reject ) {
    less.render( content, opts, function ( err, output ) {
      //console.log('output', output);
      if ( err ) {
        var msg = err.message + '\n\n';
        msg += '  file:  ' + path.resolve( err.filename ) + ':' + err.line + ':' + err.column + '\n\n';

        if ( err.extract ) {
          msg += '  Extract: \n' + (Array.isArray( err.extract ) ? err.extract.join( '\n' ) : err.extract);
        }
        //console.log( require( 'util' ).inspect( err, output ) );

        reject( new Error( msg ) );
        return;
      }

      var compiled = output;

      resolve( compiled );
    } );
  } );
};
