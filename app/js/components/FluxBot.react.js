var React = require('react'),
    botActions = require('../actions/botActions');

var FluxBot = React.createClass({
  addBot: function() {
    var newBot = this.props.newBot;
    botActions.addBot(newBot);
  },

  deleteBot: function() {
    var beGone = this.props.data.terminate;
    botActions.deleteBot(beGone);
  },

  render: function() {
    var self = this, bots = this.props.bots;
    var autobots = this.props.data.map(function(bot) {
      return(
        <li key={bot._id} terminate="terminate">
          <h2>{bot.autobotName}</h2>
          <button type="button" onClick={this.deleteBot}>Terminate Bot</button>
        </li>
        );
    }.bind(this));
    return (
      <div>
        <form name="create-bot" onSubmit={this.addBot}>
          <input name="create-bot" newBot="newBot" type="text"/>
          <button type="submit">Create Bot</button>
        </form>
        <ul>
          {autobots}
        </ul>
      </div>
      );
  }

});

module.exports = FluxBot;