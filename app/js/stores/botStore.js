var botDispatcher = require('../dispatcher/botDispatcher'),
    EventEmitter = require('events').EventEmitter,
    botConstants = require('../constants/botConstants'),
    request = require('superagent'),
    _ = require('underscore');

var _bots = [];

function loadBotData (data) {
  _bots = data;
}

var BotStore = _.extend({}, EventEmitter.prototype, {

  getBots: function() {
    return _bots;
  },

  addChangeListener: function(callback) {
    this.on('change', callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  },

  emitChange: function() {
    this.emit('change');
  }
});

botDispatcher.register(function(payload) {
  var action = payload.action,
      data = payload.action.data,
      actionType = payload.action.actionType;

  var handlers = {
    ADD_BOT: function() {
      _bots.push(data);
      request
        .post('/api/v1/autobots')
        .send(data)
        .end(function(err, res) {
          if (err) return console.log(err);
          return res.body;
        });
    },

    DELETE_BOT: function() {
      var index = -1;
      _bots.forEach(function(p, i) {
        if (p._id === data._id) index = i;
      });
      _bots.splice(index, 1);
      request
        .delete('/api/v1/autobots/' + data._id)
        .end(function(err, res) {
          if(err) return console.log(err);
          return;
        });
    },

    SHOW_BOT: function() {
      request
        .get('/api/v1/autobots')
        .end(function(err, res) {
          if (err) return console.log(err);
          data = res.body;
          loadBotData(data);
          getBots();
        });
    }
  };

  if (!handlers[actionType]) return true;
  handlers[actionType]();
  BotStore.emitChange();

  return true;
});

module.exports = BotStore;