import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import apiUrl from '../components/apiUrl'

export const RegisterPage = () => {
  return (
    <div className="auth">
      <Register />
    </div>
  )
}

const Register = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [address, setAddress] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const navigate = useNavigate()

  const onSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post(`${apiUrl}/auth/register`, {
        username,
        password,
        firstName,
        lastName,
        address,
        email,
        phone,
      })
      if (response.status === 200) {
        alert('Registration Completed! Please login now.')
      }
    } catch (err) {
      alert(err.response.data.message)
      console.error(err)
    }
  }
  return (
    <div className="wrapper">
      <form onSubmit={onSubmit}>
        <div class="title">Register</div>
        <div className="field">
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <label className="authform" htmlFor="username">
            {' '}
            Username{' '}
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
            {' '}
            Password{' '}
          </label>
        </div>
        <div className="field">
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
          />
          <label className="authform" htmlFor="firstName">
            {' '}
            First Name:{' '}
          </label>
        </div>
        <div className="field">
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
          <label className="authform" htmlFor="lastName">
            {' '}
            Last Name:{' '}
          </label>
        </div>

        <div className="field">
          <input
            type="text"
            id="address"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          />
          <label className="authform" htmlFor="address">
            {' '}
            Address:{' '}
          </label>
        </div>
        <div className="field">
          <input
            type="text"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <label className="authform" htmlFor="email">
            {' '}
            Email:{' '}
          </label>
        </div>
        <div className="field">
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
          <label className="authform" htmlFor="phone">
            {' '}
            Phone:{' '}
          </label>
        </div>
        <div className="container d-flex justify-content-center">
          <button type="submit" className="form1" value="Register">
            Register
          </button>
          <button className="form1" onClick={() => navigate('/login')}>
            Back to Login
          </button>
        </div>
      </form>
    </div>
  )
}
