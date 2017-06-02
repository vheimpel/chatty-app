import React, {Component} from 'react';

import ChatBar from './ChatBar.jsx';
import NavBar from './Navbar.jsx';
import MessageList from './MessageList.jsx';



class App extends Component {

constructor(props) {
    super(props);
    this.state = {
        currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
        messages: []
        }
  }
componentDidMount() {

  var server = new WebSocket("ws://localhost:3001/");
  this.socket = server

  server.onmessage = this.onMessage

  // setTimeout(() => {
  //   const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
  //   const messages = this.state.messages.concat(newMessage)
  //   this.setState({messages: messages})
  // }, 3000);
}

onMessage = (event) => {
    var msg = JSON.parse(event.data);
    console.log("MSG.number", msg.number)
    switch(msg.type) {
      case "message":
      var newMessage = {
        username: msg.username,
        content: msg.content,
      }
      const messages = this.state.messages.concat(newMessage)
      this.setState({messages: messages})
      break;
      case "count":
      this.setState({count: msg.number})
      break;
    }
  }

// counter = (event) => {
//     var counter = JSON.parse(event.numberOfUsers);
//   }

onSubmit = (message) => {
  console.log("message from onSubmit in app.js:", message)
  this.setState({currentUser: {name: message.username}})
  const newMessage = {id: this.state.messages.length + 1, username: message.username, content: message.content};
  this.socket.send(JSON.stringify(message))
}

onSubmitName = (message) => {
  console.log("onSubmitName message", message)
  this.socket.send(JSON.stringify(message.username))
}

changeName = (unam) => {
  unam.username = this.state.currentUser.name
  if (this.state.currentUser.name !== unam.newUsername) { // Checks if the old and new usernames are different
    this.setState({currentUser: {name: unam.newUsername}})
    this.socket.send(JSON.stringify(unam))
  } else {
    console.log("no change!")
  }
}

  render() {
    return (
      <div>
      <ChatBar nameProp={this.state.currentUser.name} onSubmit={this.onSubmit} changeName={this.changeName}  changeName={this.changeName}/>
      <NavBar userCountProp={this.state.count} />
      <MessageList messagesProp={this.state.messages} />
      </div>
    );
  }
}

export default App;
