module.exports = function(app, logger, router, db) {
    logger.info('module db');
    var Set = require("collections/set");
    var set = new Set(["a", "b"]);
    router.get('/list/:doc', function(req, res) {
        var doc = req.params.doc;
        var collection = db.collection(doc);
        collection.find({}).toArray(function(err, docs) {
            console.log("Found the following records");
            console.dir(docs);
            res.json(docs);
        });
    });

    router.post('/add/:doc', function(req, res) {
        var doc = req.params.doc;
        var collection = db.collection(doc);
        collection.insert(req.body);
        res.json({
            message: 'insert ok'
        });

    });

    router.post('/update/:doc', function(req, res) {
        res.json({
            message: 'update ok'
        });

    });

    router.delete('/remove/:doc', function(req, res) {
        var doc = req.params.doc;
        var collection = db.collection(doc);
        collection.remove(req.body, function(err, result) {
            console.log("Removed the document");
            res.json(result);
        });

    });

    app.use('/db', router);

}