module.exports = function(app, express, Set) {
    console.log('module api');
    var router = express.Router();
    var set = new Set(["a", "b"]);
    console.log(set.toJSON());
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

    router.get('/exit', function(req, res) {
        res.json({
            message: 'system exiting!'
        });
        setTimeout(process.exit(0), 1000);
    });

    router.get('/restart', function (req, res) {
        var spawn = require('child_process').spawn;
        (function main() {

            if (process.env.process_restarting) {
                delete process.env.process_restarting;
                // Give old process one second to shut down before continuing ...
                setTimeout(main, 1000);
                return;
            }

            // Restart process ...
            spawn(process.argv[0], process.argv.slice(1), {
                env: { process_restarting: 1 },
                stdio: 'ignore'
            }).unref();
        })();
        res.json({
            message: 'restart the nodejs'
        });
    });

    app.use('/api', router);

}