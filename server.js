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
var pjson = require('./package.json');
var config = require('./config.json');
var path = require('path');
var events = require('events');
var log4js = require('log4js');
var http = require('http');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var loadDir = require('./loaddir');
var module = loadDir(config.app_path);
var multer = require('multer');
var sockectio = require('socket.io');
var tingodb = require('tingodb')();
var optimist = require('optimist');
var figlet = require('figlet');
var node_uuid = require('node-uuid');
var cron = require('cron').CronJob;
var List = require("collections/list");
var Set = require("collections/set");
var Map = require("collections/map");
require('tingyun');

var app = express(); // start express
var router = express.Router(); // start routee for express
var db = new tingodb.Db(config.db_path, {}); // embeded json database
var argv = optimist.argv; // argument object
var event = new events.EventEmitter(); //event
var uuid = node_uuid.v4();

log4js.loadAppender('file');
log4js.addAppender(log4js.appenders.file(config.log_path), 'server');
var logger = log4js.getLogger('server'); // start logging
logger.setLevel('INFO'); // Set the log level
if (argv.debug) logger.setLevel('DENUG'); // Set the log level

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
logger.info("UUID", uuid);

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

function parser_parameter(fun_str) {
    return fun_str.toString()
        .replace(/((\/\/.*$)|(\/\*[\s\S]*?\*\/)|(\s))/mg, '') // remove spaces and comments 
        .match(/^function\s*[^\(]*\(\s*([^\)]*)\)/m)[1] // get parameter
}

var port = argv.port || process.env.PORT || config.port; // set our port
var server = http.createServer(app);
var io = sockectio.listen(server);

function loadmodule(module) {
    for (m in module) { // load all modules in apps

        var parameter = parser_parameter(module[m]);
        logger.debug('parameter is ' + parameter);
        eval('module[m]' + '(' + parameter + ')'); // dependency injection, inject the var the apps needs in it parameter
    }
}
if (argv.sim) {
    var mock = loadDir(config.mock_path);
    loadmodule(mock);
    var map = new Map(module).filter(function (value,index) {
        for (v in mock) {
            if(index == v) {
                logger.info("Replace real module "+v+" with mockup");
                return false;
            }
        }
        return true;
    });
    module = map.toArray();
    loadmodule(module);
} else {
    loadmodule(module);
}

function dynamicloadmodule(filename) {
    var name = path.basename(filename, '.js');
    var apppath = __dirname + '/' + config.app_path + filename;

    var script = "require(\'" + apppath + "\');"
    logger.debug("Dynamic load module");
    logger.debug(script);
    var ret = eval(script);
    var parameter = parser_parameter(ret)
    logger.debug('parameter is ' + parameter);
    script = "ret(" + parameter + ");";
    eval(script);
}

event.addListener('load', dynamicloadmodule);

server.listen(port);
logger.info("Restful API server run on port", port)