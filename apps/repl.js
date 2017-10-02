module.exports = function(parser_parameter,config,logger,db) {
var net = require("net");
var repl = require("repl");
var context = arguments;
logger.debug("Initial repl module");
var context_v_name = parser_parameter(context.callee.toString()).split(',')

net.createServer(function (socket) {
  var r= repl.start({
    prompt: "node via TCP socket> ",
    input: socket,
    output: socket
  }).on('exit', function() {
    socket.end();
  });

  for(var i=1;i<context_v_name.length;++i)   // inject the context to the repl
        r.context[context_v_name[i].toString()] = context[i];
  logger.debug("repl context initial console start");
}).listen(config.telnet);
}

