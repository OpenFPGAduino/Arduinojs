//var fpga = require('././build/Release/openfpgaduino');

module.exports = function (app) {
    console.log('module fpga');

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

}



