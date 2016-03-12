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
var path = require('path');
var events = require('events');
var log4js = require('log4js');
var http = require('http');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var loadDir = require('./loaddir');
var module = loadDir('apps');
var multer = require('multer');
var sockectio = require('socket.io');
var tingodb = require('tingodb')();
var optimist = require('optimist');
var pjson = require('./package.json');
var figlet = require('figlet');
var uuid = require('node-uuid');

var app = express(); // start express
var router = express.Router(); // start routee for express
var db = new tingodb.Db('./db/', {}); // embeded json database
var argv = optimist.argv; // argument object
var event = new events.EventEmitter(); //event

log4js.loadAppender('file');
log4js.addAppender(log4js.appenders.file('server.log'), 'server');
var logger = log4js.getLogger(server); // start logging
logger.setLevel('INFO'); // Set the log level

figlet('Openfpgaduino', function(err, data) {
    if (err) {
        return;
    }
    logger.info("\n" + data);
});

logger.info(pjson.name + " Version:" + pjson.version);
logger.info(pjson.description);
logger.info("Runing at Node Version:" + process.version);
logger.info("Write by:" + pjson.author);

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

function parser_parameter(fun_str) 
{
	return fun_str.toString()
        .replace(/((\/\/.*$)|(\/\*[\s\S]*?\*\/)|(\s))/mg, '') // remove spaces and comments 
        .match(/^function\s*[^\(]*\(\s*([^\)]*)\)/m)[1] // get parameter
}

var port = argv.port || process.env.PORT || 8080; // set our port
var server = http.createServer(app);
var io = sockectio.listen(server);
for (m in module) { // load all modules in apps

    var parameter = parser_parameter(module[m]);
    logger.debug('parameter is ' + parameter);
    eval('module[m]' + '(' + parameter + ')'); // dependency injection, inject the var the apps needs in it parameter
}

function loadmodule(filename) {
    var name = path.basename(filename, '.js');
    var apppath = __dirname + "/apps/" + filename;

    var script = "require(\'" + apppath + "\');"
    logger.debug("Dynamic load module");
    logger.debug(script);
    var ret = eval(script);
    var parameter = parser_parameter(ret)
    logger.debug('parameter is ' + parameter);
    script = "ret(" + parameter + ");";
    eval(script);
}

event.addListener('load', loadmodule);

/*app.use(
    function errorHandler(err, req, res, next) {
        if (res.headersSent) {
            return next(err);
        }
        logger.error('error');
        res.status(500);

        res.json('error', {
            error: err
        });
    });
*/
server.listen(port);
logger.info("Restful API server run on port", port)
