describe( 'lib', function () {
  var expand = require( 'glob-expand' );
  //var write = require('write').sync;
  var read = function ( path ) {
    return require( 'fs' ).readFileSync( path, { encoding: 'utf8' } );
  };

  var path = require( 'path' );

  describe( 'strip-comments', function () {
    var stripComments = require( '../../lib/strip-comments' );

    var fixtures = expand( path.resolve( __dirname, './strip-comments/fixtures/**/*.less' ) );

    fixtures.forEach( function ( file ) {
      it( 'should remove the comments from the given input, file: ' + file, function () {
        var expected = stripComments( read( file ) );
        var result = read( path.join( __dirname, './strip-comments/expected/', path.basename( file ) ) );
        //write(path.join(__dirname, './expected', path.basename(file)), expected);
        expect( expected ).to.equal( result );
      } );
    } );
  } );
} );
