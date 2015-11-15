var fpga = require('./build/Release/openfpgaduino');
var express = require('express');
var app = express();

var input_json;

var output_json;

app.get('/', function (req, res) {
  res.send('Hello World!');
});

var server = app.listen(3333);
