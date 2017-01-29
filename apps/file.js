module.exports = function(app, express, logger, event, fs) {
    logger.info('module file');

    var path = require('path');
    var router = express.Router();
    
    router.get('/list', function(req, res) {
        var direction = req.body.direction;
        var filelist = [];
        fs.readdirAsync(direction + "/")
            .then(function(list) {
                list.forEach(function(filename) {
                    if (!/\.js$/.test(filename)) {
                        return;
                    }
                    filelist.push(filename);
                })
                res.json({
                    script: filelist
                });
            })
            .catch(function(error) {
                res.json({
                    error: error
                });
            })

    });

    router.get('/read', function(req, res) {
        var direction = req.body.direction;
        var filename = req.body.filename;
        fs.readFileAsync(direction + "/" + filename, "utf8")
            .then(function(file) {
                res.send(file);
            })
            .catch(function(error) {
                res.json({
                    error: error
                });
            })
    });

    router.post('/write', function(req, res) {
        var direction = req.body.direction;
        var filename = req.params.filename;
        var data = req.params.data;
        var ret = fs.writeFileSync(direction + "/" + filename, data);
        fs.writeFileAsync(direction + "/" + filename, data)
            .then(function() {
                res.json({
                    message: 'write success'
                });
            })
            .catch(function(error) {
                res.json({
                    error: error
                });
            })
    });

    router.delete('/delete', function(req, res) {
        var direction = req.body.direction;
        var filename = req.body.filename;
        fs.unlinkAsync(direction + "/" + filename)
            .then(function() {
                res.json({
                    message: 'delete success'
                });
            })
            .catch(function(error) {
                res.json({
                    error: error
                });
            })
    });

    app.use('/file', router);
}