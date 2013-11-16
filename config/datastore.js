var fs = require('fs'),
    prompt = require('prompt'),
    util = require('./util');

module.exports = function (done) {
  prompt.start();

  prompt.get([
    'datastore'
  ], function (err, result) {
    if (err) {
      done(err);
    } else {
      var config = {
        datastore: result.datastore || 'http://localhost:5984/resumaker'
      };

      fs.writeFile(util.config_path, JSON.stringify(util.merge(config)), done); 
    }
  });
};