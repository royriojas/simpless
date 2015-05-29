var Promise = require( 'es6-promise' ).Promise;
var read = require( 'read-file' ).readFileSync;
var extend = require( 'extend' );

module.exports = function ( file, options ) {
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

  opts.paths = opts.paths.concat( [
    '.',
    path.dirname( file )
  ] );

  var content = read( file );

  return new Promise( function ( resolve, reject ) {
    less.render( content, opts, function ( err, output ) {
      //console.log('output', output);
      if ( err ) {
        var msg = err.message;
        if ( err.line ) {
          msg += ', line ' + err.line;
        }
        if ( err.column ) {
          msg += ', column ' + err.column;
        }
        if ( err.extract ) {
          msg += ': "' + err.extract + '"';
        }
        //console.log( msg, file, err.line );
        reject( new Error( msg, file, err.line ) );
        return;
      }

      var compiled = output.css;

      resolve( compiled );
    } );
  } );
};
