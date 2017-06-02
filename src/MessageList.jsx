import React, {Component} from 'react';

import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    return (
      <div className="message system">
        {this.props.messagesProp.map((singlemessage, index) =>
            <Message key={index} username={singlemessage.username} content={singlemessage.content} />
          )
        }
      </div>
    );
  }
}

export default MessageList;