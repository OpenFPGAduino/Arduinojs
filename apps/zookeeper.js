module.exports = function(app, logger, io, db, router) {
    logger.info('module zookeeper');
    var zookeeper = require('node-zookeeper-client');

    app.use('/zookeeper', router);
}
