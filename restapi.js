var express = require('express');
//var swaggerTools = require('swagger-tools');
//var fpga = require('./build/Release/openfpgaduino');
var app = express();
var input_json;
var output_json;
var port = 3333;
app.get('/', function (req, res) {
  res.send('Hello this is the Openfpgaduino!');
});

app.post('/', function (req, res) {
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