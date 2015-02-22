'use strict';

var mongoose = require('mongoose');

var autobotSchema = new mongoose.Schema ({
  autobotName: String
});

module.exports = mongoose.model('Autobot', autobotSchema);