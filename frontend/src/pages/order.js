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
      <div className="container d-flex justify-content-center align-items-center">
        <div className="row">
          <div className="col-12 d-flex flex-column justify-content-center align-items-center">
            <div className="alert alert-success">
              <h3>Order has been Placed!</h3>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center">
              <h3 className="py-2">Order ID: {orderId}</h3>
              <h4 className="py-2">Thank you for shopping with us!</h4>
            </div>
          </div>
          <div className="container col-12">
            <img
              className="img-order rounded mx-auto d-block"
              src="https://drive.google.com/uc?export=view&id=12qbyi3IB7n8zDZONryfktAzKFNiFrNNH"
              alt="anyabond"
            />
          </div>
          <div className="container col-12">
            <button
              className="btn btn-primary mx-auto d-block"
              onClick={handleContinueShopping}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
