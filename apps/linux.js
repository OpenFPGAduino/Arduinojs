module.exports = function(app, logger, argv, router) {
    logger.info('module linux');
    require('shelljs/global');

    if (!which('git')) {
        echo('Sorry, this script requires git');
        //exit(1);
    }


    ls('*.js').forEach(function(file) {
        console.log(file)
    });

    router.get('/shell/list', function(req, res) {
        var shell = require('shelljs');
        var cmdlist = [];
        for (cmd in shell) {
            cmdlist.push(cmd);
        }
        res.json(cmdlist);
    });

    router.post('/shell/cmd', function(req, res) {
        var cmd = req.body.cmd;
        var opt = req.body.opt;
        var shell = require('shelljs');
        shell[cmd](opt);
        res.json({
            message: 'call linux shell command!'
        });
    });



    if (!argv.sim) {

        router.post('/call', function(req, res) {
            var ffi = require('ffi');

            var libm = ffi.Library('libm', {
                'ceil': ['double', ['double']]
            });
            console.log(libm.ceil(1.5)); // 2

            // You can also access just functions in the current process by passing a null
            var current = ffi.Library(null, {
                'atoi': ['int', ['string']]
            });
            console.log(current.atoi('1234')); // 1234

            res.json({
                message: 'call linux lib!'
            });
        });

    } else {
        logger.debug("Skip fpga module for simulation");

    }

    app.use('/linux', router);
}