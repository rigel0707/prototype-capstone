import { useState, useEffect } from 'react'
import axios from 'axios'

export const AdminDashboard = () => {
  return (
    <>
      <h1>Admin Dashboard</h1>
      <UserTable />
      <ProductTable />
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
