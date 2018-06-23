import React, { Component, Fragment } from 'react'

class Message extends Component {
  render() {
    const message = this.props.message
    const fromMe = message.fromMe ? 'from-me' : ''
    const system = message.usertype === 'system' ? 'system' : ''

    return (
      <div className={`message ${fromMe} ${system}`}>
        {system ? '' : <div className="username">{message.username}</div>}

        <div className="message-box">
          {/* <br/> */}
          <div className="message-text">{message.text}</div>
          <div className={fromMe ? 'time-left' : 'time-right'}>
            {message.timestamp}
          </div>
        </div>
      </div>
    )
  }
}

export default Message
