module.exports = function(app, db) {
    console.log('module db');
    var collection = db.collection("openfpgaduino");
    var Set = require("collections/set");
    var express = require('express');
    var router = express.Router();
    var set = new Set(["a","b"]);
    router.get('/list', function(req, res) {
	var ret = collection.find();
	console.log(ret);
        res.json({
            message: 'list ok'
        });
    });

    router.post('/add', function(req, res) {

        collection.insert(req.body);
        res.json({
            message: 'insert ok'
        });

    });

    router.post('/delete', function(req, res) {
        res.json({
            message: 'hooray! welcome to our api!'
        });
    });

    app.use('/db', router);

}
