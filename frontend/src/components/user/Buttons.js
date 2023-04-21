import { useState, useEffect } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import axios from 'axios'

import apiUrl from '../components/apiUrl'

export const EditButton = ({ userId }) => {
  const [showEditModal, setShowEditModal] = useState(false)
  const [editFormData, setEditFormData] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/auth/users/${userId}`)
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
      <button
        className="btn btn-black edit-btn"
        onClick={() => setShowEditModal(true)}
      >
        <div className="delete-btn-text">Edit</div>
        <div className="delete-btn-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            class="bi bi-pencil-square"
            viewBox="0 0 16 16"
          >
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
            <path
              fill-rule="evenodd"
              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
            />
          </svg>
        </div>
      </button>
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            <span className="content-title-span">Edit</span> Profile
          </Modal.Title>
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

            <Button
              variant="primary mt-3"
              type="submit"
              onClick={handleRefresh}
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export const DeleteAccountButton = ({ userId }) => {
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
          <div className="delete-btn-text">Delete Account</div>
          <div className="delete-btn-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              class="bi bi-trash"
              viewBox="0 0 16 16"
            >
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
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
