module.exports = function(app, logger, io, db, express) {
    logger.info('module coap');
    var router = express.Router();
    app.use('/coap', router);
}