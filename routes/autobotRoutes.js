'use strict';
var Autobot = require('../models/Autobot'),
    eat_auth = require('../lib/eatAuth'),
    bodyparser = require('body-parser');

module.exports = function(app, appSecret) {
  app.use(bodyparser.json());

  app.get('/autobots', eat_auth(appSecret), function (req, res) {
    Autobot.find({}, function (err, data) {
      if (err) return res.status(500).send({'msg': 'could not retrieve autobot'});
      res.json(data);
    });
  });

  app.post('/autobots', eat_auth(appSecret), function(req, res) {
    var newAutobot = new Autobot(req.body);
    newAutobot.save(function (err, bot) {
      if (err) return res.status(500).send({'msg': 'could not save autobot'});

      res.json(bot);
    });
  });

  app.put('/autobots/:id', eat_auth(appSecret), function (req, res) {
    var updatedBot = req.body;
    delete updatedBot._id;
    Autobot.update({_id: req.params.id}, updatedBot, function (err) {
      if (err) return res.status(500).send({'msg': 'could not update bot'});
      res.json(req.body);
    });
  });

  app.delete('/autobots/:id', eat_auth(appSecret), function (req, res) {
    Autobot.remove({_id: req.params.id}, function (err) {
      if (err) return res.status(500).send({'msg': 'could not delete'});
      res.json(req.body);
      });
  });
};