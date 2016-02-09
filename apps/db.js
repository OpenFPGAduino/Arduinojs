module.exports = function(app, db) {
    console.log('module db');
    var collection = db.collection("openfpgaduino");
    var Set = require("collections/set");
    var express = require('express');
    var router = express.Router();
    var set = new Set(["a","b"]);
    console.log(set.toJSON());
    router.get('/', function(req, res) {
        res.json({
            message: 'hooray! welcome to our fpga api!'
        });
    });

    router.post('/add', function(req, res) {

    collection.insert([{
        hello: 'world_safe1'
    }, {
        hello: 'world_safe2'
    }], {
        w: 1
    }, function(err, result) {
        assert.equal(null, err);
    });

        res.json({
            message: 'hooray! welcome to our api!'
        });

    });

    router.post('/delete', function(req, res) {
        res.json({
            message: 'hooray! welcome to our api!'
        });
    });

    app.use('/db', router);

}
