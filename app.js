var config = require('./config'),
    PouchDB = require('pouchdb'),
    pouch = new PouchDB('data'),
    services = require('./services'),
    async = require('async');

function sync (datastore, done) {
  var opts = {
    create_target: true,
    onChange: console.log,
    onError: console.log
  };

  function do_sync (func, done) {
    var local_opts = Object.create(opts);
    local_opts.complete = done;

    func(datastore, local_opts);
  }

  async.map([
    pouch.replicate.to,
    pouch.replicate.from
  ], do_sync, done);
}

// bind each service to the same datastore
for (var key in services) {
  services[key] = services[key].bind(null, pouch);
}

module.exports = {
  services: services,
  pouch: pouch,
  config: config,
  sync: sync
};