var React = require('react'),
    BotStore = require('..stores/botStore'),
    FluxBot = require('./FluxBot.react');

function getBotState() {
  return {
    autobot: BotStore.getBots()
  };
}

var FluxBotApp = React.createClass({
  getInitialState: function() {
    return getBotState();
  },

  componentDidMount: function() {
    BotStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    BotStore.removeListener(this._onChange);
  },

  render: function() {
    return (
      <div className='autobots-app'>
        <FluxBot autobot={this.state.autobot}/>
      </div>
      );
  },

  _onChange: function() {
    this.setState(getBotState());
  }

});

module.exports = FluxBotApp;