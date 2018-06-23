import React, { Component } from 'react'
import { Message } from '.'

class Messages extends Component {
  componentDidUpdate() {
    const objDiv = document.getElementById('messageList')
    objDiv.scrollTop = objDiv.scrollHeight
  }

  render() {
    return (
      <div className="messages" id="messageList">
        {this.props.messages.map((message, i) => {
          return <Message key={i} message={message} />
        })}
      </div>
    )
  }
}

export default Messages
