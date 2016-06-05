module.exports = function(app, logger, router, db) {
    logger.info('module db');

    router.get('/list', function(req, res) {
        // Use the admin database for the operation
        db.collectionNames(function(err, docs) {
            if (!err) {
                var namelist = []
                var reg = /db.([^\.].*)/g;
                var match;
                logger.debug("db:" + docs);
                for (i in docs) {
                    match = reg.exec(docs[i].name)
                    if (match != null) {
                        logger.debug("document name:" + match[1]);
                        namelist.push(match[1]);
                    }
                }
                res.json(namelist);
            }
        })
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
        collection.update(req.body.query, req.body.command);
        res.json({
            message: 'update ok'
        });
    });

    router.post('/query/:doc', function(req, res) {
        var doc = req.params.doc;
        var collection = db.collection(doc);
        collection.find(req.body).toArray(function(err, docs) {
            console.log("Found the following records");
            console.dir(docs);
            res.json(docs);
        });
    });

    router.delete('/remove/:doc', function(req, res) {
        var doc = req.params.doc;
        var collection = db.collection(doc);
        collection.remove(req.body, function(err, result) {
            console.log("Removed the document");
            res.json({
                message: 'remove ok',
                result: result
            });
        });

    });

    app.use('/db', router);

}