import React, { Component, Fragment } from 'react'
import {
  Navbar,
  Nav,
  NavItem,
  Badge,
  NavDropdown,
  MenuItem,
} from 'react-bootstrap'
import { CLIENTID } from '../utils/config'
import { GoogleLogin, GoogleLogout } from 'react-google-login'

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showAlert: false,
      user: this.props.user,
      unread: this.props.unread,
    }
  }

  componentWillReceiveProps(props) {
    this.setState({ unread: props.unread })
  }

  showChatroom = () => {
    this.props.onSidebarDocked()
    this.setState({ unread: 0 })
  }

  onLogout = () => {
    sessionStorage.removeItem('user')
    this.props.onUserChange()
  }

  onLogin = data => {
    const userInfo = JSON.stringify({
      type: 'student',
      name: data.profileObj.name,
    })
    sessionStorage.setItem('user', userInfo)
    this.props.onUserChange()
  }

  onClickItem = eventKey => {
    console.log(eventKey)
    if (eventKey === 1) {
      this.showChatroom()
    } else if (eventKey === 2) {
      this.setState({ showAlert: true })
    } else if (eventKey === 3) {
      this.onLogin()
    }
  }

  appendHead = user => {
    const logout = (
      <Nav onSelect={k => this.onClickItem(k)} pullRight>
        <NavItem eventKey={0} className="nav-item-name">
          <i className="fas fa-user" />
          {user.name}
        </NavItem>
        <NavItem eventKey={1} className="nav-item">
          {this.state.unread > 0 ? (
            <Badge style={{ fontSize: '15px' }}>{this.state.unread}</Badge>
          ) : (
            ''
          )}
          <i className="fas fa-comments" />
        </NavItem>
        <NavItem eventKey={2} className="nav-item">
          <GoogleLogout
            buttonText=""
            onLogoutSuccess={this.onLogout}
            className="fas fa-sign-out-alt"
          />
        </NavItem>
      </Nav>
    )
    const login = (
      <Nav onSelect={k => this.onClickItem(k)} pullRight>
        <NavItem eventKey={3} className="nav-item">
          <GoogleLogin
            clientId={CLIENTID}
            onSuccess={this.onLogin}
            className="fas fa-sign-in-alt"
            buttonText=""
          />
        </NavItem>
      </Nav>
    )
    return user === '' ? login : logout
  }

  render() {
    let user = this.props.user
    console.log(user)
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a>Final Project</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>{this.appendHead(user)}</Navbar.Collapse>
      </Navbar>
    )
  }
}

export default Header
