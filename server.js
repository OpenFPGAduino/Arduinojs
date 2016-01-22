// call the packages we need
var log4js     = require('log4js');
var express    = require('express');                       
var bodyParser = require('body-parser');
var loadDir    = require('./loaddir');
var module     = loadDir('apps');
var multer     = require('multer');
var io         = require('socket.io');

var app        = express();                 // start express
var logger     = log4js.getLogger();        // start logging
logger.setLevel('INFO');                    // Set the log level
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.raw());
// configure app to use /page to store static files
app.use(express.static(__dirname + '/page'));
// configure app to use /uploads to store upload files
app.use(multer({ dest: './uploads/'}).single('test'));

var port = process.env.PORT || 8080;        // set our port

for (m in module) {                         // load all modules
   module[m](app,logger,io)
}

var server = app.listen(port);
var sockect = io.listen(port+1);
console.log("Restful API server on port", port)
console.log("Socker IO server on port", port+1)

