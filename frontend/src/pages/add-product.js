import { useState } from 'react'
import axios from 'axios'

export const AddProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    imageURL: '',
    price: 0,
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setProduct({ ...product, [name]: value })
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    try {
      await axios.post('http://localhost:5000/products', product)
      alert('Product Added!')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="add-product create-recipe">
      <h1> Add Product </h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" onChange={handleChange} />
        <br></br>
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          name="description"
          onChange={handleChange}
        />
        <br></br>
        <label htmlFor="imageUrl">Upload Image / Image URL</label>
        <input
          type="text"
          id="imageUrl"
          name="imageURL"
          onChange={handleChange}
        />
        <br></br>
        <label htmlFor="price">Price</label>
        <input type="number" id="price" name="price" onChange={handleChange} />
        <button type="submit"> Add Product </button>
      </form>
    </div>
  )
}
