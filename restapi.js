// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var loadDir    = require('./loaddir');
var module     = loadDir('apps');
//var swaggerTools = require('swagger-tools');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

for (m in module) {                         // load all modules
   module[m](app)
}

var server = app.listen(port);
console.log("Restful API server on port", port)

