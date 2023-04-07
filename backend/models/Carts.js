import mongoose from 'mongoose'

const CartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  cartItems: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'products' },
      productName: { type: String },
      imageURL: { type: String },
      price: { type: Number },
    },
  ],
})

export const CartModel = mongoose.model('carts', CartSchema)
