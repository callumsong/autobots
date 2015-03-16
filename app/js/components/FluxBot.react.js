var React = require('react'),
    botActions = require('../actions/botActions');

var FluxBot = React.createClass({
  addBots: function(event) {
    var newBot = this.props.newBot;
    botActions.addBot(newBot);
  },

  deleteBot: function(event) {
    var beGone = this.props.terminate;
    botActions.deleteBot(beGone);
  },

  showBot: function(event) {
    var autobot = this.props.autobot;
    botActions.showBot(autobot);
  }

});