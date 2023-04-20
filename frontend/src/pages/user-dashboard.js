import { useState, useEffect } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import { useGetUserID } from '../hooks/useGetUserID'
import apiUrl from '../components/apiUrl'

export const User = () => {
  const userId = useGetUserID()

  return (
    <>
      <div className='container'>
        <h1 className='my-5'><span className='content-title-span'>User</span> Dashboard</h1>
        <UserProfile userId={userId} />
        <OrderTable userId={userId} />
      </div>
    </>
  )
}

const OrderTable = ({ userId }) => {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `${apiUrl}/products/order/${userId}`
        )
        setOrders(response.data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchData()
  }, [userId])

  return (
    <>
      {orders.length > 0 ? (
        <div
          className="container-fluid border-top border-bottom border-200 mt-3 mb-5 table-responsive scrollbar"
          style={{ width: '75%', overflowX: 'auto' }}
        >
          <div className='row'>
            <table className="table table-striped fs--1 mb-0 col-12">
              <thead>
                <tr>
                  <th
                    className="white-space-nowrap align-middle pe-3 ps-0"
                    style={{ width: '15%', minWidth: '250px' }}
                  >
                    ORDER
                  </th>
                  <th
                    className="text-center align-middle pe-3"
                    style={{ width: '15%', minWidth: '120px' }}
                  >
                    STATUS
                  </th>
                  <th
                    className="align-middle text-end"
                    style={{ width: '15%', minWidth: '120px' }}
                  >
                    TOTAL
                  </th>
                </tr>
              </thead>
              <tbody className="list">
                {orders.map((order) => (
                  <tr
                    className="hover-actions-trigger btn-reveal-trigger position-static"
                    key={order._id}
                  >
                    <td className="order align-middle white-space-nowrap py-2 ps-0">
                      <span>{order._id}</span>
                    </td>
                    <td className="status align-middle white-space-nowrap text-start fw-bold text-700 py-2">
                      <span
                        className={`d-flex align-items-center justify-content-center text-center badge text-bg-${order.status === 'Delivered'
                            ? 'success'
                            : order.status === 'Cancelled'
                              ? 'danger'
                              : order.status === 'In Shipment'
                                ? 'warning'
                                : 'primary'
                          } fs--2`}
                      >
                        <span className="badge-label">{order.status}</span>
                      </span>
                    </td>
                    <td className="align-middle fw-semi-bold text-end py-2 text-1000">
                      PHP{' '}
                      {order.cartItems.reduce(
                        (total, item) => total + item.price,
                        0
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p>Order List is empty</p>
      )}
    </>
  )
}

const UserProfile = ({ userId }) => {
  const [userData, setUserData] = useState({})
  const [orderCount, setOrderCount] = useState(0)
  const [cartItemCount, setCartItemCount] = useState(0)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `${apiUrl}/auth/users/${userId}`
        )
        setUserData(response.data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchData()
  }, [userId])

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await axios.get(
          `${apiUrl}/products/users/orders`
        )
        const userOrders = response.data.filter((order) => order._id === userId)
        const numOrders = userOrders.reduce((totalOrders, currentOrder) => {
          return totalOrders + currentOrder.numOrders
        }, 0)
        setOrderCount(numOrders)
      } catch (err) {
        console.error(err)
      }
    }
    fetchOrders()
  }, [userId])

  useEffect(() => {
    async function fetchCartItems() {
      try {
        const response = await axios.get(
          `${apiUrl}/products/cart/${userId}`
        )
        const cartItemsLength = response.data.cartItems.length
        setCartItemCount(cartItemsLength)
      } catch (err) {
        console.error(err)
      }
    }
    fetchCartItems()
  }, [userId])

  return (
    <>
      <div className="container">
        <div className='row'>
          <h1 className='col-12'><span className='content-title-span'>P</span>rofile</h1>
          <div className="col-12">
            <div className="card h-100">
              <div className="card-body">
                <div className="border-bottom border-dashed border-300 d-flex justify-content-between">
                  <h4 className="mb-3 lh-sm lh-xl-1">
                    {userData.firstName} {userData.lastName}
                  </h4>
                  <div>
                    <div className='d-flex align-items-center'>
                      <div className='mx-1'>
                        <EditButton userId={userId} />
                      </div>
                      <div className='mx-1'>
                        <DeleteAccountButton userId={userId} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-4 mb-7 mb-lg-4 mb-xl-7">
                  <div className="row justify-content-between">
                    <div className="col-auto">
                      <h5 className="text-1000">Address</h5>
                    </div>
                    <div className="col-auto">
                      <div className="dashboard-text">{userData.address}</div>
                    </div>
                  </div>
                </div>
                <div className="border-top border-dashed border-300 pt-4">
                  <div className="row justify-content-between mb-2">
                    <div className="col-auto">
                      <h5 className="text-1000 mb-0">Email</h5>
                    </div>
                    <div className="col-auto">
                      <a className="dashboard-email dashboard-text" href={`mailto:${userData.email}`}>
                        {userData.email}
                      </a>
                    </div>
                  </div>
                  <div className="row justify-content-between">
                    <div className="col-auto">
                      <h5 className="text-1000 mb-0">Phone</h5>
                    </div>
                    <div className="col-auto">
                      <a className="dashboard-text dashboard-email">{userData.phone}</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='mt-3'>
            <h4>
              <span className='content-title-span'>Cart</span> Items: {cartItemCount}
            </h4>
            <h4>
              <span className='content-title-span'>Total</span> Orders: {orderCount}
            </h4>
          </div>
        </div>
      </div>
    </>
  )
}

const EditButton = ({ userId }) => {
  const [showEditModal, setShowEditModal] = useState(false)
  const [editFormData, setEditFormData] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/auth/users/${userId}`
        )
        setEditFormData(response.data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchData()
  }, [userId])

  const handleEditFormSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.put(
        `${apiUrl}/auth/users/${userId}`,
        editFormData
      )
      console.log(response.data)
      setShowEditModal(false)
    } catch (err) {
      console.error(err)
    }
  }

  const handleFormChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value })
  }

  function handleRefresh(event) {
    window.location.reload()
  }

  return (
    <div>
      <button className="btn btn-black" onClick={() => setShowEditModal(true)}>
        Edit
      </button>
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title><span className='content-title-span'>Edit</span> Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditFormSubmit}>
            <Form.Group controlId="formBasicFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={editFormData.firstName || ''}
                onChange={handleFormChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={editFormData.lastName || ''}
                onChange={handleFormChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={editFormData.address || ''}
                onChange={handleFormChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={editFormData.phone || ''}
                onChange={handleFormChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={editFormData.email || ''}
                onChange={handleFormChange}
              />
            </Form.Group>

            <Button variant="primary mt-3" type="submit" onClick={handleRefresh}>
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  )
}

const DeleteAccountButton = ({ userId }) => {
  const [cookies, setCookies] = useCookies(['access_token'])
  const [showConfirmation, setShowConfirmation] = useState(false)

  const navigate = useNavigate()

  const handleDeleteAccount = async () => {
    try {
      await axios.delete(`${apiUrl}/auth/users/${userId}`)
      setShowConfirmation(false)
      logout()
    } catch (err) {
      console.error(err)
    }
  }

  const handleCancel = () => {
    setShowConfirmation(false)
  }

  const handleConfirmation = () => {
    setShowConfirmation(true)
  }

  const logout = () => {
    setCookies('access_token', '')
    window.localStorage.removeItem('userID')
    window.localStorage.removeItem('sessionToken')
    window.localStorage.removeItem('username')
    window.localStorage.removeItem('cartID')
    window.localStorage.removeItem('cartItems')
    navigate('/')
  }

  return (
    <>
      <div>
        <Button variant="danger delete-btn" onClick={handleConfirmation}>
          <div className='delete-btn-text'>Delete Account</div>
          <div className='delete-btn-icon'>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
            </svg>
          </div>
        </Button>
        <Modal
          show={showConfirmation}
          onHide={() => setShowConfirmation(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Confirm Account Deletion</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete your account? This action cannot be
            undone.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeleteAccount}>
              Delete Account
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  )
}
