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
var log4js = require('log4js');
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var loadDir = require('./loaddir');
var module = loadDir('apps');
var multer = require('multer');
var sockectio = require('socket.io');
var tingodb = require('tingodb')();
var optimist = require('optimist');
var pjson = require('./package.json');

var app = express();                  // start express
var logger = log4js.getLogger();      // start logging
var db = new tingodb.Db('./db/', {}); // embeded json database
var argv = optimist.argv;             // argument object

logger.setLevel('INFO');              // Set the log level
logger.info(pjson.name + " Version:" + pjson.version);
logger.info(pjson.description);
logger.info("Runing at Node Version:" + process.version);
logger.info("Write by:" +  pjson.author);


app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.raw());
// configure app to use /page to store static files
app.use(express.static(__dirname + '/page'));
// configure app to use /uploads to store upload files
app.use(multer({
    dest: './uploads/'
}));

var port = argv.port || process.env.PORT || 8080;             // set our port
var server = http.createServer(app);
var io = sockectio.listen(server);
for (m in module) {                                           // load all modules in apps

    var parameter = module[m].toString()
        .replace(/((\/\/.*$)|(\/\*[\s\S]*?\*\/)|(\s))/mg, '') // remove spaces and comments 
        .match(/^function\s*[^\(]*\(\s*([^\)]*)\)/m)[1]       // get parameter
    logger.debug('parameter is ' + parameter);
    eval('module[m]' + '(' + parameter + ')');                // dependency injection, inject the var the apps needs in it parameter
}
server.listen(port);
logger.info("Restful API server run on port", port)
