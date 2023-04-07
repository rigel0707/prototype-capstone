import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'

export const Navbar = () => {
  const [cookies, setCookies] = useCookies(['access_token'])
  const navigate = useNavigate()

  const logout = () => {
    setCookies('access_token', '')
    window.localStorage.removeItem('userID')
    window.localStorage.removeItem('sessionToken')
    window.localStorage.removeItem('username')
    window.localStorage.removeItem('cartID')
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
    <div className="navbar">
      <Link to="/"> Home</Link>
      {isAdmin && <Link to="/admin"> Admin Dashboard</Link>}
      {isAdmin && <Link to="/add"> AddProduct</Link>}
      <Link to="/shop"> Shop</Link>
      {(isAdmin || isUser) && <Link to="/cart"> Cart</Link>}
      {(isAdmin || isUser) && <Link to="/dashboard"> Dashboard</Link>}
      {!cookies.access_token ? (
        <Link to="/login"> Login</Link>
      ) : (
        <button onClick={logout}>Logout</button>
      )}
    </div>
  )
}
