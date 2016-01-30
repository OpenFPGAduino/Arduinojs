module.exports = function(app, logger) {
    console.log('module script vm');
    var vm = require('vm');
    //var fpga = require('././build/Release/openfpgaduino');
    var express = require('express');
    var router = express.Router();

    router.get('/log', function(req, res) {
        res.json({
            message: 'hooray! welcome to our api!'
        });
    });

    router.post('/run', function(req, res) {

        var runscript = vm.runInThisContext('localVar = 1;',
            'myfile.vm');

        res.json({
            message: 'run script api!'
        });
    });



    app.use('/script', router);

}