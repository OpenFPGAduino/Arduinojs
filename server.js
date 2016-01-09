// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var loadDir    = require('./loaddir');
var module     = loadDir('apps');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// configure app to use /page to store static files
app.use(express.static(__dirname + '/page'));

var port = process.env.PORT || 8080;        // set our port

for (m in module) {                         // load all modules
   module[m](app)
}

var server = app.listen(port);
console.log("Restful API server on port", port)

