module.exports = function(app, logger, io, db, router) {
    console.log('module mqtt');

    var mqtt = require('mqtt');

    var client = mqtt.connect('http://test.mosquitto.org/');

    //var client = mqtt.connect('http://localhost/');

    client.on('connect', function() {

        client.subscribe('presence');

        client.publish('presence', 'Hello mqtt');

    });



    client.on('message', function(topic, message) {

        // message is Buffer 

        console.log(message.toString());

        client.end();

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
