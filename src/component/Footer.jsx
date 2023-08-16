import React from 'react'
import logo192 from "./logo192.png";
import { GrInstagram } from 'react-icons/gr'
import { FiFacebook } from 'react-icons/fi'
import { FaTwitterSquare } from 'react-icons/fa'
import { BsLinkedin } from 'react-icons/bs'
import { useLocation } from 'react-router-dom';

export default function Footer() {
  const { pathname } = useLocation();
  return (pathname == "/login" || pathname == "/register")
  ?("")
  :(
    <section className="footer-main bg-dark  py-3 mt-3">
      <div className="container">
        <div className="row gx-0">
          <aside className="col-12 col-sm-12 col-lg-4">
            <article className="me-lg-5">
              <img src={logo192} height="44" className="logo-footer" /><span className='text-light pt-3 fw-bold fs-4 ms-2'>React</span>
              <p className="mt-3 text-white-50"> here is some information about our company, We work since 2023 and still growing. This is just start of the website</p>
              <nav className="mb-4 mb-lg-0 text-light fs-3  ">
                <GrInstagram className='mx-2' />
                <FiFacebook  className='mx-2'/>
                <FaTwitterSquare  className='mx-2'/>
                <BsLinkedin  className='mx-2'/>
              </nav>
            </article>
          </aside>
          <aside className="col-6 col-sm-4 col-lg-2">
            <h6 className="title text-light ms-4 ">Store</h6>
            <ul className="list-menu mb-4">
              <li> <a className='text-decoration-none text-secondary' href="#">About us</a></li>
              <li> <a className='text-decoration-none text-secondary' href="#">Find store</a></li>
              <li> <a className='text-decoration-none text-secondary' href="#">Categories</a></li>
              <li> <a className='text-decoration-none text-secondary' href="#">Blogs</a></li>
            </ul>
          </aside>
          <aside className="col-6 col-sm-4 col-lg-2">
            <h6 className="title  text-light ms-4">Information</h6>
            <ul className="list-menu mb-4">
              <li> <a className='text-decoration-none text-secondary' href="#">Help center</a></li>
              <li> <a className='text-decoration-none text-secondary' href="#">Money refund</a></li>
              <li> <a className='text-decoration-none text-secondary' href="#">Shipping info</a></li>
              <li> <a className='text-decoration-none text-secondary' href="#">Refunds</a></li>
            </ul>
          </aside>
          <aside className="col-6 col-sm-4  col-lg-2">
            <h6 className="title  text-light ms-4">Support</h6>
            <ul className="list-menu mb-4">
              <li> <a className='text-decoration-none text-secondary' href="#"> Help center </a></li>
              <li> <a className='text-decoration-none text-secondary' href="#"> Documents </a></li>
              <li> <a className='text-decoration-none text-secondary' href="#"> Account restore </a></li>
              <li> <a className='text-decoration-none text-secondary' href="#"> My Orders </a></li>
            </ul>
          </aside>
          <aside className="col-6 col-sm-4 col-lg-2">
            <h6 className="title">Download</h6>
            <a href="#" className="mb-2 d-inline-block"> <img src="	https://bootstrap-ecommerce-web.netlify.app/images/misc/btn-appstore.png" height="40" /></a>
            <a href="#" className="mb-2 d-inline-block"> <img src="https://bootstrap-ecommerce-web.netlify.app/images/misc/btn-market.png" height="40" /></a>
          </aside>
        </div>
      </div>
    </section>

  )
} 

