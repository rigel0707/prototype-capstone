import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'

import logo from '../../assets/images/logo.png'

export const Navbar = () => {
  const [cookies, setCookies] = useCookies(['access_token'])
  const [showOffcanvas, setShowOffcanvas] = useState(false)
  const navigate = useNavigate()

  function navlinkClick() {
    setShowOffcanvas(false)
  }

  const logout = () => {
    setCookies('access_token', '')
    window.localStorage.removeItem('userID')
    window.localStorage.removeItem('sessionToken')
    window.localStorage.removeItem('username')
    window.localStorage.removeItem('cartID')
    window.localStorage.removeItem('cartItems')
    navigate('/login')
  }

  let isAdmin = false
  if (cookies.access_token) {
    try {
      const decoded = jwt_decode(cookies.access_token)
      isAdmin = decoded.role === 'admin'
    } catch (e) {
      console.log('Invalid token:', e.message)
    }
  }

  let isUser = false
  if (cookies.access_token) {
    try {
      const decoded = jwt_decode(cookies.access_token)
      isUser = decoded.role === 'user'
    } catch (e) {
      console.log('Invalid token:', e.message)
    }
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setShowOffcanvas(true)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <a className="navbar-brand me-5" href="/">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
              FuzzyJARR
            </h5>
          </a>
          <div
            className={`offcanvas offcanvas-start ${
              showOffcanvas ? 'show' : ''
            }`}
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header row justify-content-center">
              <div className="col-12 d-flex justify-content-end mb-5">
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowOffcanvas(false)}
                  aria-label="Close"
                ></button>
              </div>
              <img
                src={logo}
                className="col-6"
                width="150px"
                alt="FuzzyJARR"
              ></img>
            </div>
            <div className="offcanvas-body" id="navbarTogglerDemo03">
              <ul className="navbar-nav align-items-center ms-auto mb-3 mb-lg-0 align-items-center">
                <li className="nav-item mx-1">
                  <Link to="/" onClick={navlinkClick}>
                    Home
                  </Link>
                </li>
                <li className="nav-item mx-1">
                  <Link to="/shop" onClick={navlinkClick}>
                    Shop
                  </Link>
                </li>
                <li className="nav-item mx-1">
                  {(isAdmin || isUser) && (
                    <Link to="/cart" onClick={navlinkClick}>
                      Cart
                    </Link>
                  )}
                </li>
                <li className="nav-item mx-1">
                  {isUser && (
                    <Link to="/dashboard" onClick={navlinkClick}>
                      Dashboard
                    </Link>
                  )}
                </li>
                {isAdmin && (
                  <li className="nav-item dropdown">
                    <button
                      className="btn btn-black mx-1 dropdown-toggle"
                      type="button"
                      id="dashboardDropdown"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Dashboard
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dashboardDropdown"
                    >
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/dashboard"
                          onClick={navlinkClick}
                        >
                          User
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/admin"
                          onClick={navlinkClick}
                        >
                          Admin
                        </Link>
                      </li>
                    </ul>
                  </li>
                )}
              </ul>
              <div className="d-flex justify-content-center">
                {!cookies.access_token ? (
                  <>
                    <button
                      className="btn btn-black mx-1"
                      onClick={() => {
                        navigate('/login')
                        setShowOffcanvas(false)
                      }}
                    >
                      Login
                    </button>
                    <button
                      className="btn btn-black mx-1"
                      onClick={() => {
                        navigate('/register')
                        setShowOffcanvas(false)
                      }}
                    >
                      Register
                    </button>
                  </>
                ) : (
                  <button
                    className="btn btn-black mx-1"
                    onClick={() => {
                      logout()
                      setShowOffcanvas(false)
                    }}
                  >
                    Logout
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
