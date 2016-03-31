module.exports = function(app, argv, logger) {
    if (argv.debug) {
        logger.debug("Skip error module for debug");
        return;
    }
    app.use(
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
}