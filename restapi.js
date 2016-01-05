// call the packages we need
var loadDir = require('./loaddir');
var apps = loadDir('app');

apps.linux()

var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//var swaggerTools = require('swagger-tools');
//var fpga = require('./build/Release/openfpgaduino');

var input_json;
var output_json;

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
app.listen(port);
console.log('Magic happens on port ' + port);


/*
app.get('/', function (req, res) {
  res.send('Hello this is the Openfpgaduino!');
});

app.post('/', function (req, res) {

  res.send('Hello this is the Openfpgaduino!');
});

app.get('/api', function (req, res) {
  res.send('Hello this is the Openfpgaduino!');
});

app.post('/api', function (req, res) {
  res.send('Hello this is the Openfpgaduino!');
});


app.get('/fpga/device/', function (req, res) {
  res.send('Hello World!');
});

app.post('/fpga/device/', function (req, res) {
  res.send('Hello World!');
});

app.get('/fpga/memory', function (req, res) {
  res.send('Hello World!');
});

app.post('/fpga/memory', function (req, res) {
  res.send('Hello World!');
});

app.get('/fpga/config', function (req, res) {
  res.send('Hello World!');
});

app.post('/fpga/config', function (req, res) {
  res.send('Hello World!');
});



var server = app.listen(port);
console.log("Restful API server on port", port)
*/
