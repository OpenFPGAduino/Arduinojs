module.exports = function(app, logger, router, db) {
    logger.info('module db');
    var Set = require("collections/set");
    var set = new Set(["a", "b"]);
    
    router.get('/list', function(req, res) {
            // Use the admin database for the operation
        var adminDb = db.admin();

        // List all the available databases
        adminDb.listDatabases(function(err, dbs) {
            assert.equal(null, err);
            assert.ok(dbs.databases.length > 0);
            console.log(dbs);
            db.close();
        });
    });
    
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
        var doc = req.params.doc;
        var collection = db.collection(doc);
        collection.update(req.body.query,req.body.command);
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