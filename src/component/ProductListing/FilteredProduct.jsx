import React from 'react'
import { Rating } from '@mui/material'
import { PiDotOutlineFill } from 'react-icons/pi';
import { Link } from 'react-router-dom';
import { BiSolidRightArrowAlt } from 'react-icons/bi'
import { FaSadCry } from 'react-icons/fa';

export default function FilteredProduct({ products }) {

  if (products.length === 0) {
    return (<div className="container ">
      <div className="row align-items-center mt-5">
        <div className="offset-lg-3 col-lg-6 col-md-12 col-12 text-center ">
          <img src="https://cdni.iconscout.com/illustration/premium/thumb/page-not-found-6210462-5115902.png?f=webp" alt="" style={{ width: '450px', height: '400' }} className="img-fluid  mb-4" />
          <h2 className='text-muted'>No product's for this Filter <FaSadCry className='text-danger' /></h2>
          <p className="mb-4 text-muted">
            Pls change the filter to get the products and check to your desired one.. All the Best...
          </p>
        </div>
      </div>
    </div>
    )
  }

  return (
    products.map((item, index) => {
      return (
        <div className="card border-2 mt-3" key={index} >
          <div className="card-body p-1">
            <div className="row " >
              <div className='col-4 rounded d-flex align-items-center'>
                <img src={item.thumbnail} className='img-fluid p-1 rounded ' style={{ width: '300px', height: '180px' }} alt={item.title} />
              </div>
              <div className='col-8 p-2'>
                <Link to={'/product'} state={item.id} className='text-decoration-none text-dark'><h5 className='text-capitalize productlink' >{item.title}</h5></Link>
                <div className="row gx-0">
                  <p className='p-0 m-0 text-muted'>{item.brand}</p>
                  <p className='p-0 m-0'><span className='fs-4 text-success'>${Math.floor(item.price - (item.price * (item.discountPercentage / 100))).toFixed(2)}</span><span className='text-danger text-decoration-line-through  ps-2'>  ${item.price}</span></p>
                </div>
                <ul className="list-group list-group-horizontal  w-75">
                  <li className="list-group-item border-0 text-muted text-center p-0">
                    <div className="row" >
                      <Rating name="read-only" value={parseInt(item.rating)} style={{ color: "#fa7700" }} precision={0.5} readOnly ></Rating>
                    </div>
                  </li>
                  <li className='text-muted ms-2'>
                    <span className='fw-bolder' style={{ color: "#fa7700" }}>{item.rating}</span>
                    <PiDotOutlineFill className='' />
                    <span className="label-rating text-success">Free Shipping</span>
                  </li>
                </ul>
                <div className="row gx-0">
                  <p className='p-0 m-0 text-muted'><span className='fw-bolder pe-1'>Description:</span>{item.description}</p>
                  <Link to={'/product'} state={item.id} className='text-decoration-none mt-1'><span className='text-capitalize d-flex align-items-center gap-1 ' >More Details  <BiSolidRightArrowAlt /></span></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    })
  )
}
