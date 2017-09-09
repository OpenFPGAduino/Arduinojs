module.exports = function (app, logger, express, event) {
    logger.info('module coap');
    var router = express.Router();

    var coap = require('coap')
        , server = coap.createServer()

    router.post('/request', function(req, res) {
        var url = req.body.url;
        var request = coap.request(url)  //coap://localhost/coap

        request.on('response', function(res) {
            //logger.info(res.payload)
            res.pipe(process.stdout)
            event.emit('coap', {response:res});
            res.on('end', function() {
            })
        })

        request.end()
        res.json({
            message: 'coap request'
        });

    })

    router.post('/server', function(req, res) {
        // the default CoAP port is 5683
        server.listen(function() {

        })
        server.on('request', function(req, res) {
            res.end('Hello ' + req.url.split('/')[1] + '\n')
        })
        res.json({
            message: 'coap server start'
        });
    });

    app.use('/coap', router);
}