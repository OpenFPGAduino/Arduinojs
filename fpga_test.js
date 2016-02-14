var fpga = require('./build/Release/openfpgaduino');
console.log('This should be eight:', fpga.add(3, 5));
console.log('Sleep for 2 second');
fpga.sleep(2);
console.log('Set led');
fpga.fpga_open();
fpga.led(1, 255, 255, 255);