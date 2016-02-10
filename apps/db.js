module.exports = function(app, db) {
    console.log('module db');
    var collection = db.collection("openfpgaduino");
    var Set = require("collections/set");
    var express = require('express');
    var router = express.Router();
    var set = new Set(["a","b"]);
    router.get('/list', function(req, res) {
	collection.find({}).toArray(function(err, docs){
    	console.log("Found the following records");
   	console.dir(docs);
	res.json(docs);
    	});
    });

    router.post('/add', function(req, res) {
        collection.insert(req.body);
        res.json({
            message: 'insert ok'
        });

    });

    router.post('/update', function(req, res) {
        res.json({
            message: 'update ok'
        });

    });

    router.post('/remove', function(req, res) {
    collection.remove(req.body, function(err, result) {
    console.log("Removed the document");
    res.json(result);
  });   

    });

    app.use('/db', router);

}
