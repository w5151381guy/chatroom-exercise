import React, { Component } from 'react'
import Container from './Container'
import Header from './Header'

class Main extends Component {
  state = {
    user: JSON.parse(sessionStorage.getItem('user'))
      ? JSON.parse(sessionStorage.getItem('user'))
      : '', //{ type: 'student', name: 'Andy' },
    unread: 0,
    sidebarDocked: false,
  }

  onUnread = () => {
    let unread = this.state.unread + 1
    if (!this.state.sidebarDocked) this.setState({ unread })
  }

  onSidebarDocked = () => {
    this.setState({
      sidebarDocked: !this.state.sidebarDocked,
      unread: 0,
    })
  }

  onUserChange = () => {
    this.setState({
      user: JSON.parse(sessionStorage.getItem('user'))
        ? JSON.parse(sessionStorage.getItem('user'))
        : '',
    })
  }

  render() {
    return (
      <div>
        <Header
          user={this.state.user}
          onSidebarDocked={this.onSidebarDocked}
          unread={this.state.unread}
          page="main"
          onUserChange={this.onUserChange}
        />
        <div className="page-content">
          <div className="page-content-main">
            <Container
              user={this.state.user}
              sidebarDocked={this.state.sidebarDocked}
              onUnread={this.onUnread}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Main
