module.exports = function(app, logger, db, fs) {
    var p = require('child_process');
    var fpga = require('.././build/Release/openfpgaduino');
    var express = require('express');
    var router = express.Router();

    logger.debug("Initial fpga module");
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

    router.post('/uploadconfig', function(req, res) {
        logger.debug(req);
        var uploadfile = req.files.uploadfile;
        var path = uploadfile.path;
        var filename = uploadfile.originalname;
        logger.debug(filename);
        fs.renameAsync(path, "./uploads/" + filename)
            .then(function() {
                p.exec("cat ./uploads/" + filename + " > /sys/kernel/debug/fpga/data;" +
                    " echo 1 > /sys/kernel/debug/fpga/download",
                    function(error, stdout, stderr) {
                        if (error !== null) {
                            logger.error("Download config error");
                            res.json({
                                error: error
                            });
                        }
                    });
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
        var filename = req.body.filename;
        p.exec("cat ./uploads/" + filename + " > /sys/kernel/debug/fpga/data;" +
            " echo 1 > /sys/kernel/debug/fpga/download",
            function(error, stdout, stderr) {
                if (error !== null) {
                    logger.error("Download config error");
                }
            });
        res.json({
            message: 'Write file success'
        });
    });

    router.get('/api/list/', function(req, res) {
        var method = [];
        for (m in fpga) {
            method.push(m.toString);
        }
        res.json({
            "method": method
        });
    });

    router.get('/api/list/:method', function(req, res) {
        var method = req.params.method;
        if (fpga[method]) {
            res.json({
                "method": fpga[method]
            });
        }
    });

    router.post('/api/call/:method', function(req, res) {
        var method = req.params.method;
        var paramter = req.body;
        var ret;
        fpga.fpga_open();
        switch (paramter.length) {
            case 0:
                ret = fpga[method]();
                break;
            case 1:
                ret = fpga[method](paramter[0]);
                break;
            case 2:
                ret = fpga[method](paramter[0], paramter[1]);
                break;
            case 3:
                ret = fpga[method](paramter[0], paramter[1], paramter[2]);
                break;
            case 4:
                ret = fpga[method](paramter[0], paramter[1], paramter[2], paramter[3]);
                break;
            case 5:
                ret = fpga[method](paramter[0], paramter[1], paramter[2], paramter[3], paramter[4]);
                break;
            case 6:
                ret = fpga[method](paramter[0], paramter[1], paramter[2], paramter[3], paramter[4], paramter[5]);
                break;
            case 7:
                ret = fpga[method](paramter[0], paramter[1], paramter[2], paramter[3], paramter[4], paramter[5], paramter[6]);
                break;
            case 8:
                ret = fpga[method](paramter[0], paramter[1], paramter[2], paramter[3], paramter[4], paramter[5], paramter[6], paramter[7]);
                break;
            default:
                logger.error("too manay arguments");
        }
        logger.info("method is " + method);
        res.json(ret);
        fpga.fpga_close();
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