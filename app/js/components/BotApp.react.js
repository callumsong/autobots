var React = require('react');
var BotStore = require('../stores/botStore');
var FluxBot = require('./FluxBot.react');
function getBotState() {
  return {
    bots: BotStore.getBots()
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
    BotStore.removeChangeListener(this._onChange);
  },
  render: function() {
    return (
      <div className='autobots-app'>
        <FluxBot data={this.state.bots}/>
      </div>
      );
  },
  _onChange: function() {
    this.setState(getBotState());
  }
});

module.exports = FluxBotApp;