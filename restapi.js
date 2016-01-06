// call the packages we need
var loadDir = require('./loaddir');
var apps = loadDir('apps');

var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//var swaggerTools = require('swagger-tools');

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================

app.get('/', function (req, res) {
  res.send('Hello this is the Openfpgaduino!');
});

app.post('/', function (req, res) {

  res.send('Hello this is the Openfpgaduino!');
});

apps.linux(app)
apps.fpga(app)

var server = app.listen(port);
console.log("Restful API server on port", port)

