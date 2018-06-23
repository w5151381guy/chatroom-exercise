import React, { Component } from 'react'
import Websocket from 'react-websocket'

// ui
import { ChatApp } from '.'
// require('../../style/message.scss')
// require('../../style/chatroom.scss')

class Chatroom extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: this.props.user,
    }
  }

  render() {
    return <ChatApp {...this.state} onUnread={this.props.onUnread} />
  }
}

export default Chatroom
