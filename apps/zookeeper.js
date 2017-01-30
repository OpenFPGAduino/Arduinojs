module.exports = function(app, logger, io, db, express) {
    logger.info('module zookeeper');
    var router = express.Router();
    var zookeeper = require('node-zookeeper-client');

    app.use('/zookeeper', router);
}