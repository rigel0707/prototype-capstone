import { useState, useEffect } from 'react'
import axios from 'axios'

export const AdminDashboard = () => {
  return (
    <>
      <h1>Admin Dashboard</h1>
      <UserTable />
      <ProductTable />
      <OrderTable />
    </>
  )
}

const UserTable = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:5000/auth/users')
        setUsers(response.data)
      } catch (err) {
        console.error(err)
      }
    }

    fetchData()
  }, [])

  return (
    <table>
      <thead>
        <tr>
          <th>Username</th>
          <th>Password</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user._id}>
            <td>{user.username}</td>
            <td>{user.password}</td>
            <td>{user.role}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

const ProductTable = () => {
  const [product, setProducts] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:5000/products')
        setProducts(response.data)
      } catch (err) {
        console.error(err)
      }
    }

    fetchData()
  }, [])

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Image</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {product.map((product) => (
          <tr key={product._id}>
            <td>{product.name}</td>
            <td>{product.description}</td>
            <td>
              <img src={product.imageURL} alt={product.name} />
            </td>
            <td>{product.price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

const OrderTable = () => {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:5000/products/order')
        setOrders(response.data)
      } catch (err) {
        console.error(err)
      }
    }

    fetchData()
  }, [])

  const [newStatus, setNewStatus] = useState('')

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/products/order/${orderId}`,
        { status: newStatus }
      )
      if (response.status === 200) {
        const updatedOrders = orders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
        setOrders(updatedOrders)

        setNewStatus(newStatus)
      }
      // console.log(newStatus)
    } catch (err) {
      console.error(err)
    }
  }

  const renderStatusDropdown = (order) => {
    return (
      <div>
        <select
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
        >
          <option value="">Select a status</option>
          <option value="Packing Items">Packing Items</option>
          <option value="In Shipment">In Shipment</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <button onClick={() => handleStatusChange(order._id, newStatus)}>
          Change
        </button>
      </div>
    )
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Ordered Items</th>
          <th>Status</th>
          <th>Change Status</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order._id}>
            <td>{order._id}</td>
            <td>
              <table>
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {order.cartItems.map((item) => (
                    <tr key={item._id}>
                      <td>{item.productName}</td>
                      <td>{item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </td>
            <td>{order.status}</td>
            <td>{renderStatusDropdown(order)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
