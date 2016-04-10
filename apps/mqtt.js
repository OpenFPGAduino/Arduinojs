module.exports = function(app, logger, io, db, router) {
    logger.info('module mqtt');

    var mqtt = require('mqtt');

    var client = null;

    //var client = mqtt.connect('http://localhost/');

    router.post('/client/connect', function(req, res) {
        var link = req.body.link;
        client = mqtt.connect(link);

        client.on('connect', function() {
            logger.info("server is connected");
        });

        client.on('message', function(topic, message) {
            // message is Buffer 
            logger.info(message.toString());

        });

        res.json({
            message: 'mqtt client connect'
        });
    });

    router.post('/client/end', function(req, res) {
        client.end();
        res.json({
            message: 'mqtt client end'
        });
    });

    router.post('/client/subscribe', function(req, res) {
        var name = req.body.name;
        client.subscribe(name);
        res.json({
            message: 'mqtt client subscribe ok'
        });
    });

    router.post('/client/publish', function(req, res) {
        var name = req.body.name;
        var message = req.body.message;
        client.publish(name, message);
        res.json({
            message: 'mqtt client publish ok'
        });
    });

    router.get('/server', function(req, res) {

        var mosca = require('mosca');

        var moscaSettings = {
            port: 1883, //mosca (mqtt) port

        };

        var server = new mosca.Server(moscaSettings); //here we start mosca
        server.on('ready', setup); //on init it fires up setup()


        // fired when the mqtt server is ready
        function setup() {
            console.log('Mosca server is up and running');
        }

        res.json({
            message: 'mqtt server start'
        });
    });

    app.use('/mqtt', router);

}