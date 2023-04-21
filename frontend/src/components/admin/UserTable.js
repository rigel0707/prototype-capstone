import { useState, useEffect } from 'react'
import axios from 'axios'

import apiUrl from '../apiUrl'

export const UserTable = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const usersResponse = await axios.get(`${apiUrl}/auth/users`)
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
      <div className="container mb-3 pb-3 px-4 mx-lg-n6 px-lg-6 bg-white border-top border-bottom border-200 position-relative top-1">
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
