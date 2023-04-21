import { useState, useEffect } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import axios from 'axios'

import apiUrl from '../apiUrl'

export const ProductTable = () => {
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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/products/${id}`)
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== id)
      )
    } catch (err) {
      console.error(err)
    }
  }

  const handleProductUpdate = (updatedProduct) => {
    const updatedProducts = product.map((product) => {
      if (product._id === updatedProduct._id) {
        return updatedProduct
      }
      return product
    })
    setProducts(updatedProducts)
  }

  const AddProductModal = () => {
    const [isOpen, setIsOpen] = useState(false)
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

    const handleOpen = () => {
      setIsOpen(true)
    }

    const handleClose = () => {
      setIsOpen(false)
    }

    const onSubmit = async (event) => {
      event.preventDefault()
      try {
        await axios.post(`${apiUrl}/products`, product)
        alert('Product Added!')
        setProducts((prevProducts) => [...prevProducts, product])
        setIsOpen(false)
      } catch (err) {
        console.error(err)
      }
    }

    return (
      <>
        <Button onClick={() => handleOpen()}>Add Product</Button>

        <Modal show={isOpen} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={onSubmit}>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="name" onChange={handleChange} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Image URL</Form.Label>
                <Form.Control
                  type="text"
                  name="imageURL"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  onChange={handleChange}
                />
              </Form.Group>
              <Button className="mt-3" variant="primary" type="submit">
                Add Product
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    )
  }

  const EditProductModal = ({ productId, onUpdate }) => {
    const [showEditModal, setShowEditModal] = useState(false)
    const [editFormData, setEditFormData] = useState({})

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${apiUrl}/products/items/${productId}`
          )
          setEditFormData(response.data)
        } catch (err) {
          console.error(err)
        }
      }
      fetchData()
    }, [productId])

    const handleEditFormSubmit = async (e) => {
      e.preventDefault()
      try {
        const response = await axios.put(
          `${apiUrl}/products/${productId}`,
          editFormData
        )

        setShowEditModal(false)
        onUpdate(response.data)
      } catch (err) {
        console.error(err)
      }
    }

    const handleFormChange = (e) => {
      setEditFormData({ ...editFormData, [e.target.name]: e.target.value })
    }

    return (
      <div>
        <button
          className="btn btn-warning"
          onClick={() => setShowEditModal(true)}
        >
          Edit
        </button>
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleEditFormSubmit}>
              <Form.Group controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={editFormData.name || ''}
                  onChange={handleFormChange}
                />
              </Form.Group>

              <Form.Group controlId="formBasicDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={editFormData.description || ''}
                  onChange={handleFormChange}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="text"
                  name="price"
                  value={editFormData.price || ''}
                  onChange={handleFormChange}
                />
              </Form.Group>

              <Form.Group controlId="formBasicImage">
                <Form.Label>Image URL</Form.Label>
                <Form.Control
                  type="text"
                  name="image"
                  value={editFormData.imageURL || ''}
                  onChange={handleFormChange}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    )
  }

  return (
    <>
      <div className="row g-3 mb-4">
        <div className="col-auto d-flex">
          <h2 className="mb-0">Products</h2>
          <div className="container">
            <AddProductModal />
          </div>
        </div>
      </div>
      <div className="container mb-3 pb-3 px-4 mx-lg-n6 px-lg-6 bg-white border-top border-bottom border-200 position-relative top-1">
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
                  className="sort align-middle ps-4"
                  scope="col"
                  data-sort="vendor"
                  style={{ width: '200px' }}
                ></th>
              </tr>
            </thead>
            <tbody className="list" id="products-table-body">
              {product.map((product) => (
                <tr className="position-static" key={product._id}>
                  <td className="align-middle white-space-nowrap py-0">
                    <div className="border rounded-2 m-2">
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
                    PHP {product.price}
                  </td>
                  <td className="align-middle white-space-nowrap">
                    <div className="d-flex align-items-center">
                      <button
                        className="btn btn-danger me-3"
                        onClick={() => handleDelete(product._id)}
                      >
                        Delete
                      </button>
                      <EditProductModal
                        productId={product._id}
                        onUpdate={handleProductUpdate}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
