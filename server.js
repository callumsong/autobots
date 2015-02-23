'use strict';
var express = require('express'),
    mongoose = require('mongoose'),
    passport = require('passport');

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/transformers_dev');

var app = express(),
    superSecret = app.get('appSecret');
app.set('appSecret', process.env.SECRET || 'robotsindisguise');
app.use(passport.initialize());
require('./lib/passportStrat')(passport);

var autobotsRouter = express.Router(),
    userRouter = express.Router();

require('./routes/autobotRoutes')(autobotsRouter, superSecret);
require('./routes/userRoutes')(userRouter, passport, superSecret);

app.use('/api/v1', autobotsRouter);
app.use('/api/v1', userRouter);

app.listen(process.env.PORT || 3000, function() {
  console.log('online on ' + (process.env.PORT || 3000));
});
// monogod --dbpath=./db(or other specified path) --smallfiles (makes files smaller)