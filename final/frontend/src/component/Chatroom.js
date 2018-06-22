import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
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
      label: this.props.label,
    }
  }

  render() {
    return (
      <ChatApp
        // user={this.state.user}
        // label={this.state.label}
        {...this.state}
        onUpdateProgressbar={this.props.onUpdateProgressbar}
        onUnread={this.props.onUnread}
        onJoin={this.props.onJoin}
      />
    )
  }
}

export default withRouter(Chatroom)
