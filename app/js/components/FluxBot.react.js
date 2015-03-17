var React = require('react'),
    botActions = require('../actions/botActions');

var FluxBot = React.createClass({
  addBot: function() {
    var newBot = this.state.newAutoBot;
    botActions.addBot(newBot);
  },

  deleteBot: function() {
    var beGone = this.props.data.terminate;
    botActions.deleteBot(beGone);
  },

  render: function() {
    var self = this, data = this.props.data;
      return (
        <div>
        <form name="create-bot" onSubmit={this.addBot}>
          <input name="create-bot" newBot="newBot" value={data.autobotName} type="text"/>
          <button type="submit">Create Bot</button>
        </form>
        <ul>
          {data.map(function(bot) {
      return(
        <li key={bot._id} terminate="terminate">
          <h2>{bot.autobotName}</h2>
          <button type="button" onClick={this.deleteBot}>Terminate Bot</button>
        </li>
        );
    }.bind(self, data))}
        </ul>
      </div>
      );
  }

});

module.exports = FluxBot;