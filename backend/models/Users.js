import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  cartId: { type: mongoose.Schema.Types.ObjectId, ref: 'carts', default: null },
  role: { type: String, required: true },
})

export const UserModel = mongoose.model('users', UserSchema)
