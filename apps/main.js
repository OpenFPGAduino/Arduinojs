module.exports = function (app) {
    console.log('module main');

app.get('/test', function (req, res) {
res.statusCode = 302;
res.setHeader("Location", "index.html");
res.end();
});

app.post('/', function (req, res) {
  res.send('Hello this is the Openfpgaduino!');
});

}
