'use strict';

module.exports = {
  dirname: __dirname,
  run: function ( cli ) {
    var expand = require( 'glob-expand' );
    //var console = require( './../lib/console' );
    var extend = require( 'extend' );

    var path = require( 'path' );
    var process = require( './../lib/process' );
    //var watcher = require('../lib/watcher')

    var opts = cli.opts;

    var files = opts._.map( function ( glob ) {
      return path.resolve( process.cwd(), glob );
    } );

    files = expand.apply( null, files );

    if ( files.length === 0 ) {
      //console.log( chalk.green( '>> no files to beautify' ) );
      cli.error( 'No files provided as input', opts._, '\n' );
      cli.showHelp();
      return;
    }

    if ( !opts.output ) {
      cli.error( 'Output not specified' );
      cli.showHelp();
      return;
    }

    var simplessOpts = {
      watch: opts.watch,
      watchDelay: opts.watchDelay,
      banner: opts.banner,
      minimize: opts.minimize,
      revision: opts.revision,
      assetsPathFormat: opts.assetsPathFormat,
      copyAssetsToDestFolder: opts.copyAssetsTo,
      autoprefixer: {
        browsers: opts.browsers
      },
      cssoOptions: {
        structureModifications: opts.advanceMin
      }
    };

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
      dest: path.resolve( process.cwd(), opts.output )
    }, simplessOpts );

    //var util = require( 'util' );

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
        if ( opts.watch ) {
          cli.ok( 'Watching for changes...' );
          return;
        }
        cli.ok( 'Done!' );
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

    var removeWatcher = function () {
      simpless.closeWatcher && simpless.closeWatcher();
    };

    process.on( 'uncaughtException', removeWatcher );
    process.on( 'beforeExit', removeWatcher );

    cli.subtle( 'options', opts );

    startProcess();

  }
};
