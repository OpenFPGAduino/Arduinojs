module.exports = function(app, logger, router, argv) {
    logger.info('module tty');

    if (argv.sim) {
        logger.debug("Skip fpga module for simulation");
        return;
    }

    var tty = require('tty.js');
    var ttyserver = tty.createServer({
        shell: 'bash',
        users: {
            openfpgaduino: 'lab123'
        },
        port: 8000
    });


    ttyserver.listen();

    app.use('/tty', router);

}