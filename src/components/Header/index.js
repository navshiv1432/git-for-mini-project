import {Component} from 'react'

import {withRouter, Link} from 'react-router-dom'

import {GiHamburgerMenu} from 'react-icons/gi'

import {AiFillCloseCircle} from 'react-icons/ai'

import Cookies from 'js-cookie'

import './index.css'

class Header extends Component {
  state = {
    showNavItems: false,
  }

  toggleHamburgerBtn = () => {
    this.setState(preState => ({showNavItems: !preState.showNavItems}))
  }

  LogOut = () => {
    Cookies.remove('jwt_token')

    const {history} = this.props

    history.replace('/login')
  }

  renderNavItemsCont = mobile => (
    <ul className={`nav-items-cont${mobile}`}>
      <Link to="/" className="home">
        Home
      </Link>

      <Link to="/cart" className="cart">
        Cart
      </Link>

      <button className="logout-btn" onClick={this.LogOut} type="button">
        Logout
      </button>

      <li className="nav-item-nav">
        <button
          className="nav-btn"
          type="button"
          onClick={this.toggleHamburgerBtn}
        >
          <AiFillCloseCircle className="circle-icon" />
        </button>
      </li>
    </ul>
  )

  render() {
    const {showNavItems} = this.state

    return (
      <nav className="nav-cont">
        <div className="logo-hamburger-cont">
          <Link to="/" className="logo-link">
            <img
              src="https://res.cloudinary.com/dppqkea7f/image/upload/v1625742512/Frame_274_zlrzwk.svg"
              className="logo"
              alt="website logo"
            />

            <h1 className="website-title">Tasty Kitchens</h1>
          </Link>

          <div className="ham-cont">
            <div className="cont-cont">
              <button
                className="hamburger-btn"
                type="button"
                onClick={this.toggleHamburgerBtn}
              >
                <GiHamburgerMenu className="hamburger-icon" />
              </button>
            </div>
          </div>
        </div>

        {this.renderNavItemsCont('')}

        {showNavItems && this.renderNavItemsCont('mobile')}
      </nav>
    )
  }
}

export default withRouter(Header)
