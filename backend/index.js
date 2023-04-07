import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'

import { userRouter } from './routes/users.js'
import { productRouter } from './routes/products.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 8000
const uri = process.env.TEST_DB_URI

app.use(express.json())
app.use(cors())
app.use(bodyParser.json())

app.use('/auth', userRouter)
app.use('/products', productRouter)

mongoose.connect(uri)

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})