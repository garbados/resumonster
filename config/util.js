var path = require('path');

function getUserHome() {
  return process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
}

var config_path = path.join(getUserHome(), '.resumaker.json');

function get_config() {
  try {
    return require(config_path);
  } catch (e) {
    console.log(e);
    return {};
  }
}

function merge (obj) {
  var config = get_config();

  for (var attrname in obj) {
    config[attrname] = obj[attrname];
  }

  return config;
}

module.exports = {
  config_path: config_path,
  get_config: get_config,
  merge: merge
};