import React, { Component } from 'react'
import axios from 'axios'
import Camera from 'react-camera'
// require('font-awesome/scss/font-awesome.scss')
// url
import { URL_UPLOADFILE } from '../../../constants/url'

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

  onSubmit = e => {
    e.preventDefault()

    this.setState({ chatInput: '' })
    let text = this.state.chatInput
    let image = this.state.image

    // send file
    if (typeof image !== 'undefined') {
      this.uploadImage(image)
    }

    // send text
    if (text.trim() !== '') this.props.onSend(text)
  }

  textChangeHandler = e => {
    this.setState({ chatInput: e.target.value })
  }

  uploadImage = image => {
    let params = new FormData()
    params.append('file', image)
    params.append('label', this.state.label)
    params.append('fileType', 'image')
    axios
      .post(URL_UPLOADFILE, params)
      .then(res => {
        this.props.onSendImage(res.data.url)
        this.setState({ image: undefined })
        this.refs.imageName.innerText = ''
      })
      .catch(err => {
        console.log('uploadImage error', err.response)
      })
  }

  onSelectImage = () => {
    this.refs.imageId.click()
  }

  onChangeImage = e => {
    let image = e.target.files[0]
    this.setState({ image })
    this.refs.imageName.innerText =
      typeof image !== 'undefined' ? image.name : ''
  }

  takePicture = () => {
    this.camera.capture().then(blob => {
      this.img.src = URL.createObjectURL(blob)
      this.img.onload = () => {
        URL.revokeObjectURL(this.src)
      }
    })
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
          <div className="image-section">
            <i className="fa fa-2x fa-image" onClick={this.onSelectImage}>
              <input
                ref="imageId"
                type="file"
                accept="image/*;capture=camera"
                onChange={this.onChangeImage}
                style={{ display: 'none' }}
              />
            </i>
            <span ref="imageName" />
          </div>
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
