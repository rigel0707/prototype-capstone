import mongoose from 'mongoose'

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  cartItems: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'products' },
      productName: { type: String },
      imageURL: { type: String },
      price: { type: Number },
    },
  ],
  name: { type: String },
  address: { type: String },
  phone: { type: String },
  email: { type: String },
  status: { type: String },
})

export const OrderModel = mongoose.model('orders', OrderSchema)
