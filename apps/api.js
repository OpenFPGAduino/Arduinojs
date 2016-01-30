module.exports = function(app) {
    console.log('module api');
    //var swaggerTools = require('swagger-tools');
    //var fpga = require('././build/Release/openfpgaduino');
    var express = require('express');
    var router = express.Router();

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

    app.use('/api', router);

}