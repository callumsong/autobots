'use strict';
var Autobot = require('../models/Autobot'),
    bodyparser = require('body-parser'),
    multipart = require('connect-multiparty'),
    path = require('path'),
    fs = require('fs');

module.exports = function(app) {
  app.use(bodyparser.json());
  app.use(multipart({
    uploadDir: '../build'
  }));

  app.get('/autobots', function (req, res) {
    Autobot.find({}, function (err, data) {
      if (err) return res.status(500).send({'msg': 'could not retrieve autobot'});
      res.json(data);
    });
  });

  app.post('/autobots', function(req, res) {
    var newAutobot = new Autobot(),
        file = req.file;
    fs.writeFileSync('./build/pictures/' + newAutobot._id + '.png', file);
    newAutobot.autobotPic = 'http://localhost:3000/pictures/' + newAutobot._id + '.png';
    newAutobot.save(function (err, bot) {
      if (err) return res.status(500).send({'msg': 'could not save autobot'});

      res.json(bot);
    });
  });

  app.put('/autobots/:id', function (req, res) {
    var updatedBot = req.body;
    delete updatedBot._id;
    Autobot.update({_id: req.params.id}, updatedBot, function (err) {
      if (err) return res.status(500).send({'msg': 'could not update bot'});
      res.json(req.body);
    });
  });

  app.delete('/autobots/:id', function (req, res) {
    Autobot.remove({_id: req.params.id}, function (err) {
      if (err) return res.status(500).send({'msg': 'could not delete'});
      res.json(req.body);
      });
  });
};