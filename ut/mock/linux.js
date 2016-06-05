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

        router.post('/call', function(req, res) {
   

            res.json({
                message: 'call linux lib!'
            });
        });


    router.get('/reboot', function(req, res) {
        p.exec('sudo reboot',
            function(error, stdout, stderr) {
                console.log("reboot");
                debuginf(stdout);
            });
        res.json("System rebooting");
    });

    app.use('/linux', router);
}