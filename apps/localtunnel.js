module.exports = function(logger, port) {
var localtunnel = require('localtunnel');

var tunnel = localtunnel(port, function(err, tunnel) {
    if (err) logger.info("Error")

    // the assigned public url for your tunnel
    // i.e. https://abcdefgjhij.localtunnel.me
    logger.info("tunnel url " + tunnel.url)
});

tunnel.on('close', function() {
    // tunnels are closed
    logger.info("tunnel closed")
});
}
