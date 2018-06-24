import React, { Component } from 'react'

class ChatInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      label: this.props.label,
      user: this.props.user,
      chatInput: '',
      image: undefined,
    }
  }

  componentWillReceiveProps(props) {
    this.setState({ user: props.user })
  }

  onSubmit = e => {
    e.preventDefault()

    this.setState({ chatInput: '' })
    let text = this.state.chatInput

    // send text
    if (text.trim() !== '') this.props.onSend(text)
  }

  textChangeHandler = e => {
    this.setState({ chatInput: e.target.value })
  }

  render() {
    const style = {
      preview: {
        position: 'relative',
      },
      captureContainer: {
        display: 'flex',
        position: 'absolute',
        justifyContent: 'center',
        zIndex: 1,
        bottom: 0,
        width: '100%',
      },
      captureButton: {
        backgroundColor: '#fff',
        borderRadius: '50%',
        height: 56,
        width: 56,
        color: '#000',
        margin: 20,
      },
      captureImage: {
        width: '100%',
      },
    }
    return (
      <div className="input-box">
        <form onSubmit={this.onSubmit}>
          <div className="text-section">
            <input
              type="text"
              onChange={this.textChangeHandler}
              value={this.state.chatInput}
              placeholder="輸入訊息"
              required
            />
            <i
              className="fa fa-2x fa-arrow-circle-right"
              onClick={this.onSubmit}
            />
          </div>
        </form>
      </div>
    )
  }
}
export default ChatInput
