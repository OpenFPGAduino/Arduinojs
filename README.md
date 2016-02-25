Arduinojs
=========

Use node v0.10.26

Restful api server includes javascript wrapper for openFPGAdunino library

Only support value argument for openFPGAdunino api library. There is no structure or object support yet. 

Install the nodejs and nodejs-gyp:

apt-get install nodejs

npm install -g node-gyp

Build the project:

make

Test the project: 

make test

Use editor.swagger.io to edit swagger.json

Simulate the project in PC:

node server.js --sim
