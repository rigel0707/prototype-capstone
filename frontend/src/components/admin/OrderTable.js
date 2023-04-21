import { useState, useEffect } from 'react'
import axios from 'axios'

import apiUrl from '../apiUrl'

export const OrderTable = () => {
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
      const response = await axios.put(`${apiUrl}/products/order/${orderId}`, {
        status: newStatus,
      })
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
      <div className="d-flex">
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
        <button
          className="btn btn-primary mx-2"
          onClick={() => handleStatusChange(order._id, newStatus)}
        >
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
