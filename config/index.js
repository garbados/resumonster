var path = require('path'),
    util = require('./util');

module.exports = function(service, done) {
  var config = util.get_config();
  
  if (!config[service]) {
    require('./' + service)(function (err) {
      if (err) {
        done(err);
      } else {
        config = util.get_config();
        
        done(null, config[service]);
      }
    });
  } else {
    done(null, config[service]);
  }
}