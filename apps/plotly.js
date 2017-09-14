module.exports = function (app, express, logger, port) {
  var localtunnel = require('plotly');
  var router = express.Router();
  logger.info('module plotly');
  var apiKey = "6ko8gZthKiqAbUQH6IOn";
  var username = "lizhizhou";
  var plotly = require('plotly')(username, apiKey);
  router.post('/plot/:name', function (req, res) {
    var x = req.body.x;         // [1,2,3]
    var y = req.body.y;         //[1,2,3]
    var name = req.params.name;
    var mode = req.params.mode; // "lines""
    var plotData = [{
      x: x,
      y: y,
      name: name,
      mode: mode,
      type: "scatter"
    }];
    var layout = {
      title: name,
    };
    var graphOptions = { layout: layout, filename: name, fileopt: "overwrite" }
    plotly.plot(plotData, graphOptions, function (err, msg) {
      if (err) {
        logger.info(err);
        res.json({
          "error": err
        });
      } else {
        logger.info('Success! The plot (' + msg.filename + ') can be found at ' + msg.url);
        res.json({
          "url": msg.url
        });
      }
    });

  });

  app.use('/plotly', router);
}
