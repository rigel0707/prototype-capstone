import { useState, useEffect } from 'react'
import axios from 'axios'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

import { useGetUserID } from '../hooks/useGetUserID.js'
import apiUrl from '../components/apiUrl'

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
        const response = await axios.get(`${apiUrl}/products`)
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
        const response = await axios.post(`${apiUrl}/products/cart`, {
          productId,
          userId,
        })
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
          <button className="btn-black card-link" onClick={handleClick}>
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
      <div className="container mb-5">
        <div className="row">
          {product.map((product) => (
            <div className="col-lg-3 col-md-3 my-2">
              <div className="card card-shop w-auto p-2">
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
                      className="img-shop"
                    />
                  </figure>
                  <p className="card-title text-center card-title-shop">
                    {product.name} <br />
                    <br />
                  </p>
                  <div className="card-body card-body-shop">
                    <div className="card-text card-text-shop text-center">
                      <div className="desc-price">
                        <p className="fst-italic mt-2 mb-0">
                          {product.description}
                        </p>
                        <p className="fw-medium text-decoration-underline mb-1">
                          PHP{product.price}
                        </p>
                      </div>
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
