module.exports = function(app, logger, router, db, cron) {
    logger.info('module yeelink');
    
var http = require("http");


new cron('1 * * * * *', function() {
    logger.debug('You will see this message every second');
 var API_key = '954582e6b80f689de6d0a346c9c3d281';   
 var postjson = {
  "timestamp":new Date(),
  "value":26.5
};

postData = JSON.stringify(postjson);

console.log(postData);

//http://api.yeelink.net/v1.1/device/18329/sensor/331103/datapoints

var options = {
  hostname: 'api.yeelink.net',
  port: 80,
  path: '/v1.1/device/18329/sensor/327792/datapoints',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': postData.length,
    'U-ApiKey': API_key
  }
};

var req = http.request(options, function(res) {
  console.log('STATUS: ' + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    console.log('BODY: ' + chunk);
  });
});

req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});

// write data to request body
req.write(postData);
req.end();
    
}, null, true, 'America/Los_Angeles');


}
