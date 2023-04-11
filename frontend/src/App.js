import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import { Home } from './pages/home'
import { LoginPage } from './pages/login'
import { AddProduct } from './pages/add-product'
import { Cart } from './pages/cart'
import { Navbar } from './components/navbar'
import { AdminDashboard } from './pages/admin-dashboard'
import { Shop } from './pages/shop'
import { Checkout } from './pages/checkout'
import { Order } from './pages/order'
import { User } from './pages/user-dashboard'
import { RegisterPage } from './pages/register'

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<User />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order" element={<Order />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
