import React, { Component, Fragment } from 'react'

class Message extends Component {
  createImgurblock = url => {
    return (
      <Fragment>
        <a onClick={e => this.props.openLightbox(this.props.indexOfImg, e)}>
          <img src={url} height="100%" width="100%" />
        </a>
      </Fragment>
    )
  }

  render() {
    const message = this.props.message
    const fromMe = message.fromMe ? 'from-me' : ''
    const system = message.usertype === 'system' ? 'system' : ''

    return (
      <div className={`message ${fromMe} ${system}`}>
        <div className="username">{message.username}</div>

        <div className="message-box">
          <div className="message-text">
            {message.msgtype === 'image'
              ? this.createImgurblock(message.text)
              : message.text}
          </div>
          {/* <br/> */}
          <div className={fromMe ? 'time-left' : 'time-right'}>
            {message.timestamp}
          </div>
        </div>
      </div>
    )
  }
}

export default Message
