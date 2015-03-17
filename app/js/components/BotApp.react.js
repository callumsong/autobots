var React = require('react');
var BotStore = require('../stores/botStore');
var FluxBot = require('./FluxBot.react');

var FluxBotApp = React.createClass({
  getInitialState: function() {
    return {newBot: {autobotName:''}};
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
        <FluxBot data={this.state.data}/>
      </div>
      );
  },
  _onChange: function() {
    this.setState(getBotState());
  }
});

module.exports = FluxBotApp;