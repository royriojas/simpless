describe( 'lib', function () {
  var expand = require( 'glob-expand' );
  //var write = require('write').sync;
  var read = require( 'read-file' ).readFileSync;
  var path = require( 'path' );

  describe( 'strip-comments', function () {
    var stripComments = require( '../../lib/strip-comments' );

    var fixtures = expand( path.resolve( __dirname, './fixtures/**/*.less' ) );

    fixtures.forEach( function ( file ) {
      it( 'should remove the comments from the given input, file: ' + file, function () {
        var expected = stripComments( read( file ) );
        var result = read( path.join( __dirname, './expected/', path.basename( file ) ) );
        //write(path.join(__dirname, './expected', path.basename(file)), expected);
        expect( expected ).to.equal( result );
      } );
    } );
  } );
} );
