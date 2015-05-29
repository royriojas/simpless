module.exports = function ( css, file, dest ) {
  var postcss = require( 'postcss' );

  return postcss( [
    require( 'autoprefixer-core' )( {
      browsers: [
        'last 2 versions'
      ]
    } )
  ] )
    .process( css, {
      from: file, to: dest
    } ).then( function ( result ) {
    return result.css;
  } );
};
