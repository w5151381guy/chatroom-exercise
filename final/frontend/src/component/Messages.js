import React, { Component } from 'react'
import { Message } from '.'

class Messages extends Component {
  componentDidUpdate() {
    const objDiv = document.getElementById('messageList')
    objDiv.scrollTop = objDiv.scrollHeight
  }

  render() {
    let indexOfImg = -1 // num of image
    return (
      <div className="messages" id="messageList">
        {this.props.messages.map((message, i) => {
          indexOfImg = message.msgtype === 'image' ? indexOfImg + 1 : indexOfImg
          // console.log(indexOfImg)
          return (
            <Message
              key={i}
              message={message}
              openLightbox={this.props.openLightbox}
              indexOfImg={indexOfImg}
            />
          )
        })}
      </div>
    )
  }
}

export default Messages
