module.exports = function (app, logger, event, fs, uuid) {
    logger.info('module main');
    var assert = require('assert');
    app.get('/test', function (req, res) {
        res.send('Hello this is the Openfpgaduino!');
    });

    app.post('/', function (req, res) {
        res.statusCode = 302;
        res.setHeader("Location", "index.html");
        res.end();
    });

    var path = require('path');

    app.get('/uuid', function (req, res) {
        res.json(uuid)
    });

    function service_discover(urlstack, basebath) {
        var table = []
        for (var key in urlstack) {
            if (urlstack.hasOwnProperty(key)) {
                var val = urlstack[key];
                if (val.route) {
                    val = val.route;
                    var url = {};
                    url[val.stack[0].method] = basebath + val.path;
                    table.push(url);
                }
                else if (val.handle.stack) {
                    var stack = val.handle.stack
                    var path = "/" + val.regexp.toString().match(/\\\/(.*)\\.*/m)[1]  
                    table.push(service_discover(stack, path))
                }
            }
        }
        return table
    }

    app.get('/service', function (req, res) {
        var urlstack = app._router.stack
        //console.dir(urlstack)
        res.json(service_discover(urlstack, "/"))
    });

    app.get('/list', function (req, res) {
        var filelist = [];
        fs.readdirAsync(__dirname + "/")
            .then(function (list) {
                list.forEach(function (filename) {
                    if (!/\.js$/.test(filename)) {
                        return;
                    }
                    filelist.push(filename);
                })
                res.json({
                    script: filelist
                });
            })
            .catch(function (error) {
                res.json({
                    error: error
                });
            })
    });

    app.get('/get/:filename', function (req, res) {
        var filename = req.params.filename;
        fs.readFileAsync(__dirname + "/" + filename, "utf8")
            .then(function (code) {
                res.send(code);
            })
            .catch(function (error) {
                res.json({
                    error: error
                });
            })
    });

    app.post('/log', function (req, res) {
        var length = parseInt(req.body.length);
        var position = parseInt(req.body.position);
        fs.openAsync("server.log", 'r')
            .then(function (fd) {
                var buffer = new Buffer(length);
                return fs.readAsync(fd, buffer, 0, length, position)
            })
            .spread(function (bytes, data) {
                res.json({
                    log: data.toString(),
                    length: bytes
                });
            })
            .catch(function (error) {
                res.json({
                    error: error
                });
            })

    });

    app.post('/install', function (req, res) {
        var filename = req.body.filename;
        var code = req.body.code;
        fs.writeFileAsync(__dirname + "/" + filename, code)
            .then(function () {
                res.json({
                    message: 'app installed'
                });
            })
    });

    app.post('/load', function (req, res) {
        var filename = req.body.filename;
        event.emit('load', filename);
        res.json({
            message: 'app load'
        });
    });

    app.del('/:filename', function (req, res) {
        var filename = req.params.filename;
        fs.unlinkAsync(__dirname + "/" + filename)
            .then(function () {
                res.json({
                    message: filename + ' deleted'
                });
            })
    });
}