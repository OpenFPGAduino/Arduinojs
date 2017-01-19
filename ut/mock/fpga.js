module.exports = function(app, logger, io, db, argv, fs) {
    var express = require('express');
    var router = express.Router();
    var fpga = new Object;
    fpga.led = function(id, r, b, g) {
        logger.info("led on");
    };
    fpga.add = function(a, b) {
        return (a + b)
    };
    fpga.sleep = function(i) {
        logger.info("sleep")
    };
    fpga.fpga_open = function() {
        logger.info("open fpga")
    };
    logger.info("Initial sim fpga module");

    router.get('/', function(req, res) {
        res.json({
            message: 'hooray! welcome to our fpga api!'
        });
    });

    router.get('/device', function(req, res) {
        res.json({
            message: 'hooray! welcome to our api!'
        });
    });

    router.post('/device', function(req, res) {
        res.json({
            message: 'hooray! welcome to our api!'
        });
    });


    router.get('/memory', function(req, res) {
        res.json({
            message: 'hooray! welcome to our api!'
        });
    });

    router.post('/memory', function(req, res) {
        res.json({
            message: 'hooray! welcome to our api!'
        });
    });

    router.get('/config', function(req, res) {
        res.json({
            message: 'hooray! welcome to our api!'
        });
    });

    router.post('/config', function(req, res) {
        res.json({
            message: 'Write file success'
        });
    });

    router.post('/uploadconfig', function(req, res) {
     logger.debug(req);
        var uploadfile = req.files.uploadfile;
        var path = uploadfile.path;
        var filename = uploadfile.originalname;
        logger.debug(filename);
        fs.renameAsync(path, "./uploads/" + filename)
            .then(function() {
                res.json({
                    message: 'Upload and write file success'
                });
            })
            .catch(function(error) {
                res.json({
                    error: error
                });
            })
    });

    router.get('/config/list', function(req, res) {
      var filelist = [];
        fs.readdirAsync("./uploads/")
            .then(function(list) {
                list.forEach(function(filename) {
                    if (!/\.rbf$/.test(filename)) {
                        return;
                    }
                    filelist.push(filename);
                })
                res.json(
                    filelist
                );
            })
            .catch(function(error) {
                res.json({
                    error: error
                });
            })
    });

    router.post('/config', function(req, res) {
        res.json({
            message: 'Write file success'
        });
    });

    router.get('/api/list/', function(req, res) {
        var method = [];
        for (m in fpga) {
            method.push(m.toString);
        }
        req.json({
            "method": method
        });
    });

    router.get('/api/list/:method', function(req, res) {
        var method = req.params.method;
        if (fpga[method]) {
            req.json({
                "method": fpga[method]
            });
        }
    });

    router.post('/api/call/:method', function(req, res) {
        var method = req.params.method;
        var paramter = req.body;
        logger.info("method is " + method);
        res.json({
            message: 'Call method ' + method
        });
    });


    io.sockets.on('connection', function(socket) {
        socket.emit('news', {
            hello: 'world'
        });
        socket.on('my other event', function(data) {
            console.log(data);
        });
    });

    app.use('/fpga', router);

}