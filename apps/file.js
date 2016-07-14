module.exports = function(app, router, logger, event) {
    logger.info('module file');

    var fs = require('fs');
    var path = require('path');

    router.get('/list', function(req, res) {
        var direction = req.body.direction;
        var filelist = [];
        fs.readdirSync(direction + "/").forEach(function(filename) {
            if (!/\.js$/.test(filename)) {
                return;
            }
            filelist.push(filename);
        });
        res.json({
            script: filelist
        });
    });

    router.get('/read', function(req, res) {
        var direction = req.body.direction;
        var filename = req.body.filename;
        var ret = fs.readFileSync(direction + "/" + filename, "utf8");
        res.send(ret);
    });

    router.post('/write', function(req, res) {
        var direction = req.body.direction;
        var filename = req.params.filename;
        var data = req.params.data;
        var ret = fs.writeFileSync(direction + "/" + filename, data);
        res.send(ret);
    });

    router.delete('/delete', function(req, res) {
        var direction = req.body.direction;
        var filename = req.body.filename;
        var code = fs.unlinkSync(direction + "/" + filename);
        res.send(code);
    });
    
    app.use('/file', router);
}
