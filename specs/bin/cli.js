describe( 'bin/esbeautifier', function () {
  var proxyquire = require( 'proxyquire' ).noCallThru().noPreserveCache();


  beforeEach( function () {
    var me = this;
    me.mainMock = me.sandbox.createSpyObj( 'main', [
      'run'
    ] );
  } );

  it( 'should launch the main module run method', function () {
    var me = this;

    proxyquire( '../../bin/cli', {
      '../src/main': me.mainMock,
      './process': {
        argv: [
          'node',
          './bin/cli',
          'src/**/*.js'
        ],
        cwd: function () {
          return './';
        },
        '@runtimeGlobal': true
      }
    } );

    expect( me.mainMock.run.args[ 0 ][ 0 ].opts._ ).to.deep.equal( [
      'src/**/*.js'
    ] );

    expect( me.mainMock.run ).to.have.been.called;
  } );
} );
