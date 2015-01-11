var meteroi = require('./build/Release/meteroi');
console.log( 'This should be eight:', meteroi.add(3,5));
console.log( 'Sleep for 2 second');
meteroi.sleep(2);
console.log( 'Set ioa');
meteroi.ioa(1,1);
console.log( 'Set led');
meteroi.led(1,255,255,255);
