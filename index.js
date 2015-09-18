var through = require( 'through2' );
var gutil = require( 'gulp-util' );
var PluginErr = gutil.PluginError;

var PLUGIN_NAME = 'my-plugin';

function myPlugin(prefixText) {
  if (!prefixText) {
    throw new PluginErr( PLUGIN_NAME, 'Missing prefix test!' );
  }

  prefixText = new Buffer( prefixText );

  var stream = through.obj( function(file, enc, callback) {
    if (file.isBuffer()) {
      file.contents = Buffer.concat( [prefixText, file.contents] );
      callback( null, file );
      return;
    }

    if (file.isStream()) {
      var streamer = prefixStream( prefixText );
      streamer.on( 'error', this.emit.bind( this, 'error' ) );
      file.contents = file.contents.pipe( streamer );
    }

    callback( null, file );
  } );

  return stream;
}

function prefixStream(prefixText) {
  var stream = through();
  stream.write( prefixText );
  return stream;
}

module.exports = myPlugin;