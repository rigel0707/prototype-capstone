import { useNavigate } from 'react-router-dom'

export const Order = () => {
  const orderId = window.localStorage.getItem('orderId')
  const navigate = useNavigate()

  const handleContinueShopping = () => {
    window.localStorage.removeItem('orderId')
    navigate('/shop')
  }
  return (
    <>
      <div className="container">
        <div>Order has been Placed!</div>
        <div>
          <h3>Order ID: {orderId}</h3>
          <h3>Thank you for shopping with us!</h3>
        </div>
        <img
          className="img-order rounded mx-auto d-block"
          src="https://drive.google.com/uc?export=view&id=12qbyi3IB7n8zDZONryfktAzKFNiFrNNH"
          alt="anyabond"
        />
        <button
          className="btn btn-primary mx-auto d-block"
          onClick={handleContinueShopping}
        >
          Continue Shopping
        </button>
      </div>
    </>
  )
}
