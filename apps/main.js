module.exports = function (app) {
    console.log('module main');

app.get('/', function (req, res) {
  res.send('Hello this is the Openfpgaduino!');
});

app.post('/', function (req, res) {

  res.send('Hello this is the Openfpgaduino!');
});


}
