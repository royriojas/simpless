module.exports = {
  create: function ( descriptor, options ) {

    var simpless = require( '../index' ).create( descriptor, options );

    if ( options.watch ) {
      var chokidar = require( 'chokidar' );
      var filesToWatch = { };
      var watcher;

      var debouncy = require( 'debouncy' );
      var changedFiles = [ ];

      var debouncedNotify = debouncy( function () {
        var cache = require( 'less/lib/less/imports-cache' );
        var _changedFiles = Object.keys( changedFiles );

        cache.removeEntries( _changedFiles );

        simpless.fire( 'deps:changed', { files: _changedFiles } );
        changedFiles = { };
      }, options.watchDelay );

      simpless.on( 'compile:end', function ( e, args ) {
        var files = args.referencedFiles || [ ];

        files.forEach( function ( file ) {

          if ( filesToWatch[ file ] ) {
            return;
          }

          if ( !watcher ) {
            watcher = chokidar.watch( file, { persistent: true } );

            watcher.setMaxListeners( 0 );
            watcher.on( 'error', simpless.fire.bind( simpless, 'watch:error' ) );
            watcher.on( 'unlink', function ( path ) {
              delete changedFiles[ path ];
              watcher.unwatch( path );
            } );
            watcher.on( 'change', function ( path ) {
              changedFiles[ path ] = true;
              debouncedNotify();
            } );
          } else {
            watcher.add( file );
          }

          filesToWatch[ file ] = true;
        } );

        if ( watcher ) {
          simpless.fire( 'watch:start', { files: files } );
        }

      } );
    }

    simpless.closeWatcher = function () {
      watcher && watcher.close();
    };

    return simpless;
  }
};
