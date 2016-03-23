var assert = require('assert'); 
var fork = require('child_process').fork;
var expect = require('chai').expect;
var http = require('http');
var request = require('request').defaults({baseUrl:"http://localhost:8080/"});;
var child

before(function(done) {
    child = fork('./server',['--sim']);
    setTimeout(function(){done();},1900);
});

beforeEach(function() {

});

describe('Angularjs', function() {
  describe('main', function() {
	  it('get the front page', function(done) {

		request('/', function (error, response, body) {
		  if (!error && response.statusCode == 200) {
		    console.log(body);
		    done();
		  }
		  else {
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
		  }
		  else {
		   assert(0);
		   done();
		  }
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
  describe('db', function() {
    it('add doc', function(done) {
	 request.post({
	headers: {"Connection": "close"},
    url: '/db/add/test',
    method: 'POST',
    json:true,
    body: {a:1,b:2}
}, function(error, response, body) {
		  if (!error && response.statusCode == 200) {
		    console.log(body);
		    done();
		  }
		  else {
		   assert(0);
		   done();
		  }
		});
    });
    it('verfiy doc', function(done) {
	 request("/db/list/test", function(error, response, body) {
		  if (!error && response.statusCode == 200) {
		    console.log(body);
		    var data = JSON.parse(body)
		    assert.equal(data[0].a ,1);
		    assert.equal(data[0].b ,2);
		    done();
		  }
		  else {
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
		  }
		  else {
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
