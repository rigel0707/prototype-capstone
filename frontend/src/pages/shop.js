import { useState, useEffect } from 'react'
import axios from 'axios'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

import { useGetUserID } from '../hooks/useGetUserID.js'

export const Shop = () => {
  return (
    <>
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
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id="tooltip">{message}</Tooltip>}
        >
          <button className="btn card-link" onClick={handleClick}>
            Add to Cart
          </button>
        </OverlayTrigger>
      </>
    )
  }

  return (
    <>
      <div className="container">
        <div className="row g-3 mb-4">
          <div className="col-auto">
            <h2 className="mt-3 mb-0">SHOP</h2>
          </div>
        </div>
      </div>
      {/* <div className="container row row-cols-1 row-cols-md-3 g-4">
        {product.map((product) => (
          <div className="col">
            <div className="card">
              <img
                src={product.imageURL}
                className="card-img-top"
                alt={product.name}
              />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="fw-bold">PHP{product.price}</span>
                  <AddToCartButton productId={product._id} userId={userId} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div> */}
      <div className="container">
        <div className="row">
          {product.map((product) => (
            <div className="col-lg-3 col-md-3 my-2">
              <div className="Card w-auto p-2">
                <div className="category-card">
                  <figure
                    className="d-flex justify-content-center card-banner img-holder"
                    style={{ width: 'auto', height: 'auto' }}
                  >
                    <img
                      src={product.imageURL}
                      width="330"
                      height="300"
                      loading="lazy"
                      alt={product.name}
                      className="img-cover"
                    />
                  </figure>
                  <h4 className="card-title text-center">
                    {product.name} <br />
                    <br />
                  </h4>
                  <div className="card-body">
                    <div className="card-text text-center">
                      <span>{product.description}</span>
                      <p>PHP{product.price}</p>
                      <AddToCartButton
                        productId={product._id}
                        userId={userId}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
