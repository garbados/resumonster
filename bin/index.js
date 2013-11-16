#!/usr/bin/env node

var optimist = require('optimist');

var options = [
  // short option, long option, help
  {
    short: 't',
    long: 'twitter',
    help: ''
  }, {
    short: 'f',
    long: 'facebook',
    help: ''
  }, {
    short: 'l',
    long: 'linkedin',
    help: ''
  }, {
    short: 'g',
    long: 'github',
    help: ''
  }, {
    short: 'u',
    long: 'tumblr',
    help: ''
  }
];

// add options to the optimist object
options.forEach(function (option) {
  optimist = optimist
    .alias(option.short, option.long)
    .describe(option.short, option.help);
});

// parse process.argv
var argv = optimist.argv;

if (argv._.length === 0) {
  if (Object.keys(argv).length === 2) {
    console.log("You didn't pass any options!");
  } else {
    require('./default')(options, argv); 
  }
} else if (argv._.length === 1) {
  switch (argv._[0]) {
    case 'sync':
      require('./sync')(options, argv);
      break;
    default:
      console.log('Unrecognized command:', argv._[0]);
      break;
  }
}