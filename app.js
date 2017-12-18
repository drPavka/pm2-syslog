var pmx     = require('pmx');
var config    = pmx.initModule();

var pm2       = require('pm2');
var SysLogger = require('ain2');
var logger    = new SysLogger({tag: 'pm2',  facility: config.facility});

pm2.launchBus(function(err, bus) {
  bus.on('*', function(event, data){
    if (event == 'process:event') {
      logger.warn("===========" +'ng-e.id-api event ======= restart_count=%s status=%s',
                  data.process.restart_time,
                  data.event);
    }
  });

  bus.on('log:err', function(data) {
    logger.error("===========" + 'ERROR ng-e.id-api id=%s ==>%s', data.process.pm_id, data.data);
  });

  bus.on('log:out', function(data) {
    logger.log("===========" +'ng-e.id-api id=%s    %s', data.process.pm_id, data.data);
  });
});
