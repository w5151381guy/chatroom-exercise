import React, { Component } from 'react'
import Messages from './Messages'
import Websocket from 'react-websocket'
// url
import { URL_WEBSOCKET } from '../utils/config'

// ui
import { ChatInput } from '.'

// require('../../style/message.scss')

class ChatApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: this.props.user, //{'type', 'key', 'name', 'note}
      socketURL: '',
      messages: [], // [{'key', 'usertype', 'username', 'message', 'timestamp'}, ...]
    }
  }

  componentWillMount() {
    // console.log('websocket')
    let { user } = this.state
    let socketURL = URL_WEBSOCKET + '12345/' + user.name + '/'

    this.setState({ user: user, socketURL: socketURL })
  }

  sendHandler = text => {
    let { user } = this.state
    const socket = this.refs.socket
    console.log('sendHandler', user, text)
    socket.state.ws.send(
      JSON.stringify({
        type: 'chat',
        usertype: user.type,
        username: user.name,
        text: text,
        label: '12345',
      })
    )
  }

  // receive message from server
  receiveMessage = data => {
    let { user } = this.state

    data = JSON.parse(data)
    console.log(data)
    if (data.type === 'init') {
      // 初始聊天室訊息，取得聊天紀錄
      this.setState({ messages: [] })
      data.messages.forEach(msg => {
        msg.fromMe = msg.username === user.name
        this.addMessage(msg)
      })
    } else if (data.type === 'chat') {
      // 當收到聊天訊息或是離開訊息時，
      let msg = data.message
      msg.fromMe = msg.username === user.name
      if (msg.username !== user.name) {
        this.props.onUnread()
      }
      this.addMessage(msg)
    } else if (data.type === 'leave') {
      let msg = data.message
      msg.fromMe = msg.username === user.name
      this.addMessage(msg)
    }
  }

  addMessage = message => {
    const { messages } = this.state
    messages.push(message)
    this.setState({ messages })
  }

  render() {
    return (
      <div className="msg-container">
        <Messages messages={this.state.messages} />
        <ChatInput
          onSend={this.sendHandler}
          onSendImage={this.onSendImage}
          user={this.state.user}
          label={this.state.label}
        />
        <Websocket
          ref="socket"
          url={this.state.socketURL}
          onMessage={this.receiveMessage}
          reconnect={true}
        />
      </div>
    )
  }
}

export default ChatApp
