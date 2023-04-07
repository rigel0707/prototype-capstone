import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from './pages/home'
import { Auth } from './pages/auth'
import { AddProduct } from './pages/add-product'
import { Cart } from './pages/cart'
import { Navbar } from './components/navbar'
import { AdminDashboard } from './pages/admin-dashboard'
import { Shop } from './pages/shop'
import { Checkout } from './pages/checkout'
import { Order } from './pages/order'

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order" element={<Order />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
