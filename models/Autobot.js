'use strict';

var mongoose = require('mongoose');

var autobotSchema = new mongoose.Schema ({
  autobotPic: String
});

module.exports = mongoose.model('Autobot', autobotSchema);