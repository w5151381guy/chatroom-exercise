import React from 'react'
import Sidebar from 'react-sidebar'
import image00 from '../image/0-0.jpg'
import image10 from '../image/1-0.jpg'
import image20 from '../image/2-0.jpg'
import image30 from '../image/3-0.jpg'
import image31 from '../image/3-1.jpg'
import image32 from '../image/3-2.jpg'
import image40 from '../image/4-0.jpg'
import image41 from '../image/4-1.jpg'
import image42 from '../image/4-2.jpg'
import image43 from '../image/4-3.jpg'
import image44 from '../image/4-4.jpg'
import image45 from '../image/4-5.jpg'
import image50 from '../image/5-0.jpg'

// ui
import Chatroom from './Chatroom'
import Header from './Header'

// scss
import styles from '../style/share.scss'

class Container extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user: this.props.user,
      label: this.props.label,
      sidebarOpen: false,
      sidebarDocked: false,
      unread: 0,
    }
  }

  componentDidMount() {
    Reveal.initialize()
    hljs.initHighlightingOnLoad()
  }

  componentWillReceiveProps(props) {
    console.log(props)
    this.setState({ sidebarDocked: props.sidebarDocked, user: props.user })
  }

  onSetSidebarOpen = open => {
    this.setState({ sidebarOpen: open })
  }

  render() {
    let sideBarStyles = {
      root: {
        position: 'relative',
        width: '100%', //styles.pageContentMainWidth,
        height: '100%', //styles.pageContentHeight,
      },
      sidebar: { overflowY: 'hidden', zIndex: 100 },
      content: { overflowY: 'hidden' },
    }

    return (
      <Sidebar
        sidebar={
          this.state.user === '' ? (
            ''
          ) : (
            <Chatroom onUnread={this.props.onUnread} user={this.state.user} />
          )
        }
        open={this.state.sidebarOpen}
        docked={this.state.sidebarDocked}
        onSetOpen={this.onSetSidebarOpen}
        pullRight={true}
        styles={sideBarStyles}>
        <div className="reveal">
          <div className="slides">
            <section>
              <section>
                <img src={image00} width="100%" />
              </section>
            </section>
            <section>
              <section>
                <img src={image10} width="100%" />
              </section>
            </section>
            <section>
              <section>
                <img src={image20} width="100%" />
              </section>
            </section>
            <section>
              <section>
                <img src={image30} width="100%" />
              </section>
              <section>
                <img src={image31} width="100%" />
              </section>
              <section>
                <img src={image32} width="100%" />
              </section>
            </section>
            <section>
              <section>
                <img src={image40} width="100%" />
              </section>
              <section>
                <img src={image41} width="100%" />
              </section>
              <section>
                <img src={image42} width="100%" />
              </section>
              <section>
                <img src={image43} width="100%" />
              </section>
              <section>
                <img src={image44} width="100%" />
              </section>
              <section>
                <img src={image45} width="100%" />
              </section>
            </section>
            <section>
              <section>
                <img src={image50} width="100%" />
              </section>
            </section>
          </div>
        </div>
      </Sidebar>
    )
  }
}

export default Container
