// call the packages we need
var log4js     = require('log4js');
var express    = require('express');                       
var bodyParser = require('body-parser');
var loadDir    = require('./loaddir');
var module     = loadDir('apps');
var multer     = require('multer')

var app        = express();                 // start express
var logger     = log4js.getLogger();        // start logging
logger.setLevel('INFO');
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// configure app to use /page to store static files
app.use(express.static(__dirname + '/page'));
// configure app to use /uploads to store upload files
app.use(multer({ dest: './uploads/'}))

var port = process.env.PORT || 8080;        // set our port

for (m in module) {                         // load all modules
   module[m](app,logger)
}

var server = app.listen(port);
console.log("Restful API server on port", port)

