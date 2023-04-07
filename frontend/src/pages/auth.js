import { useState } from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

export const Auth = () => {
  return (
    <div className="auth">
      <Login />
      <Register />
    </div>
  )
}

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [_, setCookies] = useCookies(['access_token'])

  const navigate = useNavigate()

  const onSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post('http://localhost:5000/auth/login', {
        username,
        password,
      })

      if (response.status === 200) {
        setCookies('access_token', response.data.token)
        window.localStorage.setItem('userID', response.data.userID)
        window.localStorage.setItem('username', response.data.username)
        window.localStorage.setItem('sessionToken', response.data.token)
        // window.localStorage.setItem('cartID', response.data.cartID)
        navigate('/')
      }
    } catch (err) {
      alert('Wrong username or password')
      console.error(err)
    }
  }
  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      label="Login"
      onSubmit={onSubmit}
    />
  )
}

// const Register = () => {
//     const [username, setUsername] = useState("")
//     const [password, setPassword] = useState("")

//     const onSubmit = async (event) => {
//         event.preventDefault()
//         try {
//             const response = await axios.post('http://localhost:5000/auth/register', {
//                 username,
//                 password,
//             })
//             if (response.status === 200) {
//                 alert("Registration Completed! Please login now.")
//             }
//         } catch (err) {
//             alert(err.response.data.message)
//             console.error(err)
//         }
//     }
//     return (
//         <Form
//             username={username}
//             setUsername={setUsername}
//             password={password}
//             setPassword={setPassword}
//             label="Register"
//             onSubmit={onSubmit}
//         />
//     )
// }

const Register = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [address, setAddress] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const onSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post('http://localhost:5000/auth/register', {
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
    <div className="auth-container">
      <form onSubmit={onSubmit}>
        <h2>Register</h2>
        <div className="form-group">
          <label htmlFor="username"> Username: </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password"> Password: </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="firstName"> First Name: </label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName"> Last Name: </label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address"> Address: </label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email"> Email: </label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone"> Phone: </label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
        </div>
        <button type="submit"> Register </button>
      </form>
    </div>
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
          <label htmlFor="username"> Username: </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password"> Password: </label>
          <input
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
