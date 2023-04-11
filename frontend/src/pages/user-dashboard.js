import { useState, useEffect } from 'react'
import axios from 'axios'
import { useGetUserID } from '../hooks/useGetUserID'
import apiUrl from '../components/apiUrl'

export const User = () => {
  const userId = useGetUserID()

  return (
    <>
      <h1>User Dashboard</h1>
      <UserProfile userId={userId} />
      <OrderTable userId={userId} />
    </>
  )
}

const OrderTable = ({ userId }) => {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `http://localhost:5000/products/order/${userId}`
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
          className="container border-top border-bottom border-200 mt-3 mb-5 table-responsive scrollbar"
          style={{ width: '75%', overflowX: 'auto' }}
        >
          <table className="table table-striped fs--1 mb-0">
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
                      className={`d-flex align-items-center justify-content-center text-center badge text-bg-${
                        order.status === 'Delivered'
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
          `http://localhost:5000/auth/users/${userId}`
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
          `http://localhost:5000/products/users/orders`
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
          `http://localhost:5000/products/cart/${userId}`
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
      <div className="container row g-3 mt-3 mb-6 mx-3">
        <h2 className="mt-3 mb-5">Profile</h2>
        <div className="container mt-2 col-8">
          <div className="card h-100">
            <div className="card-body">
              <div className="border-bottom border-dashed border-300">
                <h4 className="mb-3 lh-sm lh-xl-1">
                  {userData.firstName} {userData.lastName}
                </h4>
              </div>
              <div className="pt-4 mb-7 mb-lg-4 mb-xl-7">
                <div className="row justify-content-between">
                  <div className="col-auto">
                    <h5 className="text-1000">Address</h5>
                  </div>
                  <div className="col-auto">
                    <p className="text-1000">{userData.address}</p>
                  </div>
                </div>
              </div>
              <div className="border-top border-dashed border-300 pt-4">
                <div className="row justify-content-between mb-2">
                  <div className="col-auto">
                    <h5 className="text-1000 mb-0">Email</h5>
                  </div>
                  <div className="col-auto">
                    <a className="lh-1" href={`mailto:${userData.email}`}>
                      {userData.email}
                    </a>
                  </div>
                </div>
                <div className="row justify-content-between">
                  <div className="col-auto">
                    <h5 className="text-1000 mb-0">Phone</h5>
                  </div>
                  <div className="col-auto">
                    <a className="text-800">{userData.phone}</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container mt-5 col-4">
          <div className="card h-100" style={{ border: 'none' }}>
            <div className="card-body">
              <h4
                className="mb-3 lh-sm lh-xl-1"
                style={{ position: 'absolute', bottom: '50%' }}
              >
                Cart Items: {cartItemCount}
              </h4>
              <h4
                className="mb-3 lh-sm lh-xl-1"
                style={{ position: 'absolute', bottom: '0%' }}
              >
                Total Orders: {orderCount}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// const UserProfile = ({ userId }) => {
//   const [userData, setUserData] = useState(null)

//   useEffect(() => {
//     async function fetchUserDataAsync() {
//       const data = await fetchUserData(userId)
//       setUserData(data)
//     }
//     fetchUserDataAsync()
//   }, [userId])

//   if (!userData) {
//     return <div>Loading...</div>
//   }
//   return (
//     <>
//       <div className="container row g-3 mt-3 mb-6 mx-3">
//         <h2 className="mt-3 mb-5">Profile</h2>
//         <div className="container mt-2 col-8">
//           <div className="card h-100">
//             <div className="card-body">
//               <div className="border-bottom border-dashed border-300">
//                 <h4 className="mb-3 lh-sm lh-xl-1">{userData.name}</h4>
//               </div>
//               <div className="pt-4 mb-7 mb-lg-4 mb-xl-7">
//                 <div className="row justify-content-between">
//                   <div className="col-auto">
//                     <h5 className="text-1000">Address</h5>
//                   </div>
//                   <div className="col-auto">
//                     <p className="text-800">
//                       Vancouver, British Columbia
//                       <br />
//                       Canada
//                     </p>
//                   </div>
//                 </div>
//               </div>
//               <div className="border-top border-dashed border-300 pt-4">
//                 <div className="row justify-content-between mb-2">
//                   <div className="col-auto">
//                     <h5 className="text-1000 mb-0">Email</h5>
//                   </div>
//                   <div className="col-auto">
//                     <a className="lh-1" href="mailto:shatinon@jeemail.com">
//                       shatinon@jeemail.com
//                     </a>
//                   </div>
//                 </div>
//                 <div className="row justify-content-between">
//                   <div className="col-auto">
//                     <h5 className="text-1000 mb-0">Phone</h5>
//                   </div>
//                   <div className="col-auto">
//                     <a className="text-800" href="tel:+1234567890">
//                       +1234567890
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="container mt-5 col-4">
//           <div className="card h-100" style={{ border: 'none' }}>
//             <div className="card-body">
//               <h4
//                 className="mb-3 lh-sm lh-xl-1"
//                 style={{ position: 'absolute', bottom: '50%' }}
//               >
//                 Cart Items:
//               </h4>
//               <h4
//                 className="mb-3 lh-sm lh-xl-1"
//                 style={{ position: 'absolute', bottom: '0%' }}
//               >
//                 Total Orders:
//               </h4>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }
