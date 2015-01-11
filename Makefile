all:
	node-gyp configure build
ut:
	node unit_test.js 

