module.exports = function(app, logger, event, fs) {
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

    var path = require('path');

    app.get('/service', function (req, res) {
        var table = []
        var urlstack = app._router.stack
        for (var key in urlstack) {
            if (urlstack.hasOwnProperty(key)) {
                var val = urlstack[key];
                if (val.route) {
                    val = val.route;
                    var _o = {};
                    _o[val.stack[0].method] = [val.path, val.path];
                    table.push(_o);
                }

            }
        } //todo loop all the nested structure
        res.json(table)
    });

    app.get('/list', function(req, res) {
        var filelist = [];
        fs.readdirAsync(__dirname + "/")
            .then(function(list) {
                list.forEach(function(filename) {
                    if (!/\.js$/.test(filename)) {
                        return;
                    }
                    filelist.push(filename);
                })
                res.json({
                    script: filelist
                });
            })
            .catch(function(error) {
                res.json({
                    error: error
                });
            })
    });

    app.get('/get/:filename', function(req, res) {
        var filename = req.params.filename;
        fs.readFileAsync(__dirname + "/" + filename, "utf8")
            .then(function(code) {
                res.send(code);
            })
            .catch(function(error) {
                res.json({
                    error: error
                });
            })
    });

    app.post('/log', function(req, res) {
        var length = parseInt(req.body.length);
        var position = parseInt(req.body.position);
        fs.openAsync("server.log", 'r')
            .then(function(fd) {
                var buffer = new Buffer(length);
                return fs.readAsync(fd, buffer, 0, length, position)
            })
            .spread(function(bytes, data) {
                res.json({
                    log: data.toString(),
                    length: bytes
                });
            })
            .catch(function(error) {
                res.json({
                    error: error
                });
            })

    });

    app.post('/install', function(req, res) {
        var filename = req.body.filename;
        var code = req.body.code;
        fs.writeFileAsync(__dirname + "/" + filename, code)
            .then(function() {
                res.json({
                    message: 'app installed'
                });
            })
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
        fs.unlinkAsync(__dirname + "/" + filename)
            .then(function() {
                res.json({
                    message: filename + ' deleted'
                });
            })
    });
}