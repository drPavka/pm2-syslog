var pmx = require('pmx');
var config = pmx.initModule();

var pm2 = require('pm2');
var SysLogger = require('ain2');
var logger = new SysLogger({tag: 'pm2', facility: config.facility});

var indent = ' '.repeat(20);

pm2.launchBus(function (err, bus) {
    bus.on('*', function (event, data) {
        if (event == 'process:event') {
            logger.warn(indent + 'EVENT %s', data.event);
        }
    });

    bus.on('log:err', function (data) {
        logger.error(indent + 'ERROR %s', data.data);
    });

    bus.on('log:out', function (data) {
        logger.log(indent + 'MESSAGE %s', data.data);
    });
});
