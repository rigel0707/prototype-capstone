import { useState, useEffect } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import axios from 'axios'
import apiUrl from '../components/apiUrl'

export const AdminDashboard = () => {
  return (
    <>
      <div className="container">
      <h1 className='mt-5'><span className='content-title-span'>Admin</span> Dashboard</h1>
        <div className="row dashboard-pill">
          <ul className="nav nav-pills nav-fill col-12 my-5">
            <li className="nav-item hover mx-1">
              <a
                href="#customers"
                className="nav-link active"
                data-bs-toggle="tab"
              >
                Customers
              </a>
            </li>
            <li className="nav-item hover mx-1">
              <a href="#products" className="nav-link" data-bs-toggle="tab">
                Products
              </a>
            </li>
            <li className="nav-item hover mx-1">
              <a href="#orders" className="nav-link" data-bs-toggle="tab">
                Orders
              </a>
            </li>
          </ul>
        </div>
        <div className="tab-content col-12 mb-5">
          <div className="tab-pane fade show active" id="customers">
            <div className="container">
              <UserTable />
            </div>
          </div>
          <div className="tab-pane fade mb-5" id="products">
            <div className="container">
              <ProductTable />
            </div>
          </div>
          <div className="tab-pane fade mb-5" id="orders">
            <div className="container">
              <OrderTable />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const UserTable = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const usersResponse = await axios.get(
          `${apiUrl}/auth/users`
        )
        const ordersResponse = await axios.get(
          `${apiUrl}/products/users/orders`
        )

        // Combine the users data with the order counts data
        const updatedUsers = usersResponse.data.map((user) => {
          const userOrders = ordersResponse.data.find(
            (order) => order._id === user._id
          )
          return {
            ...user,
            numOrders: userOrders ? userOrders.numOrders : 0, // set the order count to 0 if there are no orders for the user
          }
        })

        setUsers(updatedUsers)
      } catch (err) {
        console.error(err)
      }
    }

    fetchData()
  }, [])

  return (
    <>
      <div className="row g-3 mb-4">
        <div className="col-auto">
          <h2 className="mb-0">Customers</h2>
        </div>
      </div>
      <div className="container mx-n4 px-4 mx-lg-n6 px-lg-6 bg-white border-top border-bottom border-200 position-relative top-1">
        <div className="table-responsive scrollbar mx-n1 px-1">
          <table className="table table-striped fs--1 mb-0">
            <thead>
              <tr>
                <th
                  className="sort white-space-nowrap align-middle ps-4"
                  scope="col"
                  style={{ width: '350px' }}
                  data-sort="product"
                >
                  CUSTOMER NAME
                </th>
                <th
                  className="sort align-middle ps-4"
                  scope="col"
                  data-sort="price"
                  style={{ width: '350px' }}
                >
                  ADDRESS
                </th>
                <th
                  className="sort align-middle fs-0 text-center ps-4"
                  scope="col"
                  style={{ width: '125px' }}
                >
                  EMAIL
                </th>
                <th
                  className="sort align-middle ps-4"
                  scope="col"
                  data-sort="vendor"
                  style={{ width: '125px' }}
                >
                  PHONE
                </th>
                <th
                  className="sort align-middle ps-4"
                  scope="col"
                  data-sort="vendor"
                  style={{ width: '125px' }}
                >
                  ORDERS
                </th>
              </tr>
            </thead>
            <tbody className="list" id="products-table-body">
              {users.map((user) => (
                <tr className="position-static" key={user._id}>
                  <td className="align-middle ps-4">
                    {user.firstName + ' ' + user.lastName}
                  </td>
                  <td className="align-middle white-space-nowrap text-700 ps-4">
                    {user.address}
                  </td>
                  <th
                    className="align-middle fs-0 text-center ps-4"
                    scope="col"
                    style={{ width: '125px' }}
                  >
                    {user.email}
                  </th>
                  <td className="align-middle white-space-nowrap text-700 ps-4">
                    {user.phone}
                  </td>
                  <td className="align-middle white-space-nowrap text-700 text-center ps-4">
                    {user.numOrders}
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
              <Button className='mt-3' variant="primary" type="submit">
                Add Product
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    )
  }

  // const EditProductModal = ({ id, onClose }) => {
  //   const [isOpen, setIsOpen] = useState(true)
  //   const [product, setProduct] = useState(null)

  //   useEffect(() => {
  //     const getProduct = async () => {
  //       try {
  //         const response = await axios.get(
  //           `http://localhost:5000/products/prod/${id}`
  //         )
  //         setProduct(response.data)
  //       } catch (err) {
  //         console.error(err)
  //       }
  //     }
  //     getProduct()
  //   }, [id])

  //   const handleChange = (event) => {
  //     const { name, value } = event.target
  //     setProduct((prevProduct) => ({ ...prevProduct, [name]: value }))
  //   }

  //   const handleSubmit = async (event) => {
  //     event.preventDefault()
  //     try {
  //       await axios.put(`http://localhost:5000/products/${id}`, product)
  //       alert('Product Updated!')
  //       onClose()
  //     } catch (err) {
  //       console.error(err)
  //     }
  //   }

  //   const handleClose = () => {
  //     setIsOpen(false)
  //     onClose()
  //   }

  //   if (!product) {
  //     return null
  //   }

  //   return (
  //     <>
  //       <Button onClick={() => setIsOpen(true)}>Edit Product</Button>

  //       <Modal show={isOpen} onHide={handleClose}>
  //         <Modal.Header closeButton>
  //           <Modal.Title>Edit Product</Modal.Title>
  //         </Modal.Header>
  //         <Modal.Body>
  //           <Form onSubmit={handleSubmit}>
  //             <Form.Group>
  //               <Form.Label>Name</Form.Label>
  //               <Form.Control
  //                 type="text"
  //                 name="name"
  //                 value={product.name}
  //                 onChange={handleChange}
  //               />
  //             </Form.Group>
  //             <Form.Group>
  //               <Form.Label>Description</Form.Label>
  //               <Form.Control
  //                 type="text"
  //                 name="description"
  //                 value={product.description}
  //                 onChange={handleChange}
  //               />
  //             </Form.Group>
  //             <Form.Group>
  //               <Form.Label>Image URL</Form.Label>
  //               <Form.Control
  //                 type="text"
  //                 name="imageURL"
  //                 value={product.imageURL}
  //                 onChange={handleChange}
  //               />
  //             </Form.Group>
  //             <Form.Group>
  //               <Form.Label>Price</Form.Label>
  //               <Form.Control
  //                 type="number"
  //                 name="price"
  //                 value={product.price}
  //                 onChange={handleChange}
  //               />
  //             </Form.Group>
  //             <Button variant="primary" type="submit">
  //               Update Product
  //             </Button>
  //           </Form>
  //         </Modal.Body>
  //       </Modal>
  //     </>
  //   )
  // }

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
      <div className="container mx-n4 px-4 mx-lg-n6 px-lg-6 bg-white border-top border-bottom border-200 position-relative top-1">
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
                >
                </th>
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
                  <td className='align-middle white-space-nowrap'>
                    <div className='d-flex align-items-center'>
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

const OrderTable = () => {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${apiUrl}/products/order`)
        setOrders(response.data)
      } catch (err) {
        console.error(err)
      }
    }

    fetchData()
  }, [])

  const [newStatus, setNewStatus] = useState('')

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await axios.put(
        `${apiUrl}/products/order/${orderId}`,
        { status: newStatus }
      )
      if (response.status === 200) {
        const updatedOrders = orders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
        setOrders(updatedOrders)

        setNewStatus(newStatus)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const renderStatusDropdown = (order) => {
    return (
      <div className='d-flex'>
        <select
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
        >
          <option value="">Select a status</option>
          <option value="Packing Items">Packing Items</option>
          <option value="In Shipment">In Shipment</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <button className='btn btn-primary mx-2' onClick={() => handleStatusChange(order._id, newStatus)}>
          Change
        </button>
      </div>
    )
  }

  return (
    <>
      <div className="row g-3 mb-4">
        <div className="col-auto">
          <h2 className="mb-0">Orders</h2>
        </div>
      </div>
      <div className="container mx-n4 px-4 mx-lg-n6 px-lg-6 bg-white border-top border-bottom border-200 position-relative top-1">
        <div className="table-responsive scrollbar mx-n1 px-1">
          <table className="table fs--1 mb-0">
            <thead>
              <tr>
                <th
                  className="sort white-space-nowrap align-middle ps-4"
                  scope="col"
                  style={{ width: '350px' }}
                  data-sort="product"
                >
                  Order ID
                </th>
                <th
                  className="sort align-middle ps-4"
                  scope="col"
                  data-sort="price"
                  style={{ width: '350px' }}
                >
                  Total Price
                </th>
                <th
                  className="sort align-middle ps-4"
                  scope="col"
                  data-sort="price"
                  style={{ width: '350px' }}
                >
                  Customer Name
                </th>
                <th
                  className="sort align-middle fs-0 text-center"
                  scope="col"
                  style={{ width: '125px' }}
                >
                  Status
                </th>
                <th
                  className="sort align-middle ps-4"
                  scope="col"
                  data-sort="vendor"
                  style={{ width: '125px' }}
                >
                  Change Status
                </th>
              </tr>
            </thead>
            <tbody className="list" id="products-table-body">
              {orders.map((order) => (
                <tr className="position-static" key={order._id}>
                  <td className="align-middle ps-4">{order._id}</td>
                  <td className="align-middle white-space-nowrap fw-bold text-700 ps-4">
                    PHP{' '}
                    {order.cartItems.reduce(
                      (total, item) => total + item.price,
                      0
                    )}
                  </td>
                  <td className="align-middle ps-4">{order.name}</td>
                  <td className="align-middle">
                    <span
                      className={`badge d-flex align-items-center justify-content-center text-center ${
                        order.status === 'Packing Items'
                          ? 'bg-primary'
                          : order.status === 'In Shipment'
                          ? 'bg-warning'
                          : order.status === 'Delivered'
                          ? 'bg-success'
                          : order.status === 'Cancelled'
                          ? 'bg-danger'
                          : ''
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="align-middle white-space-nowrap fw-bold text-700 ps-4">
                    {renderStatusDropdown(order)}
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
