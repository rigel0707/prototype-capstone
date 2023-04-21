import { UserTable } from '../components/admin/userTable'
import { ProductTable } from '../components/admin/ProductTable'
import { OrderTable } from '../components/admin/OrderTable'

export const AdminDashboard = () => {
  return (
    <>
      <div className="container mb-3 pb-3">
        <h1 className="mt-5">
          <span className="content-title-span">Admin</span> Dashboard
        </h1>
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
