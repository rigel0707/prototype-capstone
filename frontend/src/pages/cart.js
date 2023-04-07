import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useGetUserID } from '../hooks/useGetUserID'
import { useGetCartID } from '../hooks/useGetCartID'

export const Cart = () => {
  const [cartItems, setCartItems] = useState([])
  const userId = useGetUserID()
  const cartId = useGetCartID()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/products/cart/${userId}`
        )
        const cart = res.data.cartItems
        if (cart && cart.length > 0) {
          setCartItems(cart)
        } else {
          setCartItems([])
        }
      } catch (err) {
        console.error(err)
        setCartItems([])
      }
    }
    fetchData()
  }, [userId])

  const handleRemoveFromCart = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/products/cart/${cartId}`, {
        data: { userId, productId },
      })
      setCartItems((prevCartItems) =>
        prevCartItems.filter((item) => item.productId !== productId)
      )
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <h1>Cart Items:</h1>{' '}
      {cartItems.length > 0 ? (
        <button onClick={() => navigate('/checkout')}>Checkout</button>
      ) : (
        <button disabled>Checkout</button>
      )}
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <>
            <div key={item.productId}>
              <h2>{item.productName}</h2>
              <img src={item.imageURL} alt={item.name} />
              <p>{item.price}</p>
              <button onClick={() => handleRemoveFromCart(item.productId)}>
                Remove from cart
              </button>
            </div>
          </>
        ))
      ) : (
        <p>Cart is Empty</p>
      )}
    </>
  )
}
