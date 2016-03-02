module.exports = function(logger, argv) {
    console.log('module linux');
    require('shelljs/global');

    if (!which('git')) {
        echo('Sorry, this script requires git');
        //exit(1);
    }


    ls('*.js').forEach(function(file) {
        console.log(file)
    });


    if (argv.sim) {
        logger.debug("Skip fpga module for simulation");
        return;
    }

    var ffi = require('ffi');

    var libm = ffi.Library('libm', {
        'ceil': ['double', ['double']]
    });
    console.log(libm.ceil(1.5)); // 2

    // You can also access just functions in the current process by passing a null
    var current = ffi.Library(null, {
        'atoi': ['int', ['string']]
    });
    console.log(current.atoi('1234')); // 1234


}