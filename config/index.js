var path = require('path'),
    util = require('./util');

module.exports = function(service, done) {
  var config = util.get_config();
  
  if (!config[service]) {
    require('./' + service)(function (err) {
      done(err);

      config = util.get_config();
    });
  } else {
    done(null, config[service]);
  }
}