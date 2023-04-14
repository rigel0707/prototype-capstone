import { useState } from 'react'
import { Link } from 'react-router-dom'

import banner from '../assets/images/banner.png'

export const Home = () => {
  const [showOffcanvas, setShowOffcanvas] = useState(false)

  function navlinkClick() {
    setShowOffcanvas(false)
  }
  
  return (
    <>
      <section className="banner"
        style={{backgroundImage: `url(${banner})`}}
      >
        <div className="container-fluid text-center">
          <div className="banner-text mt">
            <div className="banner-title-span">HIGH QUALITY</div>
            <div className="banner-title">PET ESSENTIALS</div>
            <div className="banner-content mb-3">Sale up to 50% off on selected items</div>
            <Link to="/shop" className="btn btn-black">
              Shop Now!
            </Link>
          </div>
        </div>
      </section>
      <section className='trending-items'>
        <div className='container'>
          <div className='sub-heading'>
            <span className='sub-heading-span'>Trending</span> Items
          </div>
        </div>
      </section>
    </>
  )
}
