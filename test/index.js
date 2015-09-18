var expect = require( 'chai' ).expect;
var prefixer = require( '../' );
var File = require( 'gulp-util' ).File;

describe( 'my-plugin', function() {
  describe( 'prefixer()', function() {
    it( 'prepends prefixText to the file contents', function(done) {
      var stream = prefixer( 'foo' );
      stream.on( 'data', function(prefixedFile) {
        expect( String( prefixedFile.contents ) ).to.eq( 'foobar' );
      } );

      stream.on( 'end', done );

      stream.write( new File( {
        contents: new Buffer( 'bar' )
      } ) );

      stream.end();
    } );

    it( 'throws an error when prefixTest is not supplied', function() {
      function noprefix() { prefixer(); }
      expect( noprefix ).to.throw( 'Missing prefix text!' );
    } );
  } );
} );