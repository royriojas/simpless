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

  var getLimits = function ( max, count, idx ) {
    var begin, end;

    begin = idx - count;
    begin = begin > 0 ? begin : 0;

    end = idx + count;
    end = end > max ? max : end;

    return { begin: begin, end: end };
  };

  return postcss( [
    require( 'autoprefixer-core' )( opts.autoprefixer )
  ] )
    .process( css, { from: opts.file, to: opts.dest } ).then( function ( result ) {
    return result.css;
  } ).catch( function ( err ) {
    //console.log(err.reason, err.file, err.source.split('\n')[err.line - 1] );
    //console.log(Object.keys(err));

    var lines = err.source.split( '\n' );
    var errLine = err.line - 1;
    var limits = getLimits( lines.length, 5, errLine );

    var msg = [
      'Error applying autoprefixer',
      'Reason: ' + err.reason,
      'File: ' + err.file,
      'Extract:',
      '\n' + lines.slice( limits.begin, errLine + 1 ).join( '\n' ),
      ( new Array( err.column ).join( '^' )) + '^',
      '\n' + lines.slice( errLine + 1, limits.end ).join( '\n' ) + '\n'
    ];

    throw new Error( msg.join( '\n' ) );
  } );
};
