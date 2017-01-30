module.exports = function(app, logger, express, argv) {
    logger.info('module tty');
    var router = express.Router();
    var ttyserver;
    router.get('/start', function(req, res) {
        var tty = require('tty.js');
        ttyserver = tty.createServer({
            shell: 'bash',
            users: {
                openfpgaduino: 'lab123'
            },
            port: 8000
        });
        ttyserver.listen();
        res.json({
            message: 'start the tty!'
        });
    });

    router.get('/stop', function(req, res) {
        delete ttyserver;
        res.json({
            message: 'stop the tty!'
        });
    });

    app.use('/tty', router);

}