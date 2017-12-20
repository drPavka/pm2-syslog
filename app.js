var pmx = require('pmx');
var config = pmx.initModule();

var pm2 = require('pm2');
var SysLogger = require('ain2');
var logger = new SysLogger({tag: 'pm2', facility: config.facility});

var prefix = 'E.ID > ';

pm2.launchBus(function (err, bus) {
    bus.on('*', function (event, data) {
        if (event == 'process:event') {
            logger.warn(prefix + 'EVENT %s', data.event);
        }
    });

    bus.on('log:err', function (data) {
        logger.error(prefix + 'ERROR %s', data.data);
    });

    bus.on('log:out', function (data) {
        logger.log(prefix + 'MESSAGE %s', data.data);
    });
});
