/*
 * Author: 
 *         Zhizhou Li <lzz@meteroi.com>
 *
 Copyright 2016 Meteroi
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.
    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */
// call the packages we need
var log4js     = require('log4js');
var http       = require('http');
var express    = require('express');                       
var bodyParser = require('body-parser');
var loadDir    = require('./loaddir');
var module     = loadDir('apps');
var multer     = require('multer');
var io         = require('socket.io');
var assert     = require('assert');
var Engine     = require('tingodb')();
var app        = express();                 // start express
var logger     = log4js.getLogger();        // start logging

var db = new Engine.Db('./db/', {});
var collection = db.collection("batch_document_insert_collection_safe");
collection.insert([{hello:'world_safe1'}
  , {hello:'world_safe2'}], {w:1}, function(err, result) {
  assert.equal(null, err);

  collection.findOne({hello:'world_safe2'}, function(err, item) {
    assert.equal(null, err);
    assert.equal('world_safe2', item.hello);
  })
});

logger.setLevel('INFO');                    // Set the log level
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.raw());
// configure app to use /page to store static files
app.use(express.static(__dirname + '/page'));
// configure app to use /uploads to store upload files
app.use(multer({ dest: './uploads/'}));

var port = process.env.PORT || 8080;        // set our port

for (m in module) {                         // load all modules
   module[m](app,logger,io,db)
}

var server = http.createServer(app);
var sockect = io.listen(server);
server.listen(port);
console.log("Restful API server on port", port)

