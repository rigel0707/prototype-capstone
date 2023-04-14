import { useState } from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import apiUrl from '../components/apiUrl'

export const LoginPage = () => {
  return (
    <div className="auth">
      <Login />
    </div>
  )
}

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [unused, setCookies] = useCookies(['access_token'])

  const navigate = useNavigate()

  const onSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, {
        username,
        password,
      })

      if (response.status === 200) {
        setCookies('access_token', response.data.token)
        window.localStorage.setItem('userID', response.data.userID)
        window.localStorage.setItem('username', response.data.username)
        window.localStorage.setItem('sessionToken', response.data.token)
        await window.localStorage.setItem('cartID', response.data.cartID)
        navigate('/')
      }
    } catch (err) {
      alert('Wrong username or password')
      console.error(err)
    }
  }
  return (
    <>
      <Form
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        label="Login"
        onSubmit={onSubmit}
      />
      <p>New Customer?</p>
      <button onClick={() => navigate('/register')}>Create new account</button>
    </>
  )
}

const Form = ({
  username,
  setUsername,
  password,
  setPassword,
  label,
  onSubmit,
}) => {
  return (
    <div className="auth-container">
      <form onSubmit={onSubmit}>
        <h2>{label}</h2>
        <div className="form-group">
          <label className="form-label" htmlFor="username">
            Username:
          </label>
          <input
            className="form-control"
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="password">
            Password:
          </label>
          <input
            className="form-control"
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit"> {label} </button>
      </form>
    </div>
  )
}
