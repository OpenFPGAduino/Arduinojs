module.exports = function(app, logger, router, db, cron) {
    logger.info('module yeelink');

var temp = '/v1.1/device/18329/sensor/327792/datapoints'
var fan  = '/v1.1/device/18329/sensor/331103/datapoints'

var http = require("http");
    
function yeelink_post(path, postjson, callback) {
var API_key = '954582e6b80f689de6d0a346c9c3d281';   
postData = JSON.stringify(postjson);

console.log(postData);

var options = {
  hostname: 'api.yeelink.net',
  port: 80,
  path: path,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': postData.length,
    'U-ApiKey': API_key
  }
};

var req = http.request(options,callback);

req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});

// write data to request body
req.write(postData);
req.end();

}     
    
function yeelink_get(path, callback) {
var API_key = '954582e6b80f689de6d0a346c9c3d281';   

var options = {
  hostname: 'api.yeelink.net',
  port: 80,
  path: path,
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': postData.length,
    'U-ApiKey': API_key
  }
};

var req = http.request(options,callback);

req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});

// write data to request body
req.write(postData);
req.end();

}     


new cron('1 * * * * *', function() {
    logger.debug('You will see this message every second');
var json = {}
    yeelink_post(temp,{
  "timestamp":new Date(),
  "value":26.5
},  function(res) {
  console.log('STATUS: ' + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    console.log('BODY: ' + chunk);
  });
});
    //yeelink_post(fan,JSON)
}, null, true, 'America/Los_Angeles');


}
