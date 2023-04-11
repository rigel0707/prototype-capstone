import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { UserModel } from '../models/Users.js'
import { CartModel } from '../models/Carts.js'

const router = express.Router()

router.post('/register', async (req, res) => {
  const { username, password, firstName, lastName, address, email, phone } =
    req.body
  const user = await UserModel.findOne({ username })

  if (user) {
    return res.status(400).json({ message: 'User already exists!' })
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const newUser = new UserModel({
    username,
    password: hashedPassword,
    firstName,
    lastName,
    address,
    email,
    phone,
    // cartId: '',
    role: 'user',
  })
  await newUser.save()

  res.json({ message: 'User Registered Successfully!' })
})

router.post('/login', async (req, res) => {
  const { username, password } = req.body
  const user = await UserModel.findOne({ username })

  if (!user) {
    return res.status(400).json({ message: "User Doesn't Exist!" })
  }

  const role = user.role
  const cart = await CartModel.findOne({ userId: user._id })

  if (role === !'admin') {
    return res.status(401).json({ message: 'Not Authorized' })
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)

  if (!isPasswordValid) {
    return res
      .status(400)
      .json({ message: 'Username or Password is Incorrect!' })
  }

  if (role === 'admin') {
    const token = jwt.sign({ id: user._id, role: 'admin' }, 'secret')
    res.json({
      token,
      userID: user._id,
      username: user.username,
      cartID: cart ? cart._id : null,
    })
  }

  if (role === 'user') {
    const token = jwt.sign({ id: user._id, role: 'user' }, 'secret')
    res.json({
      token,
      userID: user._id,
      username: user.username,
      cartID: cart ? cart._id : null,
    })
  }
})

router.get('/users', async (req, res) => {
  try {
    const users = await UserModel.find()
    res.json(users)
  } catch (err) {
    console.error(err)
    res.status(500).send('Server Error')
  }
})

router.get('/users/:id', async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ msg: 'User not found' })
    }
    res.json(user)
  } catch (err) {
    console.error(err)
    res.status(500).send('Server Error')
  }
})

export { router as userRouter }
