import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useGetUserID } from '../hooks/useGetUserID'

export const Checkout = () => {
  const [cartItems, setCartItems] = useState([])
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')

  const navigate = useNavigate()
  const userID = useGetUserID()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/products/checkout?userId=${userID}`
        )
        const data = response.data
        setCartItems(data.cartItems)
        setName(data.name)
        setAddress(data.address)
        setPhone(data.phone)
        setEmail(data.email)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [userID])

  const handlePlaceOrder = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/products/order',
        {
          userId: userID,
          cartItems: cartItems,
          name: name,
          address: address,
          phone: phone,
          email: email,
          status: 'pending',
        }
      )
      navigate('/order')
      console.log(response)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="container">
      <h2 className="mt-3 mb-5">Check out</h2>
      <div className="row justify-content-between">
        <div className="col-lg-7 col-xl-7">
          <form>
            <div className="d-flex align-items-end">
              <h3 className="mb-0 me-3">Shipping Details</h3>
            </div>
            <table className="table table-borderless mt-4">
              <tbody>
                <tr>
                  <td className="py-2 ps-0">
                    <div className="d-flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        className="bi bi-person"
                        viewBox="0 0 24 24"
                        style={{
                          height: '30px',
                          width: '30px',
                          alignSelf: 'flex-end',
                        }}
                      >
                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                      </svg>
                      <h5 className="lh-sm me-4">Name</h5>
                    </div>
                  </td>
                  <td className="py-2 fw-bold lh-sm">:</td>
                  <td className="py-2 px-3">
                    <h5 className="lh-sm fw-normal text-800">{name}</h5>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 ps-0">
                    <div className="d-flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        className="bi bi-house-door fs-5 me-2"
                        viewBox="0 0 24 24"
                        style={{
                          height: '30px',
                          width: '30px',
                          alignSelf: 'flex-end',
                        }}
                      >
                        <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146ZM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5Z" />
                      </svg>
                      <h5 className="lh-sm me-4">Address</h5>
                    </div>
                  </td>
                  <td className="py-2 fw-bold lh-sm">:</td>
                  <td className="py-2 px-3">
                    <h5 className="lh-sm fw-normal text-800">{address}</h5>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 ps-0">
                    <div className="d-flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        className="bi bi-telephone fs-5 me-2"
                        viewBox="0 0 24 24"
                        style={{
                          height: '30px',
                          width: '30px',
                          alignSelf: 'flex-end',
                        }}
                      >
                        <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                      </svg>
                      <h5 className="lh-sm me-4">Phone</h5>
                    </div>
                  </td>
                  <td className="py-2 fw-bold lh-sm">:</td>
                  <td className="py-2 px-3">
                    <h5 className="lh-sm fw-normal text-800">{phone}</h5>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 ps-0">
                    <div className="d-flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        className="bi bi-envelope-at fs-5 me-2"
                        viewBox="0 0 24 24"
                        style={{
                          height: '30px',
                          width: '30px',
                          alignSelf: 'flex-end',
                        }}
                      >
                        <path d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2H2Zm3.708 6.208L1 11.105V5.383l4.708 2.825ZM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2-7-4.2Z" />
                        <path d="M14.247 14.269c1.01 0 1.587-.857 1.587-2.025v-.21C15.834 10.43 14.64 9 12.52 9h-.035C10.42 9 9 10.36 9 12.432v.214C9 14.82 10.438 16 12.358 16h.044c.594 0 1.018-.074 1.237-.175v-.73c-.245.11-.673.18-1.18.18h-.044c-1.334 0-2.571-.788-2.571-2.655v-.157c0-1.657 1.058-2.724 2.64-2.724h.04c1.535 0 2.484 1.05 2.484 2.326v.118c0 .975-.324 1.39-.639 1.39-.232 0-.41-.148-.41-.42v-2.19h-.906v.569h-.03c-.084-.298-.368-.63-.954-.63-.778 0-1.259.555-1.259 1.4v.528c0 .892.49 1.434 1.26 1.434.471 0 .896-.227 1.014-.643h.043c.118.42.617.648 1.12.648Zm-2.453-1.588v-.227c0-.546.227-.791.573-.791.297 0 .572.192.572.708v.367c0 .573-.253.744-.564.744-.354 0-.581-.215-.581-.8Z" />
                      </svg>
                      <h5 className="lh-sm me-4">Email</h5>
                    </div>
                  </td>
                  <td className="py-2 fw-bold lh-sm">:</td>
                  <td className="py-2 px-3">
                    <h5 className="lh-sm fw-normal text-800">{email}</h5>
                  </td>
                </tr>
              </tbody>
            </table>
            <hr className="my-6" />
          </form>
        </div>
        <div className="col-lg-5 col-xl-4">
          <div className="card mt-3 mt-lg-0">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between">
                <h3 className="mb-0">Summary</h3>
              </div>
              {cartItems.map((item) => (
                <div
                  className="border-dashed border-bottom mt-4"
                  key="{item.productId}"
                >
                  <div className="mx-n2">
                    <div className="row align-items-center mb-2 g-3">
                      <div className="col-7 col-md-7">
                        <div className="d-flex align-items-center">
                          <img
                            className="me-2 ms-1"
                            src={item.imageURL}
                            alt={item.name}
                            width="40"
                          />
                          <h6 className="fw-semi-bold text-1000 lh-base">
                            {item.productName}
                          </h6>
                        </div>
                      </div>
                      <div className="col-5 ps-0">
                        <h6 className="mb-0 fw-semi-bold text-end text-lg-start">
                          PHP {item.price}
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="d-flex justify-content-between border-dashed-y pt-3">
                <h4 className="mb-0">Total :</h4>
                <h4 className="mb-0">
                  PHP {cartItems.reduce((total, item) => total + item.price, 0)}
                </h4>
              </div>
            </div>
          </div>
          <div className="row g-2 mb-5 mb-lg-0">
            <div className="col-md col-lg d-grid">
              <button className="btn btn-primary" onClick={handlePlaceOrder}>
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
