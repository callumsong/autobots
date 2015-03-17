var botDispatcher = require('../dispatcher/botDispatcher');

var botActions = {

  addBot: function(bot) {
    botDispatcher.handleAction({
      actionType: 'ADD_BOT',
      data: bot
    });
  },

  deleteBot: function(bot) {
    botDispatcher.handleAction({
      actionType: 'DELETE_BOT',
      data: bot
    });
  },

  showBot: function(bot) {
    botDispatcher.handleAction({
      actionType: 'SHOW_BOT',
      data: bot
    });
  }
};

module.exports = botActions;