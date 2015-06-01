module.exports = function ( css, options ) {
  var postcss = require( 'postcss' );
  var extend = require( 'extend' );

  var opts = extend( true, {
    autoprefixer: {
      browsers: [
        'last 2 versions'
      ]
    },
    dest: '',
    file: ''
  }, options );

  return postcss( [
    require( 'autoprefixer-core' )( opts.autoprefixer )
  ] )
    .process( css, {
      from: opts.file, to: opts.dest
    } ).then( function ( result ) {
    return result.css;
  } );
};
