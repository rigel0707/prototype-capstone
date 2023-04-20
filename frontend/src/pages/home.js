import { Link } from 'react-router-dom'

import logo from '../assets/images/logo.png'
import banner from '../assets/images/banner.png'
import adsbanner from '../assets/images/ads-banner.png'
import adsbg from '../assets/images/ads-bg.png'
import brand1 from '../assets/images/brand-1.png'
import brand2 from '../assets/images/brand-2.png'
import brand3 from '../assets/images/brand-3.png'
import brand4 from '../assets/images/brand-4.png'
import brand5 from '../assets/images/brand-5.png'
import prod1 from '../assets/images/product-1.jpg'
import prod2 from '../assets/images/product-2.jpg'
import prod3 from '../assets/images/product-3.jpg'
import prod4 from '../assets/images/product-4.jpg'

export const Home = () => {
  return (
    <>
      <section
        className="banner mb-5"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="container">
          <div className='banner-content row mt-5'>
            <h1 className="h1 banner-title col-12">
              <span className="span">High Quality<br></br>
              </span> Pet Essentials
            </h1>
            <p className="banner-text col-12">Sale up to 50% off on selected items</p>
            <Link to="/shop" className="btn btn-black">
            Shop Now!
          </Link>
          </div>
        </div>
      </section>
      <section className="trending-items mb-5">
        <div className="container trending-content">
          <div className="content-title d-flex justify-content-center">
            <h1>
              <span className="content-title-span">Trending</span> Items
            </h1>
          </div>
          <div className="row align-self-end text-center justify-content-center">
            <div className="col-md-3">
              <img
                src={prod1}
                className="product-image rounded mx-auto d-block"
              ></img>
              <a href="" className="product-link">
                Royal Canin Hypoallergenic Dog<br></br>
                Dry Food (7kg)
              </a>
              <div className="product-price my-2">₱575.00</div>
            </div>
            <div className="col-md-3">
              <img
                src={prod2}
                className="product-image rounded mx-auto d-block"
              ></img>
              <a href="" className="product-link">
                Aqueon Shrimp Pellets Fish Food<br></br>
                (6.5 oz)
              </a>
              <div className="product-price my-2">₱440.00</div>
            </div>
            <div className="col-md-3">
              <img
                src={prod3}
                className="product-image rounded mx-auto d-block"
              ></img>
              <a href="" className="product-link">
                Wardley Shrimp Pellet Fish Food <br></br>
                (9.0 oz)
              </a>
              <div className="product-price my-2">₱1445.00</div>
            </div>
            <div className="col-md-3">
              <img
                src={prod4}
                className="product-image rounded mx-auto d-block"
              ></img>
              <a href="" className="product-link">
                ZuPreem FruitBlend Flavor with Natual Flavors <br></br>
                (2 lb)
              </a>
              <div className="product-price my-2">₱949.00</div>
            </div>
          </div>
        </div>
      </section>
      <section className="service container">
        <div className="content-title d-flex justify-content-center mb-5">
          <div className="flex-column text-center">
            <img src={logo} className="service-logo" alt="FuzzyJARR"></img>
            <h1>
              <span className="content-title-span">
                Happyness and Satisfaction
              </span>
              <br></br>
              under one roof for your little friends.
            </h1>
          </div>
        </div>
        <div className="row text-center justify-content-center align-items-start">
          <div className="col-md-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="70"
              height="70"
              fill="currentColor"
              className="bi bi-truck"
              viewBox="0 0 16 16"
            >
              <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5v-7zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456zM12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
            </svg>
            <h4 className="">Free Delivery</h4>
            <div className="service-text">
              Order by 1 pm local time on the same-day to get free delivery on
              orders ₱ 1,000+ today
            </div>
          </div>
          <div className="col-md-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="70"
              height="70"
              fill="currentColor"
              className="bi bi-receipt-cutoff"
              viewBox="0 0 16 16"
            >
              <path d="M3 4.5a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zM11.5 4a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1zm0 2a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1zm0 2a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1zm0 2a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1zm0 2a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z" />
              <path d="M2.354.646a.5.5 0 0 0-.801.13l-.5 1A.5.5 0 0 0 1 2v13H.5a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1H15V2a.5.5 0 0 0-.053-.224l-.5-1a.5.5 0 0 0-.8-.13L13 1.293l-.646-.647a.5.5 0 0 0-.708 0L11 1.293l-.646-.647a.5.5 0 0 0-.708 0L9 1.293 8.354.646a.5.5 0 0 0-.708 0L7 1.293 6.354.646a.5.5 0 0 0-.708 0L5 1.293 4.354.646a.5.5 0 0 0-.708 0L3 1.293 2.354.646zm-.217 1.198.51.51a.5.5 0 0 0 .707 0L4 1.707l.646.647a.5.5 0 0 0 .708 0L6 1.707l.646.647a.5.5 0 0 0 .708 0L8 1.707l.646.647a.5.5 0 0 0 .708 0L10 1.707l.646.647a.5.5 0 0 0 .708 0L12 1.707l.646.647a.5.5 0 0 0 .708 0l.509-.51.137.274V15H2V2.118l.137-.274z" />
            </svg>
            <h4 className="">35% Off</h4>
            <div className="service-text">
              35% off your first repeat delivery order
            </div>
          </div>
          <div className="col-md-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="70"
              height="70"
              fill="currentColor"
              className="bi bi-shield-check"
              viewBox="0 0 16 16"
            >
              <path d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z" />
              <path d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
            </svg>
            <h4 className="">Security payment</h4>
            <div className="service-text">
              20% off your online order of ₱ 2,000+
            </div>
          </div>
          <div className="col-md-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="70"
              height="70"
              fill="currentColor"
              className="bi bi-person-check"
              viewBox="0 0 16 16"
            >
              <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514ZM11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
              <path d="M8.256 14a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Z" />
            </svg>
            <h4 className="">24/7 Support</h4>
            <div className="service-text">
              Our customer service agent will cater your need at any time of the
              day
            </div>
          </div>
        </div>
      </section>
      <section
        className="cat-banner mb-5"
        style={{ backgroundImage: `url(${adsbg})` }}
      >
        <div className="container d-flex flex-row align-items-center">
          <img src={adsbanner} className="cat-banner-image img-fluid"></img>
          <div className="flex-column">
            <div className="cat-banner-text cat-banner-title my-1">
              Healthy pets are what we pledge to bring you.
            </div>
            <div className="cat-banner-text my-1">
              Why not give the best to the ones you love the most?
            </div>
            <Link to="/shop" className="btn btn-black my-5">
              Shop Now!
            </Link>
          </div>
        </div>
      </section>
      <section className="popular-brands mb-5">
        <div className="content-title d-flex justify-content-center">
          <h1>
            <span className="content-title-span">Popular</span> Brands
          </h1>
        </div>
        <div className="d-flex justify-content-center">
          <img src={brand1} className="brand-image img-fluid"></img>
          <img src={brand2} className="brand-image img-fluid"></img>
          <img src={brand3} className="brand-image img-fluid"></img>
          <img src={brand4} className="brand-image img-fluid"></img>
          <img src={brand5} className="brand-image img-fluid"></img>
        </div>
      </section>
    </>
  )
}
