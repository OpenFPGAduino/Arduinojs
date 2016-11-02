module.exports = function(app, router, logger, proxy) {
    logger.info('module cide');
    var fork = require('child_process').fork;
    var c, fpga;

    router.get('/', function(req, res) {
        res.json({
            cide: '/c/',
            fpgadesign: '/fpga/'
        });
    });

    router.get('/c/start', function(req, res) {
        c = fork('../ArduinoIDE/server.js', [''], {
            cwd: '../ArduinoIDE/'
        });
        res.json({
            message: 'start the c ide!'
        });
    });

    router.get('/c/status', function(req, res) {
        if (c != null) {
            logger.debug(c.connected)
            res.json(c.connected);
        } else {
            res.json(false);
        }
    });


    router.get('/c/stop', function(req, res) {
        if (c != null) {
            c.kill('SIGHUP');
        }
        res.json({
            message: 'stop the c ide!!'
        });
    });

    router.get('/fpga/start', function(req, res) {
        fpga = fork('../FPGAdesigner/server.js', [''], {
            cwd: '../FPGAdesigner/'
        });
        res.json({
            message: 'start the fpga ide!'
        });
    });

    router.get('/fpga/status', function(req, res) {
        if (fpga != null) {
            logger.debug(fpga.connected)
            res.json(fpga.connected);
        } else {
            res.json(false);
        }
    });

    router.get('/fpga/stop', function(req, res) {
        if (fpga != null) {
            fpga.kill('SIGHUP');
        }
        res.json({
            message: 'stop the fpga ide!!'
        });
    });

    app.use('/ide', router);
    app.use('/cide', proxy('localhost:8888', {
        forwardPath: function(req, res) {
            console.log(req.url)
            return require('url').parse(req.url).path;
        },
        
        decorateRequest: function(proxyReq, originalReq) {
            console.log(proxyReq.bodyContent)
            proxyReq.bodyContent = proxyReq.bodyContent//.replace(/cide/, ':8888/');
            return proxyReq;
        },
        
        intercept: function(rsp, data, req, res, callback) {
            console.log(data)
            //data = JSON.parse(data.toString('utf8'));
            callback(null, data);                        
        }
          
    }));
    app.use('/fpgaide', proxy('localhost:8686', {
        forwardPath: function(req, res) {
            console.log(req.url)
            return require('url').parse(req.url).path;
        },
        
        decorateRequest: function(proxyReq, originalReq) {
            console.log(proxyReq.bodyContent)
            proxyReq.bodyContent = proxyReq.bodyContent//.replace(/cide/, ':8888/');
            return proxyReq;
        },
        
        intercept: function(rsp, data, req, res, callback) {
            console.log(data)
            //data = JSON.parse(data.toString('utf8'));
            callback(null, data);                        
        }
          
    }));
}