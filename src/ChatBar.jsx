import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: this.props.nameProp, // Sets default value to what is in props in app
      content: ''
    }
}


_onKeyPress = (e) => {
  if(e.key === "Enter") {
      // Construct a msg object containing the data the server needs to process the message from the chat client.
      var msg = {
        type: "postmessage",
        username: this.state.username,
        content: this.state.content
      };
      // Send the msg object as a JSON-formatted string.
      this.props.onSubmit(msg)
      this.setState({content: ""}) // Clears the form
  }
}

_onKeyPressName = (e) => {
  if(e.key === "Enter") {
      // Construct a msg object containing the data the server needs to process the message from the chat client.
      var unam = {
        type: "postmessage",
        newUsername: this.state.username,
      };
      // Send the msg object as a JSON-formatted string.
      this.props.changeName(unam)
  }
}

// _onKeyPressName = (e) => {
//   this.props.changeName(e.target.value)
// }

_contentChange = (e) => {
  this.setState({content: e.target.value}) // Sets message bar to what the user enters
}

_nameChange = (e) => {
  this.setState({username: e.target.value}) // Sets the name field to what the user enters
}

  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username"
               onKeyPress={this._onKeyPressName}
               onChange={this._nameChange}
               value={this.state.username}/>
        <input className="chatbar-message"
               onKeyPress={this._onKeyPress}
               onChange={this._contentChange}
               value={this.state.content}
               placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
}


export default ChatBar;

