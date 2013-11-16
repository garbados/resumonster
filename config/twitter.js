var fs = require('fs'),
    prompt = require('prompt'),
    util = require('./util');

module.exports = function (done) {
  prompt.start();

  prompt.get([
    'consumer key',
    'consumer secret',
    'access token',
    'access token secret'
  ], function (err, result) {
    if (err) {
      done(err);
    } else {
      var config = util.get_config();

      config.twitter = {
        consumer: {
          key: result['consumer key'],
          secret: result['consumer secret']
        },
        access: {
          key: result['access token'],
          secret: result['access token secret']
        }
      };



      fs.writeFile(util.config_path, JSON.stringify(config), done); 
    }
  });
};