import { useState, useEffect } from 'react'
import axios from 'axios'
import { useGetUserID } from '../hooks/useGetUserID'

export const User = () => {
  const userId = useGetUserID()
  return (
    <>
      <h1>User Dashboard</h1>
      <OrderTable userId={userId} />
    </>
  )
}

const OrderTable = ({ userId }) => {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `http://localhost:5000/products/order/${userId}`
        )
        setOrders(response.data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchData()
  }, [userId])

  return (
    <table>
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Product Name</th>
          <th>Image</th>
          <th>Price</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) =>
          order.cartItems.map((item) => (
            <tr key={item._id}>
              <td>{order._id}</td>
              <td>{item.productName}</td>
              <td>
                <img src={item.imageURL} alt={item.productName} />
              </td>
              <td>{item.price}</td>
              <td>{order.status}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  )
}
