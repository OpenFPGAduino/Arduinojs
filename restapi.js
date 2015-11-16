var app = express();
var express = require('express');
var swaggerTools = require('swagger-tools');
var fpga = require('./build/Release/openfpgaduino');

var input_json;
var output_json;

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/fpga/device', function (req, res) {
  res.send('Hello World!');
});

app.get('/fpga/memory', function (req, res) {
  res.send('Hello World!');
});

app.get('/fpga/config', function (req, res) {
  res.send('Hello World!');
});

var server = app.listen(3333);
