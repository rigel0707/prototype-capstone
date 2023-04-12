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
          <button className="btn btn-dark" onClick={handleClick}>
            Add to Cart
          </button>
        </OverlayTrigger>
      </>
    )
  }

  return (
    <>
      <div className="row g-3 mb-4">
        <div className="col-auto">
          <h2 className="mt-3 mb-0">SHOP</h2>
        </div>
      </div>
      {/* <div className="container mx-n4 px-4 mx-lg-n6 px-lg-6 bg-white border-top border-bottom border-200 position-relative top-1">
        <div className="table-responsive scrollbar mx-n1 px-1">
          <table className="table fs--1 mb-0">
            <thead>
              <tr>
                <th
                  className="sort white-space-nowrap align-middle fs--2"
                  scope="col"
                  style={{ width: '70px' }}
                ></th>
                <th
                  className="sort white-space-nowrap align-middle ps-4"
                  scope="col"
                  style={{ width: '350px' }}
                  data-sort="product"
                >
                  PRODUCT NAME
                </th>
                <th
                  className="sort align-middle ps-4"
                  scope="col"
                  data-sort="price"
                  style={{ width: '150px' }}
                >
                  DESCRIPTION
                </th>
                <th
                  className="sort align-middle fs-0 text-center ps-4"
                  scope="col"
                  style={{ width: '125px' }}
                ></th>
                <th
                  className="sort align-middle ps-4"
                  scope="col"
                  data-sort="vendor"
                  style={{ width: '200px' }}
                >
                  PRICE
                </th>
                <th
                  className="sort align-middle fs-0 text-center ps-4"
                  scope="col"
                  style={{ width: '125px' }}
                ></th>
              </tr>
            </thead>
            <tbody className="list" id="products-table-body">
              {product.map((product) => (
                <tr className="position-static" key={product._id}>
                  <td className="align-middle white-space-nowrap py-0">
                    <div className="border rounded-2">
                      <img src={product.imageURL} alt={product.name} />
                    </div>
                  </td>
                  <td className="product align-middle ps-4">{product.name}</td>
                  <td className="price align-middle white-space-nowrap fw-bold text-700 ps-4">
                    {product.description}
                  </td>
                  <th
                    className="sort align-middle fs-0 text-center ps-4"
                    scope="col"
                    style={{ width: '125px' }}
                  ></th>
                  <td className="price align-middle white-space-nowrap fw-bold text-700 ps-4">
                    {product.price}
                  </td>
                  <td className="price align-middle white-space-nowrap fw-bold text-700 ps-4">
                    <AddToCartButton productId={product._id} userId={userId} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div> */}
      <div className="container row row-cols-1 row-cols-md-3 g-4">
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
      </div>
    </>
  )
}
