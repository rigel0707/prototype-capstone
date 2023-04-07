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
        if (!userId) {
          alert('Please log in to add items to the cart.')
          return
        }
        const response = await axios.post(
          'http://localhost:5000/products/cart',
          { productId, userId }
        )
        setMessage(response.data.message)
        const cartID = localStorage.getItem('cartID')
        if (cartID === null || cartID === 'null') {
          await localStorage.setItem('cartID', response.data.cart)
        } else {
          console.log('CartID already exists:', cartID)
        }
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
        {product.map((product) => (
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
