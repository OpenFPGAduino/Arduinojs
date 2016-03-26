var assert = require('assert');
var fork = require('child_process').fork;
var expect = require('chai').expect;
var http = require('http');
var request = require('request').defaults({
    baseUrl: "http://localhost:8080/"
});;
var cide = require('request').defaults({
    baseUrl: "http://localhost:8888/"
});;
var fpgadesign = require('request').defaults({
    baseUrl: "http://localhost:8686/"
});;

var main;

before(function(done) {
    child = fork('./server', ['--sim']);
    setTimeout(function() {
        done();
    }, 1900);
});

beforeEach(function() {

});

describe('Angularjs', function() {
    describe('main', function() {
        it('get the front page', function(done) {

            request('/', function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log(body);
                    done();
                } else {
                    assert(0);
                    done();
                }
            });
        });
        it('get the app list', function(done) {
            request("/list", function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log(body);
                    done();
                } else {
                    assert(0);
                    done();
                }
            });
        });
        it('get the main app', function(done) {
            request("/get/main.js", function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log(body);
	            main = body;
                } else {
                    assert(0);

                }
                done();
            });
        });
        it('install the main app', function(done) {
            request({
                headers: {
                    "Connection": "close"
                },
                url: '/install',
                method: 'POST',
                json: true,
                body: {
                    filename: "test.js",
                    code: main
                }
            }, function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log(body);
                } else {
                    assert(0);

                }
                done();
            });
        });
        it('load the main app', function(done) {
            request({
                headers: {
                    "Connection": "close"
                },
                url: '/load',
                method: 'POST',
                json: true,
                body: {
                    filename: "test.js"
                }
            }, function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log(body);
                } else {
                    assert(0);

                }
                done();
            });
        });
        it('remove the test app', function(done) {
            request.del("/test.js", function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log(body);
                    done();
                } else {
                    assert(0);
                    done();
                }
            });
        });

        it('get the log', function(done) {
            request({
                headers: {
                    "Connection": "close"
                },
                url: '/log',
                method: 'POST',
                json: true,
                body: {
                    length: 100,
                    position: 0
                }
            }, function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log(body);
                } else {
                    assert(0);

                }
                done();
            });
        });

    });
});

describe('Angularjs', function() {
    describe('fpga', function() {
        it('always true', function() {
            assert(1)
        });
    });
});

describe('Angularjs', function() {
    describe('linux', function() {
        it('always true', function() {
            assert(1)
        });
    });
});

describe('Angularjs', function() {
    describe('ide', function() {
        it('start ide', function() {
            request("/ide/c/start", function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log(body);
                } else {
                    assert(0);
                }
                done();
            });
        });
        it('access ide', function() {
            cide("/", function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log(body);
                } else {
                    assert(0);
                }
                done();
            });
        });
        it('stop ide', function() {
            request("/ide/c/stop", function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log(body);
                } else {
                    assert(0);
                }
                done();
            });
        });
    });
});


describe('Angularjs', function() {
    describe('db', function() {
        it('add doc', function(done) {
            request({
                headers: {
                    "Connection": "close"
                },
                url: '/db/add/test',
                method: 'POST',
                json: true,
                body: {
                    a: 1,
                    b: 2
                }
            }, function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log(body);
                } else {
                    assert(0);
                }
		done();
            });
        });
        it('verfiy doc', function(done) {
            request("/db/list/test", function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log(body);
                    var data = JSON.parse(body)
                    assert.equal(data[0].a, 1);
                    assert.equal(data[0].b, 2);
                    done();
                } else {
                    assert(0);
                    done();
                }
            });
        });
        it('remove doc', function(done) {
            request.del("/db/remove/test", function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log(body);
                    done();
                } else {
                    assert(0);
                    done();
                }
            });
        });
    });
});

afterEach(function() {

});

after(function() {
    child.kill('SIGHUP');
});
