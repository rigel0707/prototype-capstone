import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useGetUserID } from '../hooks/useGetUserID'

export const Checkout = () => {
  const [cartItems, setCartItems] = useState([])
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')

  const navigate = useNavigate()
  const userID = useGetUserID()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/products/checkout?userId=${userID}`
        )
        const data = response.data
        setCartItems(data.cartItems)
        setName(data.name)
        setAddress(data.address)
        setPhone(data.phone)
        setEmail(data.email)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [userID])

  const handlePlaceOrder = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/products/order',
        {
          userId: userID,
          cartItems: cartItems,
          name: name,
          address: address,
          phone: phone,
          email: email,
          status: 'pending',
        }
      )
      navigate('/order')
      console.log(response)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <h1>Checkout</h1>
      <div>
        <h2>Shipping Information</h2>
        <p>Name: {name}</p>
        <p>Address: {address}</p>
        <p>Phone: {phone}</p>
        <p>Email: {email}</p>
      </div>
      <div>
        <h2>Order Summary</h2>
        {cartItems.map((item) => (
          <div key={item.productId}>
            <h3>{item.productName}</h3>
            <img src={item.imageURL} alt={item.name} />
            <p>{item.price}</p>
          </div>
        ))}
      </div>
      <button onClick={handlePlaceOrder}>Place Order</button>
    </div>
  )
}
