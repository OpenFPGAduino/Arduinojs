var assert = require('assert'); 
var fork = require('child_process').fork;
var child

before(function() {
    child = fork('./server',['--sim']);
});

beforeEach(function() {

});

describe('Angularjs', function() {
  describe('main', function() {
    it('always true', function() {
	assert(1)
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
    it('always true', function() {
	assert(1)
    });
  });
});

afterEach(function() {

});

after(function() {
    child.kill('SIGHUP');
});
