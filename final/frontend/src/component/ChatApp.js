import React, { Component } from 'react'
import Messages from './Messages'
import Websocket from 'react-websocket'
import Lightbox from 'react-images'

// url
import { URL_UPLOADFILE, URL_WEBSOCKET } from '../../../constants/url'

// ui
import { ChatInput } from '.'

// require('../../style/message.scss')

class ChatApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      label: this.props.label,
      user: this.props.user, //{'type', 'key', 'name', 'note}
      socketURL: '',
      messages: [], // [{'key', 'usertype', 'username', 'message', 'timestamp'}, ...]
      images: [],
      lightboxIsOpen: false,
      currentImage: 0,
    }
    this.receiveMessage = this.receiveMessage.bind(this)
    this.onSendImage = this.onSendImage.bind(this)
    this.closeLightbox = this.closeLightbox.bind(this)
    this.gotoNext = this.gotoNext.bind(this)
    this.gotoPrevious = this.gotoPrevious.bind(this)
    this.gotoImage = this.gotoImage.bind(this)
    this.onClickImage = this.onClickImage.bind(this)
    this.openLightbox = this.openLightbox.bind(this)
  }

  componentWillMount() {
    // console.log('websocket')
    let { label, user } = this.state
    let socketURL = URL_WEBSOCKET + label + '/' + user.name + '/'

    this.setState({ label: label, user: user, socketURL: socketURL })
  }

  openLightbox(index, e) {
    e.preventDefault()
    this.setState({
      currentImage: index,
      lightboxIsOpen: true,
    })
  }

  closeLightbox() {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    })
  }

  gotoPrevious() {
    this.setState({
      currentImage: this.state.currentImage - 1,
    })
  }

  gotoNext() {
    this.setState({
      currentImage: this.state.currentImage + 1,
    })
  }

  gotoImage(index) {
    this.setState({
      currentImage: index,
    })
  }

  onClickImage() {
    if (this.state.currentImage === this.state.images.length - 1) return

    this.gotoNext()
  }

  sendHandler = text => {
    let { label, user } = this.state
    const socket = this.refs.socket
    socket.state.ws.send(
      JSON.stringify({
        type: 'chat',
        key: user.key,
        usertype: user.type,
        username: user.name,
        msgtype: 'text',
        text: text,
        label: label,
      })
    )
  }

  onSendImage(imageUrl) {
    let { label, user } = this.state
    const socket = this.refs.socket
    socket.state.ws.send(
      JSON.stringify({
        type: 'chat',
        key: user.key,
        usertype: user.type,
        username: user.name,
        msgtype: 'image',
        text: imageUrl,
        label: label,
      })
    )
  }

  // receive message from server
  receiveMessage(data) {
    let { label, user } = this.state

    data = JSON.parse(data)
    console.log(data)
    if (data.type === 'init') {
      // 初始聊天室訊息，取得聊天紀錄
      this.setState({ messages: [], images: [] })
      data.messages.forEach(msg => {
        msg.fromMe = msg.username === user.name
        this.addMessage(msg)
      })
    } else if (user.type === 'teacher' && data.type === 'join') {
      // 使用者是老師，且有隊伍加入遊戲時，更新管理頁面的隊伍資訊
      let msg = data.message
      this.props.onJoin(this.state.label, msg.key, msg.username, msg.note)
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
    } else if (data.type === 'progress' && user.type === 'teacher') {
      console.log('progress', data)
      let { label, key, value } = data.message
      this.props.onUpdateProgressbar(label, key, value)
    }
  }

  addMessage = message => {
    const { messages, images } = this.state
    if (message.msgtype === 'image') {
      let url = message.text
      // let pos = message.text.lastIndexOf('.')
      images.push({ src: message.text })
    }
    messages.push(message)
    this.setState({ messages, images })
  }

  render() {
    return (
      <div className="msg-container">
        {/* <div className="msg-header">
            <i className="fas fa-users"/>
          </div> */}
        <Messages
          messages={this.state.messages}
          openLightbox={this.openLightbox}
        />
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
        <Lightbox
          currentImage={this.state.currentImage}
          images={this.state.images}
          isOpen={this.state.lightboxIsOpen}
          onClickImage={this.handleClickImage}
          onClickNext={this.gotoNext}
          onClickPrev={this.gotoPrevious}
          onClickThumbnail={this.gotoImage}
          onClose={this.closeLightbox}
          // preventScroll={this.props.preventScroll}
          showThumbnails={true}
          // spinner={this.props.spinner}
          // spinnerColor={this.props.spinnerColor}
          // spinnerSize={this.props.spinnerSize}
          // theme={this.props.theme}
        />
      </div>
    )
  }
}

export default ChatApp
