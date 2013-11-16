var config = {},
    async = require('async'),
    app = require('../app');

module.exports = function (options, argv) {
  // get config values for the options in `argv`
  options.forEach(function (option) {
    if (option.short in argv) {
      if (option.long in app.services) {
        config[option.long] = argv[option.short];
      } else {
        console.log('Not implemented:', option.long);
      }
    }
  });

  if (Object.keys(config).length) {
    async.mapSeries(Object.keys(config), app.config, function (err, config_values) {
      if (err) throw err;

      var to_execute = [];

      Object.keys(config).forEach(function (key, i) {
        var func =
          // get the named service, ex: twitter
          app.services[key]
          // pass it the relevant config values
          (config_values[i])
          // bind it to the value passed via CLI
          .bind(null, config[key]);

        to_execute.push(func);
      });

      async.parallel(to_execute, function (err, results) {
        if (err) {
          throw err;
        } else {
          console.log(results);
        }
      });
    });
  }
};