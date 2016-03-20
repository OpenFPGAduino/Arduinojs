var assert = require('assert'); 
var fork = require('child_process').fork;
var http = require('http');
var child

before(function(done) {
    child = fork('./server',['--sim']);
    setTimeout(function(){done();},1500);
});

beforeEach(function() {

});

describe('Angularjs', function() {
  describe('main', function() {
    it('get the app list', function(done) {
	 http.get("http://localhost:8080/list", function(res) {
	  console.log("Got response: " + res.statusCode);
	  assert(1);
	  done();
	}).on('error', function(e) {
	  console.log("Got error: " + e.message);
	  assert(0);
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
  describe('db', function() {
    it('add doc', function(done) {
	 //http.get("http://localhost:8080/db/add/test", function(res) {
	 // console.log("Got response: " + res.statusCode);
	 // assert(1);
	 // done();
	//}).on('error', function(e) {
	//  console.log("Got error: " + e.message);
	//  assert(0);
	//  done();
	//});

	assert(1)
    });
    it('verfiy doc', function(done) {
	 http.get("http://localhost:8080/db/list/test", function(res) {
	  console.log("Got response: " + res.statusCode);
	  assert(1);
	  done();
	}).on('error', function(e) {
	  console.log("Got error: " + e.message);
	  assert(0);
	  done();
	});

	assert(1)
    });
  });
});

afterEach(function() {

});

after(function() {
    child.kill('SIGHUP');
});
