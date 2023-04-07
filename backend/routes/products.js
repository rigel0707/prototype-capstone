import express from 'express'
import mongoose from 'mongoose'
import { ProductModel } from '../models/Products.js'
import { UserModel } from '../models/Users.js'
import { CartModel } from '../models/Carts.js'
import { OrderModel } from '../models/Orders.js'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const response = await ProductModel.find({})
    res.json(response)
  } catch (err) {
    res.json(err)
  }
})

router.post('/', async (req, res) => {
  const product = new ProductModel(req.body)
  try {
    const response = await product.save()
    res.json(response)
  } catch (err) {
    res.json(err)
  }
})

router.put('/', async (req, res) => {
  try {
    const product = await ProductModel.findById(req.body.productID)
    const user = await UserModel.findById(req.body.userID)
    user.orderedProducts.push(product)
    await user.save()
    res.json({ orderedProducts: user.orderedProducts })
  } catch (err) {
    res.json(err)
  }
})

router.get('/orderedProducts/id', async (req, res) => {
  try {
    const user = await UserModel.findById(req.body.userID)
    res.json({ orderedProducts: user?.orderedProducts })
  } catch (err) {
    res.json(err)
  }
})

// router.post('/cart', async (req, res) => {
//   const { productId, userId } = req.body
//   const product = await ProductModel.findById(productId)
//   if (!product) {
//     res.status(404).json({ message: 'Product not found' })
//   } else {
//     const user = await UserModel.findById(userId)
//     if (!user) {
//       res.status(404).json({ message: 'User not found' })
//     } else {
//       let cart = await CartModel.findOne({ userId })
//       if (cart) {
//         const item = { productId: product._id, productName: product.name }
//         cart.cartItems.push(item)
//         await cart.save()
//         const pipeline = [
//           {
//             $match: { _id: new mongoose.Types.ObjectId(user._id) },
//           },
//           {
//             $lookup: {
//               from: 'carts',
//               localField: 'cartId',
//               foreignField: '_id',
//               as: 'cart',
//             },
//           },
//           {
//             $unwind: {
//               path: '$cart',
//               preserveNullAndEmptyArrays: true,
//             },
//           },
//         ]
//         const userWithCart = await UserModel.aggregate(pipeline)
//         res.json({ message: 'Product added to cart', cart: userWithCart.cart })
//       } else {
//         const newItem = { productId: product._id, productName: product.name }
//         const newCart = new CartModel({
//           userId: user._id,
//           cartItems: [newItem],
//         })
//         cart = await newCart.save()
//         user.cartId = cart._id
//         await user.save()
//         const pipeline = [
//           {
//             $match: { _id: new mongoose.Types.ObjectId(user._id) },
//           },
//           {
//             $lookup: {
//               from: 'carts',
//               localField: 'cartId',
//               foreignField: '_id',
//               as: 'cart',
//             },
//           },
//           {
//             $unwind: {
//               path: '$cart',
//               preserveNullAndEmptyArrays: true,
//             },
//           },
//         ]
//         const userWithCart = await UserModel.aggregate(pipeline)
//         res.json({
//           message: 'Product added to new cart',
//           cart: userWithCart.cart,
//         })
//       }
//     }
//   }
// })

router.post('/cart', async (req, res) => {
  const { productId, userId } = req.body
  const product = await ProductModel.findById(productId)
  if (!product) {
    res.status(404).json({ message: 'Product not found' })
  } else {
    const user = await UserModel.findById(userId)
    if (!user) {
      res.status(404).json({ message: 'User not found' })
    } else {
      let cart = await CartModel.findOne({ userId })
      if (cart) {
        const item = {
          productId: product._id,
          productName: product.name,
          price: product.price,
          imageURL: product.imageURL,
        }
        cart.cartItems.push(item)
        await cart.save()
        const pipeline = [
          {
            $match: { _id: new mongoose.Types.ObjectId(user._id) },
          },
          {
            $lookup: {
              from: 'carts',
              localField: 'cartId',
              foreignField: '_id',
              as: 'cart',
            },
          },
          {
            $unwind: {
              path: '$cart',
              preserveNullAndEmptyArrays: true,
            },
          },
        ]
        const userWithCart = await UserModel.aggregate(pipeline)
        res.json({
          message: 'Product added to cart',
          cart: userWithCart[0].cartId,
        })
      } else {
        const newItem = {
          productId: product._id,
          productName: product.name,
          price: product.price,
          imageURL: product.imageURL,
        }
        const newCart = new CartModel({
          userId: user._id,
          cartItems: [newItem],
        })
        cart = await newCart.save()
        user.cartId = cart._id
        await user.save()
        const pipeline = [
          {
            $match: { _id: new mongoose.Types.ObjectId(user._id) },
          },
          {
            $lookup: {
              from: 'carts',
              localField: 'cartId',
              foreignField: '_id',
              as: 'cart',
            },
          },
          {
            $unwind: {
              path: '$cart',
              preserveNullAndEmptyArrays: true,
            },
          },
        ]
        const userWithCart = await UserModel.aggregate(pipeline)
        res.json({
          message: 'Product added to new cart',
          cart: userWithCart[0].cartId,
        })
      }
    }
  }
})

router.delete('/cart/:id', async (req, res) => {
  const { id } = req.params
  const { userId } = req.body
  const cart = await CartModel.findOne({ _id: id, userId })
  if (!cart) {
    res.status(404).json({ message: 'Cart not found' })
  } else {
    const { productId } = req.body
    const index = cart.cartItems.findIndex(
      (item) => item.productId == productId
    )
    if (index === -1) {
      res.status(404).json({ message: 'Item not found in cart' })
    } else {
      cart.cartItems.splice(index, 1)
      await cart.save()
      const pipeline = [
        {
          $match: { _id: new mongoose.Types.ObjectId(userId) },
        },
        {
          $lookup: {
            from: 'carts',
            localField: 'cartId',
            foreignField: '_id',
            as: 'cart',
          },
        },
        {
          $unwind: {
            path: '$cart',
            preserveNullAndEmptyArrays: true,
          },
        },
      ]
      const userWithCart = await UserModel.aggregate(pipeline)
      res.json({
        message: 'Item deleted from cart',
        cart: userWithCart[0].cartId,
      })
    }
  }
})

router.get('/cart/:userId', async (req, res) => {
  const userId = req.params.userId
  const user = await UserModel.findById(userId)

  if (!user) {
    res.status(404).json({ message: 'User not found' })
  } else {
    const cart = await CartModel.findOne({ userId })
    if (!cart) {
      res.json({ message: 'Cart is empty' })
    } else {
      res.json({ cartItems: cart.cartItems, cartId: cart._id })
    }
  }
})

router.get('/checkout', async (req, res) => {
  try {
    const userId = req.query.userId
    const cart = await CartModel.findOne({ userId })
    const user = await UserModel.findById(userId)

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' })
    }

    const data = {
      cartItems: cart.cartItems,
      name: `${user.firstName} ${user.lastName}`,
      address: user.address,
      phone: user.phone,
      email: user.email,
    }

    res.json(data)
  } catch (err) {
    console.error(err)
  }
})

router.post('/order', async (req, res) => {
  try {
    const { userId, cartItems, name, address, phone, email } = req.body

    const order = new OrderModel({
      userId,
      cartItems,
      name,
      address,
      phone,
      email,
      status: 'Packing Items', // default status when order is created, other status are In Shipment, Delivered and Cancelled
    })

    await order.save()

    const cart = await CartModel.findOneAndUpdate(
      { userId },
      { $set: { cartItems: [] } },
      { new: true }
    )

    res.status(201).json({ message: 'Order created', order })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
})

export { router as productRouter }
