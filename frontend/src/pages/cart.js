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
        {isLoading ? (
          <p>Loading...</p>
        ) : cartItems.length > 0 ? (
          <>
            <section class="mb-4 py-4" style={{ backgroundColor: '#ff894bbf' }}>
              <div class="container h-100">
                <div class="row d-flex justify-content-center align-items-center h-100">
                  <div class="col">
                    <p>
                      <span class="h2">Shopping Cart </span>
                    </p>

                    <div class="card mb-4">
                      <div class="card-body p-4">
                        {cartItems.map((item) => (
                          <div
                            class="row align-items-center mb-3"
                            style={{ borderBottom: '1px solid black' }}
                            key={`${item.productId}-${Math.random()}`}
                          >
                            <div class="col-md-3">
                              <img
                                src={item.imageURL}
                                class="img-fluid"
                                alt={item.name}
                              />
                            </div>
                            <div class="col-md-5 d-flex justify-content-center">
                              <div>
                                <p class="text-muted mb-1">Name</p>
                                <p class="lead fw-normal mb-3">
                                  {item.productName}
                                </p>
                              </div>
                            </div>

                            <div class="col-md-3 d-flex">
                              <div>
                                <p class="text-muted mb-1 pb-2">Price</p>
                                <p class="lead fw-normal mb-0">
                                  PHP {item.price}
                                </p>
                              </div>
                            </div>
                            <div class="col-md-1 col-lg-1 col-xl-1 mb-2 text-end">
                              <a
                                href="#!"
                                class="text-danger"
                                onClick={() =>
                                  handleRemoveFromCart(item.productId)
                                }
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="30"
                                  height="30"
                                  fill="currentColor"
                                  class="bi bi-trash"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                                </svg>
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div class="card mb-5">
                      <div class="card-body p-4">
                        <div class="float-end">
                          <p class="mb-0 me-5 d-flex align-items-center">
                            <span class="fw-semibold text-muted me-2">
                              Order total:
                            </span>{' '}
                            <span class="lead fw-normal">
                              PHP
                              {cartItems.reduce(
                                (total, item) => total + item.price,
                                0
                              )}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div class="d-flex justify-content-end">
                      <button
                        type="button"
                        class="btn btn-light btn-lg me-2"
                        onClick={() => navigate('/shop')}
                      >
                        Continue shopping
                      </button>
                      <button
                        type="button"
                        class="btn btn-dark btn-lg"
                        onClick={() => navigate('/checkout')}
                      >
                        Checkout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        ) : (
          <div className="d-grid justify-content-center">
            <p
              className="d-flex justify-content-center alert alert-danger mt-5"
              style={{ width: '250px' }}
            >
              Cart is Empty
            </p>
          </div>
        )}
      </div>
    </>
  )
}
