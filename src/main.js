'use strict';
var ES6Promise = require( 'es6-promise' ).Promise;
var moment = require( 'moment' );

module.exports = {
  dirname: __dirname,
  processTarget: function ( data, opts, cli ) {
    return new ES6Promise( function ( resolve, reject ) {
      var expand = require( 'glob-expand' );
      //var console = require( './../lib/console' );
      var extend = require( 'extend' );

      var path = require( 'path' );
      var process = require( './../lib/process' );

      var src = Array.isArray( data.src ) ? data.src : [ data.src ];

      var files = src.map( function ( glob ) {
        return path.resolve( process.cwd(), glob );
      } );

      files = expand.apply( null, files );

      if ( files.length === 0 ) {
        //console.log( chalk.green( '>> no files to beautify' ) );
        cli.error( 'No files provided as input', src, '\n' );
        cli.showHelp();
        return resolve();
      }

      var simplessOpts = {
        watch: opts.watch,
        watchDelay: opts.watchDelay,
        banner: opts.banner,
        minimize: opts.minimize,
        revision: opts.revision,
        assetsPathFormat: opts.assetsPathFormat,
        copyAssetsToDestFolder: opts.copyAssets,
        autoprefixer: {
          browsers: opts.browsers
        },
        cssoOptions: {
          structureModifications: opts.advanceMin
        }
      };

      if ( !data.dest ) {
        cli.error( 'Output not specified' );
        cli.showHelp();
        return resolve();
      }

      var userFns = require( '../lib/default-user-fns' );

      if ( opts.userFunctions ) {
        try {
          extend( userFns, require( path.resolve( process.cwd(), opts.userFunctions ) ) );
        } catch (ex) {
          cli.subtle( 'Error loading custom functions', ex );
        }
      }

      simplessOpts.userFns = userFns;

      var simpless = require( '../lib/watcher' ).create( {
        src: files,
        dest: path.resolve( process.cwd(), data.dest )
      }, simplessOpts );

      simpless.on( 'error', function ( e, err ) {
        cli.error( 'Error parsing less file\n\n', err.message );
      } );

      simpless.on( 'resource:copied', function ( e, args ) {
        cli.print( '\nresource copied\n- from:  ' + args.from + '\n- to:  ' + args.to + '\n' );
      } );

      simpless.on( 'url:replaced', function ( e, args ) {
        cli.print( '\rurl replaced\n- from:  ' + args.from + '\n- to:  ' + args.to );
      } );

      var startTime;
      var startProcess = function () {
        startTime = Date.now();
        simpless.process().then( function () {
          if ( simplessOpts.watch ) {
            cli.print( '' );
            cli.success( '[' + moment().format( 'MM/DD/YYYY HH:mm:ss' ) + ']', '...Simpless waiting for changes...\n\n' );
            return;
          }
          cli.ok( 'Done!' );
          resolve();
        } );
      };

      simpless.on( 'write:file write:minimized', function ( e, args ) {
        var now = Date.now();
        var delta = now - startTime;
        startTime = now;
        (e.type === 'write:file') && cli.print( '' );
        cli.success( 'File written:', args.dest, delta + 'ms' );
      } );

      simpless.on( 'deps:changed', function ( e, args ) {
        cli.subtle( 'files changed', '\n   - ' + args.files.join( '\n   - ' ) );
        startProcess();
      } );

      simpless.one( 'watch:start', function ( e, args ) {
        cli.print( '' );
        cli.subtle( 'watch mode started.', '\n\n', 'watching the following files\n   - ' + args.files.join( '\n   - ' ), '\n\n' );
      } );

      var removeWatcher = function ( err ) {
        simpless.closeWatcher && simpless.closeWatcher();
        if ( !opts.watch ) {
          reject( err );
        }
      };

      process.on( 'uncaughtException', removeWatcher );
      process.on( 'beforeExit', removeWatcher );

      cli.subtle( 'options', opts );

      startProcess();
    } );
  },
  run: function ( cli ) {
    var opts = cli.opts;

    if ( opts.config ) {
      cli.subtle( 'config option set', opts.config );
    }

    var data = { src: cli.opts._, dest: cli.opts.output };

    var me = this;
    me.processTarget( data, opts, cli );
  }
};
