var http = require('http')

http.get("http://localhost:8080/fpga/api/list", function(res) {
    console.log("Got response: " + res.statusCode);
}).on('error', function(e) {
    console.log("Got error: " + e.message);
});