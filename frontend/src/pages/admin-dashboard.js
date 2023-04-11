import { useState, useEffect } from 'react'
import axios from 'axios'

export const AdminDashboard = () => {
  return (
    <>
      <div className="container row justify-content-center mt-5">
        <div className="col-sm-12 col-md-3 col-lg-3">
          <ul className="nav nav-pills nav-fill flex-column">
            <li className="nav-item hover">
              <a
                href="#customers"
                className="nav-link active"
                data-bs-toggle="tab"
              >
                Customers
              </a>
            </li>
            <li className="nav-item hover">
              <a href="#products" className="nav-link" data-bs-toggle="tab">
                Products
              </a>
            </li>
            <li className="nav-item hover">
              <a href="#orders" className="nav-link" data-bs-toggle="tab">
                Orders
              </a>
            </li>
          </ul>
        </div>
        <div className="tab-content col-9 mb-5">
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
          'http://localhost:5000/auth/users'
        )
        const ordersResponse = await axios.get(
          'http://localhost:5000/products/users/orders'
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
        const response = await axios.get('http://localhost:5000/products')
        setProducts(response.data)
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
          <h2 className="mb-0">Products</h2>
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
        const response = await axios.get('http://localhost:5000/products/order')
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
        `http://localhost:5000/products/order/${orderId}`,
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
      <div>
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
        <button onClick={() => handleStatusChange(order._id, newStatus)}>
          Change
        </button>
      </div>
    )
  }

  return (
    // <table>
    //   <thead>
    //     <tr>
    //       <th>Order ID</th>
    //       <th>Ordered Items</th>
    //       <th>Status</th>
    //       <th>Change Status</th>
    //     </tr>
    //   </thead>
    //   <tbody>
    //     {orders.map((order) => (
    //       <tr key={order._id}>
    //         <td>{order.name}</td>
    //         <td>
    //           <table>
    //             <thead>
    //               <tr>
    //                 <th>Product Name</th>
    //                 <th>Price</th>
    //               </tr>
    //             </thead>
    //             <tbody>
    //               {order.cartItems.map((item) => (
    //                 <tr key={item._id}>
    //                   <td>{item.productName}</td>
    //                   <td>{item.price}</td>
    //                 </tr>
    //               ))}
    //             </tbody>
    //           </table>
    //         </td>
    //         <td>{order.status}</td>
    //         <td>{renderStatusDropdown(order)}</td>
    //       </tr>
    //     ))}
    //   </tbody>
    // </table>
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

// const OrderTable = () => {
//   const [orders, setOrders] = useState([])

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const response = await axios.get('http://localhost:5000/products/order')
//         setOrders(response.data)
//       } catch (err) {
//         console.error(err)
//       }
//     }

//     fetchData()
//   }, [])

//   const RenderStatusDropdown = (order) => {
//     const [localStatus, setLocalStatus] = useState(order.status)

//     const handleStatusChange = async (orderId, newStatus) => {
//       try {
//         const response = await axios.put(
//           `http://localhost:5000/products/order/${orderId}`,
//           { status: newStatus }
//         )
//         if (response.status === 200) {
//           setLocalStatus(newStatus)

//           const updatedOrders = orders.map((order) =>
//             order._id === orderId ? { ...order, status: newStatus } : order
//           )
//           setOrders(updatedOrders)
//         }
//       } catch (err) {
//         console.error(err)
//       }
//     }

//     return (
//       <div>
//         <select
//           value={localStatus}
//           onChange={(e) => handleStatusChange(order._id, e.target.value)}
//         >
//           <option value="">Select a status</option>
//           <option value="Packing Items">Packing Items</option>
//           <option value="In Shipment">In Shipment</option>
//           <option value="Delivered">Delivered</option>
//           <option value="Cancelled">Cancelled</option>
//         </select>
//       </div>
//     )
//   }

//   return (
//     <table>
//       <thead>
//         <tr>
//           <th>Order ID</th>
//           <th>Ordered Items</th>
//           <th>Status</th>
//           <th>Change Status</th>
//         </tr>
//       </thead>
//       <tbody>
//         {orders.map((order) => (
//           <tr key={order._id}>
//             <td>{order._id}</td>
//             <td>
//               <table>
//                 <thead>
//                   <tr>
//                     <th>Product Name</th>
//                     <th>Price</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {order.cartItems.map((item) => (
//                     <tr key={item._id}>
//                       <td>{item.productName}</td>
//                       <td>{item.price}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </td>
//             <td>{order.status}</td>
//             <td>{RenderStatusDropdown(order)}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   )
// }
