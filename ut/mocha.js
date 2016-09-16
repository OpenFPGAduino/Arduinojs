// e2e test
var assert = require('assert');
var fork = require('child_process').fork;
var expect = require('chai').expect;
var http = require('http');
var tcpPortUsed = require('tcp-port-used');
var config = require('../config.json');
var request = require('request').defaults({
    baseUrl: "http://localhost:8080/"
});;
var cide = require('request').defaults({
    baseUrl: "http://localhost:8888/"
});;
var fpgadesign = require('request').defaults({
    baseUrl: "http://localhost:8686/"
});;

var child = null;
var mqtt = null;

before(function(done) {

    tcpPortUsed.check(8080, 'localhost')
        .then(function(inUse) {
            if (!inUse) {
                child = fork('./server', ['--sim']);
                // mqtt = fork('../IoT/mqtt/server');
                setTimeout(function() {
                    done();
                }, 5000);
            } else {
                done();
            }
        }, function(err) {
            console.error('Error on check:', err.message);
        });

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
          it('list fpga api fucton', function() {
            request("/fpga/api/list", function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log(body);
                } else {
                    assert(0);
                }
                done();
            });
        });
        
        it('call fpga api fucton', function() {
            request({
                headers: {
                    "Connection": "close"
                },
                url: '/fpga/api/call/add',
                method: 'POST',
                json: true,
                body:
                    [1,2]
            }, function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    assert(response.body == 3);
                } else {
                    assert(0);
                }
                done();
            });
        });
    });
});

describe('Angularjs', function() {
    describe('linux', function() {
        it('get shell cmd list', function() {
            request("/linux/shell/list", function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log(body);
                } else {
                    assert(0);
                }
            });
        });
    });
});

describe('Angularjs', function() {
    describe('cron', function() {
        it('always true', function() {
            assert(1);
        });
    });
});


describe('Angularjs', function() {
    describe('tty', function() {
        it('always true', function() {
            assert(1);
        });
    });
});

describe('Angularjs', function() {
    describe('upload', function() {
        it('always true', function() {
            assert(1);
        });
    });
});

describe('Angularjs', function() {
    describe('mqtt', function() {
        it('client connect', function(done) {
            request({
                headers: {
                    "Connection": "close"
                },
                url: '/mqtt/client/connect',
                method: 'POST',
                json: true,
                body: {
                    link: 'http://test.mosquitto.org/'
                        //link: 'http://localhost/'
                }
            }, function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log(body);
                } else {
                    assert(0);
                }
                setTimeout(function() {
                    done();
                }, 5000);
            });
        });
        it('subscribe message', function(done) {
            request({
                headers: {
                    "Connection": "close"
                },
                url: '/mqtt/client/subscribe',
                method: 'POST',
                json: true,
                body: {
                    name: "test"
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
        it('publish message', function(done) {
            request({
                headers: {
                    "Connection": "close"
                },
                url: '/mqtt/client/publish',
                method: 'POST',
                json: true,
                body: {
                    name: "test",
                    message: "test mesaage"
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
        it('client end', function(done) {
            request({
                headers: {
                    "Connection": "close"
                },
                url: '/mqtt/client/end',
                method: 'POST',
                json: true,
                body: {}
            }, function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log(body);
                } else {
                    assert(0);
                }
                done();
            });
        });
        it('start the server', function() {
            //        	   request("/mqtt/server", function(error, response, body) {
            //                   if (!error && response.statusCode == 200) {
            //                       console.log(body);
            //                   } else {
            //                       assert(0);
            //                   }
            //                   setTimeout(function() {
            //                       done();
            //                   }, 1900);
            //               });
        });
    });
});

describe('Angularjs', function() {
    describe('ide', function() {
        it('start c ide', function() {
            request("/ide/c/start", function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log(body);
                } else {
                    assert(0);
                }
                setTimeout(function() {
                    done();
                }, 5000);
            });
        });
        it('access c ide', function() {
            cide("/", function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log(body);
                } else {
                    assert(0);
                }
                done();
            });
        });
        it('check c ide status', function() {
            request("/ide/c/status", function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log(body);
                    var ret = JSON.parse(body)
                    assert(ret == true)
                } else {
                    assert(0);
                }
                done();
            });
        });
        it('stop c ide', function() {
            request("/ide/c/stop", function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log(body);
                } else {
                    assert(0);
                }
                setTimeout(function() {
                    done();
                }, 500);
            });
        });
        it('start fpga designer', function() {
            request("/ide/fpga/start", function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log(body);
                } else {
                    assert(0);
                }
                setTimeout(function() {
                    done();
                }, 5000);
            });
        });
        it('access fpga designer', function() {
            fpgadesign("/", function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log(body);
                } else {
                    assert(0);
                }
                done();
            });
        });
        it('check fpga designer status', function() {
            request("/ide/fpga/status", function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log(body);
                    var ret = JSON.parse(body)
                    assert(ret == true)
                } else {
                    assert(0);
                }
                setTimeout(function() {
                    done();
                }, 5000);
            });
        });
        it('stop fpga designer', function() {
            request("/ide/fpga/stop", function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log(body);
                } else {
                    assert(0);
                }
                setTimeout(function() {
                    done();
                }, 500);
            });
        });
    });
});


describe('Angularjs', function() {
    describe('db', function() {
        it('list doc', function(done) {
            request("/db/list", function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log(body);
                    done();
                } else {
                    assert(0);
                    done();
                }
            });
        });
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
        it('query doc', function(done) {
            request({
                headers: {
                    "Connection": "close"
                },
                url: '/db/query/test',
                method: 'POST',
                json: true,
                body: {
                    a: {
                        $eq: 1
                    }
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
        it('update doc', function(done) {
            request({
                headers: {
                    "Connection": "close"
                },
                url: '/db/update/test',
                method: 'POST',
                json: true,
                body: {
                    query: {
                        'a': 1
                    },
                    command: {
                        $set: {
                            'b': 1
                        }
                    }
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
                    assert.equal(data[0].b, 1);
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
    if (child) child.kill('SIGHUP');
    if (mqtt) mqtt.kill('SIGHUP');
});