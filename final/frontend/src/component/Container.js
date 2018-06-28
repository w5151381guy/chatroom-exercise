import React from 'react'
import Sidebar from 'react-sidebar'

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
                <img src="../image/0-0.jpg" width="100%" />
              </section>
            </section>
            <section>
              <section>
                <img src="../image/1-0.jpg" width="100%" />
              </section>
            </section>
            <section>
              <section>
                <img src="../image/2-0.jpg" width="100%" />
              </section>
            </section>
            <section>
              <section>
                <img src="../image/3-0.jpg" width="100%" />
              </section>
              <section>
                <img src="../image/3-1.jpg" width="100%" />
              </section>
              <section>
                <img src="../image/3-2.jpg" width="100%" />
              </section>
            </section>
            <section>
              <section>
                <img src="../image/4-0.jpg" width="100%" />
              </section>
              <section>
                <img src="../image/4-1.jpg" width="100%" />
              </section>
              <section>
                <img src="../image/4-2.jpg" width="100%" />
              </section>
              <section>
                <img src="../image/4-3.jpg" width="100%" />
              </section>
              <section>
                <img src="../image/4-4.jpg" width="100%" />
              </section>
              <section>
                <img src="../image/4-5.jpg" width="100%" />
              </section>
            </section>
            <section>
              <section>
                <img src="../image/5-0.jpg" width="100%" />
              </section>
            </section>
          </div>
        </div>
      </Sidebar>
    )
  }
}

export default Container
