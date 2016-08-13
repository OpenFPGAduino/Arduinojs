module.exports = function(app, router, cron, logger) {
    logger.info('module cron');

    new cron('* * * * * *', function() {
        logger.debug('You will see this message every second');
    }, null, true, 'America/Los_Angeles');

    router.post('/:job', function(req, res) {
        res.json({
            message: 'update ok'
        });

    });

    router.delete('/:job', function(req, res) {
        res.json({
            message: 'update ok'
        });
    });

    app.use('/cron', router);

}