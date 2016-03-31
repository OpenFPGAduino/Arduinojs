module.exports = function(app, logger, event) {
    logger.info('module main');
    var assert = require('assert');
    app.get('/test', function(req, res) {
        res.send('Hello this is the Openfpgaduino!');
    });

    app.post('/', function(req, res) {
        res.statusCode = 302;
        res.setHeader("Location", "index.html");
        res.end();
    });

    var fs = require('fs');
    var path = require('path');

    app.get('/list', function(req, res) {
        var filelist = [];
        fs.readdirSync(__dirname + "/").forEach(function(filename) {
            if (!/\.js$/.test(filename)) {
                return;
            }
            filelist.push(filename);

        });
        res.json({
            script: filelist
        });
    });

    app.get('/get/:filename', function(req, res) {
        var filename = req.params.filename;
        var code = fs.readFileSync(__dirname + "/" + filename, "utf8");
        res.send(code);
    });

    app.post('/log', function(req, res) {
        var length = parseInt(req.body.length);
        var position = parseInt(req.body.position);
        var fd = fs.openSync("server.log", 'r');
        var buffer = new Buffer(length);
        length = fs.readSync(fd, buffer, 0, length, position);
        res.json({
            log: buffer.toString(),
            length: length
        });
    });

    app.post('/install', function(req, res) {
        var filename = req.body.filename;
        var code = req.body.code;
        fs.writeFileSync(__dirname + "/" + filename, code);
        res.json({
            message: 'app installed'
        });
    });

    app.post('/load', function(req, res) {
        var filename = req.body.filename;
        event.emit('load', filename);
        res.json({
            message: 'app load'
        });
    });

    app.del('/:filename', function(req, res) {
        var filename = req.params.filename;
        var code = fs.unlinkSync(__dirname + "/" + filename);
        res.send(code);
    });
}