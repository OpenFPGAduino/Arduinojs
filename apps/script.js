module.exports = function(app, logger, express) {
    logger.info('module script');
    var vm = require('vm');
    var router = express.Router();
    router.post('/run', function(req, res) {
        var script = req.body.script;
        //var runscript = vm.runInThisContext('localVar = 1;',
        //    'myfile.vm');
        console.log(script);
        var ret = eval(script);

        res.json({
            message: 'run script api!'
        });
    });

    app.use('/script', router);

}