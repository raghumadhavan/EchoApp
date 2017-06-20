const React = require('react')
const ReactDOM = require('react-dom')

var EchoMessage = React.createClass({
  generateClasses: function() {
    if(this.props.message.from === 'bot') {
      return 'bot-message';
    } else {
      return 'user-message';
    }
  },
  render: function() {
    return (<div className={this.generateClasses()}>
        <div className="message">{this.props.message.message}</div>
      </div>);
  }
});

var EchoHistory = React.createClass({
  render: function() {
    return (
      <div className="chat-output">
        {this.props.messages.map(function(message, i) {
          return (
            <EchoMessage key={i} message={message}></EchoMessage>
          );
        })} 
      </div>
    )
  }
});

var EchoMessageComposer = React.createClass({
  getInitialState: function() {
    return {
      inputValue: '',
      status:'online'
    };
  },
  componentDidUpdate: function(){
  	//setTimeout((function(){this.setState({status:'Online'})}).bind(this),500)
  },
  onKeyPress: function(event) {
    if(event.key !== 'Enter' && event.type !== 'click') { 
    	this.setState({status:'Typing..'})
    	setTimeout((function(){this.setState({status:'Online'})}).bind(this),500)  	
    	return; 
    }
    this.props.sendMessage({
      message: this.state.inputValue,
      from: 'you'
    });
    this.setState({ inputValue: '' });
  },
  
  handleChange: function(event) {
    this.setState({inputValue: event.target.value});
  },
  
  render: function() {
    return (
    <div className="status">
    <span className='stat'>{this.state.status}</span>
      <div className="chat-input">
        <input placeholder="Talk to me..." className="user-input" type="text" value={this.state.inputValue} onChange={this.handleChange} onKeyPress={this.onKeyPress}/>
        <div className="send_message" onClick={this.onKeyPress}>
            <div className="icon"></div>
            <div className="text">Send</div>
        </div>
        </div>
      </div>
    )
  }
});

var Echo = React.createClass({
  getInitialState: function() {
    return {
      messages: []
    };
  },
  botresponse:function(message){
  	setTimeout((function(){
  		this.addMessage({message:message.message,from:"bot"});
  	}).bind(this),500)
  },
  addMessage: function(message) {
    this.setState(function(previousState) {
      previousState.messages.push(message);
      return { messages: previousState.messages };
    });
    document.getElementsByClassName('chat-output')[0].scrollTop = document.getElementsByClassName('chat-output')[0].scrollHeight
   //to keep scroll bar down
  },
  sendMessage: function(message) {
    this.addMessage(message)
    this.botresponse(message);
  },
  render: function() {
    return (
      <div>
        <EchoHistory messages={this.state.messages}></EchoHistory>
        <EchoMessageComposer sendMessage={this.sendMessage}></EchoMessageComposer>
      </div>
    );
  }
});

ReactDOM.render(<Echo />, document.getElementById('app'));