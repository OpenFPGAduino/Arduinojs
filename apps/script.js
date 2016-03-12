module.exports = function(app, logger, router) {
    logger.info('module script vm');
    var vm = require('vm');
    var script = "";
    var fs = require('fs');
    var path = require('path');

    router.get('/log', function(req, res) {
        throw "error test";
        res.json({
            log: 'hooray! welcome to our api!'
        });
    });

    router.post('/run', function(req, res) {
        var filename = req.body.filename;
        var name = path.basename(filename, '.js');
        //var runscript = vm.runInThisContext('localVar = 1;',
        //    'myfile.vm');
        var scriptpath = __dirname + "/../uploads/" + filename;
        var script = "var app = require(\'" + scriptpath + "\'); app();"
        console.log(script);
        var ret = eval(script);

        res.json({
            message: 'run script api!'
        });
    });

    app.use('/script', router);

}
