'use strict';
var ES6Promise = require( 'es6-promise' ).Promise;
var moment = require( 'moment' );
var extend = require( 'extend' );

module.exports = {
  dirname: __dirname,
  _getOverrideOptions: function ( opts ) {

    return {
      watch: opts.watch,
      watchDelay: opts.watchDelay,
      banner: opts.banner,
      minimize: opts.minimize,
      revision: opts.revision,
      assetsPathFormat: opts.assetsPathFormat,
      copyAssets: opts.copyAssets,
      browsers: opts.browsers,
      advanceMin: opts.advanceMin
    };
  },
  processTargets: function ( dataEntry, cli ) {
    var me = this;

    var _files = dataEntry.files || [ ];
    cli.log( dataEntry.name, 'start!' );

    var options = extend( true, dataEntry.options, me._getOverrideOptions( cli.opts ) );

    return _files.reduce( function ( seq, data ) {
      return seq.then( function () {
        return me.processTarget( data, options, cli ).then( function () {
          cli.log( dataEntry.name, 'done!' );
        } );
      } );
    }, ES6Promise.resolve() );
  },
  processTarget: function ( data, opts, cli ) {
    var me = this;
    return new ES6Promise( function ( resolve, reject ) {

      var path = require( 'path' );
      var process = require( './../lib/process' );

      var files = data.src.map( function ( file ) {
        return path.resolve( data.cwd || process.cwd(), file );
      } );

      if ( files.length === 0 ) {
        //console.log( chalk.green( '>> no files to beautify' ) );
        cli.error( 'No files provided as input', data.src, '\n' );
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
          //return;
          }
          resolve();
        }, reject );
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

      me.removeWatchers.push( removeWatcher );

      cli.subtle( 'options', opts );

      startProcess();
    } );
  },
  run: function ( cli ) {
    var cliOpts = cli.opts;
    var simplessArgs = {
      options: {}
    };

    var targets = [ ];
    var me = this;

    me.removeWatchers = [ ];

    process.on( 'uncaughtException', function () {
      me.removeWatchers.forEach( function ( fn ) {
        fn && fn();
      } );
    } );

    process.on( 'beforeExit', function () {
      me.removeWatchers.forEach( function ( fn ) {
        fn && fn();
      } );
    } );

    if ( cliOpts.config ) {
      var config = cli.getConfig();

      if ( config ) {
        extend( true, simplessArgs, config );
      }
      targets = targets.concat( cli.getTargets( simplessArgs, cliOpts.target ) );
    } else {
      targets = [
        {
          name: 'default',
          files: [
            {
              src: cli.expandGlobs( cliOpts._ ),
              dest: cliOpts.output
            }
          ]
        }
      ];
    }

    var p = targets.reduce( function ( seq, dataEntry ) {
      return seq.then( function () {
        return me.processTargets( dataEntry, cli );
      } );
    }, ES6Promise.resolve() );

    p.then( function () {
      //if ( !opts.watch ) {
      cli.ok( 'simpless done!' );
    //}
    }, function ( err ) {
      //cli.error( err,  );
      setTimeout( function () {
        throw err;
      }, 0 );
    // nodeProcess.exit(1);
    } );
  }
};
