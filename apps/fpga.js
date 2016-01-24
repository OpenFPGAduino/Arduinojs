module.exports = function(app, logger) {
    var fs=require("fs");
    //var fpga = require('././build/Release/openfpgaduino');
    var express = require('express');
    var router  = express.Router();

    logger.debug("Initial fpga module");
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


    router.get('/memory', function(req, res) {
        res.json({
            message: 'hooray! welcome to our api!'
        });
    });

    router.post('/memory', function(req, res) {
        res.json({
            message: 'hooray! welcome to our api!'
        });
    });

    router.get('/config', function(req, res) {
        res.json({
            message: 'hooray! welcome to our api!'
        });
    });

    router.post('/config', function(req, res) {
     logger.debug(req);
     var uploadfile = req.files.uploadfile; 
     var path = uploadfile.path;
     var filename = uploadfile.originalname;
     var extention = uploadfile.extension;
     logger.debug(filename+extention);
     var ret = fs.renameSync(path, "./uploads/"+ filename + extention);
	/*p.exec('$(pwd)/fpga_config.sh ' + 'config/' + version + '.rbf',
	    function(error, stdout, stderr) {
		if (error !== null) {

		}
		console_message += stdout;
		error_message += stderr;
	    });*/
     if (!ret)
     	res.json({ message: 'Write file success'});  
    });


    router.get('/api/list/', function(req, res) {
        console.log(req.body)
        res.json({
            message: 'hooray! welcome to our api!'
        });
    });

    router.get('/api/list/:method', function(req, res) {
        req.json
    //for(m in fpga) {
    //console.log(m)
    //}
        res.json({
            message: 'hooray! welcome to our api!'
        });
    });

    router.post('/api/call/:method', function(req, res) {
        var method = req.params.method;
	var paramter = req.body;
//	var p1 = paramter.p1;
//	var p2 = paramter.p2;
//	var p3 = paramter.p3;
//	var p4 = paramter.p4;
//	var p5 = paramter.p5;
//	var p6 = paramter.p6;
//	var p7 = paramter.p7;
//	fpga[method](p1,p2,p3,p4,p5,p6,p7,p8)
    	logger.info("method is "+ method);
        res.json({
            message: 'hooray! welcome to our api!'
        });
    });

    app.use('/fpga', router);

}
