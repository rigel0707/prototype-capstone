import { useState, useEffect } from 'react'
import axios from 'axios'

import { useGetUserID } from '../hooks/useGetUserID.js'

export const Shop = () => {
  return (
    <>
      <h1>Shop</h1>
      <ProductTable />
    </>
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
  const userId = useGetUserID()

  const AddToCartButton = ({ productId, userId }) => {
    const [message, setMessage] = useState('')

    const handleClick = async () => {
      try {
        const response = await axios.post(
          'http://localhost:5000/products/cart',
          { productId, userId }
        )
        setMessage(response.data.message)
      } catch (error) {
        console.error(error)
      }
    }

    return (
      <>
        <button onClick={handleClick}>Add to Cart</button>
        <p>{message}</p>
      </>
    )
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Image</th>
          <th>Price</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product._id}>
            <td>{product.name}</td>
            <td>{product.description}</td>
            <td>
              <img src={product.imageURL} alt={product.name} />
            </td>
            <td>{product.price}</td>
            <td>
              <AddToCartButton productId={product._id} userId={userId} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
