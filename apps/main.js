module.exports = function (app, logger, io, db) {
    console.log('module main');
var assert     = require('assert');
app.get('/test', function (req, res) {
res.statusCode = 302;
res.setHeader("Location", "index.html");
res.end();
});

app.post('/', function (req, res) {
  res.send('Hello this is the Openfpgaduino!');
});

var collection = db.collection("batch_document_insert_collection_safe");
collection.insert([{hello:'world_safe1'}
  , {hello:'world_safe2'}], {w:1}, function(err, result) {
  assert.equal(null, err);

  collection.findOne({hello:'world_safe2'}, function(err, item) {
    assert.equal(null, err);
    assert.equal('world_safe2', item.hello);
  })
});

}
