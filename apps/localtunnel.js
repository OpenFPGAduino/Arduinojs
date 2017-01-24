module.exports = function(logger, port, app, router) {
    var localtunnel = require('localtunnel');
    router.post('/start', function(req, res) {
        var tunnel = localtunnel(port, function(err, tunnel) {
            if (err) logger.error("Error")

            // the assigned public url for your tunnel
            // i.e. https://abcdefgjhij.localtunnel.me
            logger.info("Tunnel url " + tunnel.url)
            res.json({
                url: tunnel.url
            });
        });
        tunnel.on('error', function() {
            // tunnels are error
            logger.info("Tunnel error")
        });

        tunnel.on('close', function() {
            // tunnels are closed
            logger.info("Tunnel closed")
        });
    });
    app.use('/fpga', router);
}
