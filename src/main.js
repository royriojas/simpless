'use strict';

module.exports = {
  dirname: __dirname,

  run: function ( cli ) {
    var expand = require( 'glob-expand' );
    var console = require( './../lib/console' );

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
      cli.error( 'No files provided as input', opts._);
      return;
    }

    var cfg = {};

    if (cli.pathToConfig && cli.pathToConfig.match(/\.js$/)) {
      try {
        cfg = require( path.resolve( process.cwd(), cli.pathToConfig) );
      }
      catch(ex) {
        cli.error('Error requiring the module: ' + cli.pathToConfig);
      }
    }
    else {
      // assume JSON here
      cfg = cli.getConfig();
    }

    var simpless = require('../index').create();

    simpless.on('error', function (e, err) {

      cli.error('Error parsing less file\n\n', require('util').inspect(err));
    });

    simpless.on('before:write', function (args) {
      args.cancel = cli.opts.output;
    });

    simpless.process({
      src: files,
      dest: path.resolve(process.cwd(), cli.opts.output)
    }, cfg.simpless || {}  );
  }
};
