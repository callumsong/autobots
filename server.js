'use strict';
var express = require('express');
var mongoose = require('mongoose');
var autobotRoutes = require('./routes/autobotRoutes');

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/transformers_dev');

var app = express();
app.use(express.static(__dirname + '/build'));
var router = express.Router();

autobotRoutes(router);

app.use('/api/v1', router);

app.listen(process.env.PORT || 3000, function() {
  console.log('online on ' + (process.env.PORT || 3000));
});
// monogod --dbpath=./db(or other specified path) --smallfiles (makes files smaller)