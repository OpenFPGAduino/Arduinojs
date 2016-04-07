module.exports = function(app, logger, router) {
    logger.info('module tty');
    
var tty = require('tty.js');
var ttyserver = tty.createServer({
  shell: 'bash',
  users: {
    openfpgaduino: 'lab123'
  },
  port: 8000
});


ttyserver.listen();

    app.use('/tty', router);

}

