import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'

import { userRouter } from './routes/users.js'
import { productRouter } from './routes/products.js'
import { paymentRouter } from './routes/payments.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 8000
const uri = process.env.TEST_DB_URI

app.use(express.json())
app.use(cors())
app.use(bodyParser.json())

app.use('/auth', userRouter)
app.use('/products', productRouter)
app.use('/payment', paymentRouter)

app.get('/', (req, res) => {
  const imageUrl =
    'https://drive.google.com/uc?export=view&id=1pyin8PDJyMW24f3h7CBzXbRmovtrcLs_'
  res.send(`<img src="${imageUrl}" height="480" alt="anyaaaaa" />`)
})

mongoose.connect(uri)

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})
