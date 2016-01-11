module.exports = function(app, logger) {
    console.log('module fpga');

    //var fpga = require('././build/Release/openfpgaduino');
    var express = require('express');
    var router = express.Router();

    var arglist = {};

    logger.info("Initial fpga module");
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
        console.log(req.body)
        res.json({
            message: 'hooray! welcome to our api!'
        });
    });


    router.get('/api/list/', function(req, res) {
        console.log(req.body)
        res.json({
            message: 'hooray! welcome to our api!'
        });
    });

    router.get('/api/list/:method', function(req, res) {
    //for(m in fpga) {
    //console.log(m)
    //}
        res.json({
            message: 'hooray! welcome to our api!'
        });
    });

    router.post('/api/call/:method', function(req, res) {
        var method = req.params.method;
    	logger.info("method is "+ method);
        res.json({
            message: 'hooray! welcome to our api!'
        });
    });

    app.use('/fpga', router);

}
