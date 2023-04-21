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

      <div class="signup-link">
        Not a member?{' '}
        <a href="#" onClick={() => navigate('/register')}>
          Signup now
        </a>
      </div>
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
    <div className="wrapper">
      <div class="title">{label}</div>
      <form onSubmit={onSubmit}>
        <div className="field">
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <label className="authform" htmlFor="username">
            Username
          </label>
        </div>
        <div className="field">
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <label className="authform" htmlFor="password">
            Password:
          </label>
        </div>
        <div class="field">
          <input type="submit" value="Log In" />
        </div>
      </form>
    </div>
  )
}
