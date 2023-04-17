import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import { useGetUserID } from '../hooks/useGetUserID'
import { useGetCartID } from '../hooks/useGetCartID'
import apiUrl from '../components/apiUrl'

export const Cart = () => {
  const [cartItems, setCartItems] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const userId = useGetUserID()
  const cartId = useGetCartID()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const res = await axios.get(`${apiUrl}/products/cart/${userId}`)
        const cart = res.data.cartItems
        if (cart && cart.length > 0) {
          setCartItems(cart)
        } else {
          setCartItems([])
        }
      } catch (err) {
        console.error(err)
        setCartItems([])
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [userId])

  const handleRemoveFromCart = async (productId) => {
    try {
      await axios.delete(`${apiUrl}/products/cart/${cartId}`, {
        data: { userId, productId },
      })
      const res = await axios.get(`${apiUrl}/products/cart/${userId}`)
      const cart = res.data.cartItems
      if (cart && cart.length > 0) {
        setCartItems(cart)
      } else {
        setCartItems([])
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <div className="container">
        <h2 className="mt-3 mb-5">Cart Items</h2>
        {isLoading ? (
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : cartItems.length > 0 ? (
          <div className="container row g-5">
            <div className="col-12">
              <div id="cartTable">
                <div className="table-responsive scrollbar mx-n1 px-1">
                  <table className="table fs--1 mb-0 border-top border-200">
                    <thead>
                      <tr>
                        <th
                          className="sort white-space-nowrap align-middle fs--2"
                          scope="col"
                        >
                          Image
                        </th>
                        <th
                          className="sort white-space-nowrap align-middle"
                          scope="col"
                          style={{ minWidth: '250px' }}
                        >
                          PRODUCTS
                        </th>
                        <th
                          className="sort align-middle text-end"
                          scope="col"
                          style={{ width: '300px' }}
                        >
                          PRICE
                        </th>
                        <th
                          className="sort align-middle text-end"
                          scope="col"
                          style={{ width: '250px' }}
                        ></th>
                      </tr>
                    </thead>
                    <tbody className="list" id="cart-table-body">
                      {cartItems.map((item) => (
                        <tr
                          className="cart-table-row btn-reveal-trigger"
                          key={`${item.productId}-${Math.random()}`}
                        >
                          <td className="align-middle white-space-nowrap py-0">
                            <div className="border rounded-2">
                              <img
                                src={item.imageURL}
                                alt={item.name}
                                width="53"
                              />
                            </div>
                          </td>
                          <td className="products align-middle">
                            {item.productName}
                          </td>

                          <td className="price align-middle text-900 fs--1 fw-semi-bold text-end">
                            PHP {item.price}
                          </td>
                          <td className="align-middle white-space-nowrap text-end pe-0 ps-3">
                            <button
                              className="btn btn-secondary"
                              onClick={() =>
                                handleRemoveFromCart(item.productId)
                              }
                            >
                              Remove from cart
                            </button>
                          </td>
                        </tr>
                      ))}
                      <tr className="cart-table-row btn-reveal-trigger">
                        <td className="text-start"></td>
                        <td className="text-start"></td>
                        <td className="text-start"></td>
                        <td className="text-end fs-4">
                          Total : PHP
                          {cartItems.reduce(
                            (total, item) => total + item.price,
                            0
                          )}
                        </td>
                      </tr>
                      <tr className="cart-table-row btn-reveal-trigger">
                        <td className="text-start"></td>
                        <td className="text-start"></td>
                        <td className="text-start"></td>
                        <td className="text-end">
                          {cartItems.length > 0 ? (
                            <button
                              className="btn btn-primary"
                              onClick={() => navigate('/checkout')}
                            >
                              Checkout
                            </button>
                          ) : (
                            <button disabled>Checkout</button>
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="alert alert-danger">Cart is Empty</p>
        )}
      </div>
    </>
  )
}
