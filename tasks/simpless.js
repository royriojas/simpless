module.exports = function ( grunt ) {
  var path = require( 'path' );
  var extend = require( 'extend' );
  var moment = require( 'moment' );
  var ES6Promise = require( 'es6-promise' ).Promise;

  grunt.registerMultiTask( 'simpless', function ( watch ) {
    var me = this;
    var logger = require( 'clix-logger/logger' );
    var verbose = grunt.option('verbose');

    var done = me.async();

    var opts = me.options( {
      banner: null,
      watch: watch === 'watch',
      watchDelay: false,
      revision: null,
      assetsPathFormat: 'assets/{REVISION}_{GUID}_{FNAME}',
      copyAssets: true,
      browsers: 'last 2 versions',
      advanceMin: true,
      userFns: {}
    } );

    opts.userFns = extend( true, require( '../lib/default-user-fns' ), opts.userFns );

    var fileEntries = me.files || [ ];
    var banner = grunt.template.process( opts.banner );

    var p = fileEntries.reduce( function ( seq, data ) {
      return seq.then( function () {
        return new ES6Promise( function ( resolve ) {
          var util = require( 'util' );

          var simpless = require( '../lib/watcher' ).create( {
            src: data.src,
            dest: path.resolve( data.dest )
          }, {
            banner: banner,
            watch: opts.watch,
            watchDelay: opts.watchDelay || 600,
            minimize: opts.minimize,
            revision: opts.revision,
            assetsPathFormat: opts.assetsPathFormat,
            copyAssetsToDestFolder: opts.copyAssetsToDestFolder,
            autoprefixer: {
              browsers: opts.browsers
            },
            cssoOptions: {
              structureModifications: opts.advanceMin
            },
            userFns: opts.userFns
          } );

          simpless.on( 'error', function ( e, err ) {
            if ( opts.watch ) {
              logger.error( 'Error parsing less file\n\n', err.message );
              return;
            }
            logger.error( 'Error parsing less file' );
            grunt.fail.fatal( err.message );
          } );

          simpless.on( 'resource:copied', function ( e, args ) {
            verbose && logger.print( '\nresource copied\n- from:  ' + args.from + '\n- to:  ' + args.to + '\n' );
          } );

          simpless.on( 'url:replaced', function ( e, args ) {
            verbose && logger.print( '\rurl replaced\n- from:  ' + args.from + '\n- to:  ' + args.to );
          } );

          simpless.on( 'write:file write:minimized', function ( e, args ) {
            var now = moment();
            logger.ok( 'File written:', args.dest, 'Time required:', now.diff( start ) + 'ms' );
            start = now;
            if ( !opts.minimize && e.type === 'write:file' ) {
              resolve();
              return;
            }
            if ( opts.minimize && e.type === 'write:minimized' ) {
              resolve();
            }
          } );

          var startProcess = function () {
            start = moment();
            simpless.process();
          };

          simpless.on( 'deps:changed', function ( e, args ) {
            logger.subtle( 'files changed', '\n   - ' + args.files.join( '\n   - ' ) );
            startProcess();
          } );

          simpless.one( 'watch:start', function ( e, args ) {
            logger.subtle( '\n\nWatching the following files\n   - ' + args.files.join( '\n   - ' ), '\n\n' );
          } );

          logger.subtle( 'options', util.inspect( opts ) );

          startProcess();
        } );
      } );
    }, ES6Promise.resolve() );

    p.then( function () {
      if ( opts.watch ) {
        //var moment = require( 'moment' );
        logger.print('');
        logger.subtle( '[' + moment().format( 'MM/DD/YYYY HH:mm:ss' ) + ']', '...Waiting for changes...\n\n' );
        return;
      }
      done();
    }, function (err) {
      logger.error(err);
      throw err;
    } );

  } );
};
