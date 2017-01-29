module.exports = function(app, express) {
    console.log('module jside');
    var router = express.Router();
    //var fork = require('child_process').fork;
    //var child = fork('./server',['']);

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

    app.use('/jside', router);

}