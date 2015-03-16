var Dispatcher = require('flux').Dispatcher;

var botDispatcher = new Dispatcher();

botDispatcher.handleAction = function(action) {
  this.dispatch({
    source: 'VIEW_ACTION',
    action: action
  });
};

module.exports = botDispatcher;