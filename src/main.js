'use strict';

module.exports = {
  dirname: __dirname,

  run: function ( cli ) {
    var expand = require( 'glob-expand' );
    //var console = require( './../lib/console' );
    var extend = require( 'extend' );

    //var sFormat = require( 'stringformat' );
    var path = require( 'path' );
    var process = require( './../lib/process' );

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

    var simpless = require( '../index' ).create();
    var util = require( 'util' );

    simpless.on( 'error', function ( e, err ) {

      cli.error( 'Error parsing less file\n\n', util.inspect( err ) );
    } );

    simpless.on( 'resource:copied', function ( e, args ) {
      cli.subtle( 'resource copied from:', args.from, 'to:', args.to );
    } );

    simpless.on( 'url:replaced', function ( e, args ) {
      cli.subtle( 'url replaced from:', args.from, 'to:', args.to );
    } );

    simpless.on( 'write:file write:minimized', function ( e, args ) {
      cli.ok( 'File written:', args.dest );
    } );

    cli.subtle( 'options', util.inspect( opts ) );

    var simplessOpts = {
      banner: opts.banner,
      minimize: opts.minimize,
      revision: opts.revision,
      assetsPathFormat: opts.assetsPathFormat,
      copyAssetsToDestFolder: opts.copyAssetsToDestFolder,
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

    simpless.process( {
      src: files,
      dest: path.resolve( process.cwd(), opts.output )
    }, simplessOpts );
  }
};
