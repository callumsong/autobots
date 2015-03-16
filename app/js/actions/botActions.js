var botDispatcher = require('../dispatcher/botDispatcher');

var botConstants = require('../constants/botConstants');

var botActions = {

  addBot: function(bot) {
    botDispatcher.handleAction({
      actionType: botConstants.ADD_BOT,
      data: bot
    });
  },

  deleteBot: function(bot) {
    botDispatcher.handleAction({
      actionType: botConstants.DELETE_BOT,
      data: bot
    });
  },

  showBot: function(bot) {
    botDispatcher.handleAction({
      actionType: botConstants.SHOW_BOT,
      data: bot
    });
  }
};

module.exports = botActions;