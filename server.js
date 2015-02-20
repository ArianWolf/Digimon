/* jshint node: true */
var Glue = require('glue');
var Manifest = require('./manifest');

var composeOptions = { relativeTo: __dirname };

Glue.compose(Manifest, composeOptions, function(err, server) {
  'use strict';

  if (err) {
    throw err;
  }

  server.start(function() {
    console.log('Digimon started.');
  });
});
