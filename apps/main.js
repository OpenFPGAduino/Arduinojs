module.exports = function(app, logger, io, db, event, dyapp) {
    console.log('module main');
    var assert = require('assert');
    app.get('/test', function(req, res) {
        res.statusCode = 302;
        res.setHeader("Location", "index.html");
        res.end();
    });

    app.post('/', function(req, res) {
        res.send('Hello this is the Openfpgaduino!');
    });

    var log = "";
    var script = "";
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

    app.get('/log', function(req, res) {
        throw "error test";
        res.json({
            log: 'hooray! welcome to our api!'
        });
    });
    
    app.post('/install', function(req, res) {
        var filename = req.body.filename;
	var code     = req.body.code;
	dyapp.filename = filename;
	dyapp.code     = code;
	fs.writeFileSync(filename, code);
        eventEmitter.emit('install');
        res.json({
            message: 'app installed'
        });
    });


}
