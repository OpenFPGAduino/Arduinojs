module.exports = function(app, logger, io, db) {
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

}
