var app = require('../app');

module.exports = function (options, argv) {
  app.config('datastore', function (err, datastore) {
    app.sync(datastore, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log('Successfully replicated!');
      }
    });
  });
}