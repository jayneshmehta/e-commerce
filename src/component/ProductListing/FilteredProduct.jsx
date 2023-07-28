import React from 'react'
import {Rating } from '@mui/material'
import { PiDotOutlineFill } from 'react-icons/pi';
import { Link } from 'react-router-dom';
import { BiSolidRightArrowAlt } from 'react-icons/bi'

export default function FilteredProduct({products}) {
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
                    <p className='p-0 m-0'><span className='fs-4 text-success'>${Math.floor(item.price-(item.price*(item.discountPercentage/100))).toFixed(2)}</span><span className='text-danger text-decoration-line-through  ps-2'>  ${item.price}</span></p>
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
                    <Link to={'/product'} state={item.id} className='text-decoration-none mt-1'><span className='text-capitalize d-flex align-items-center gap-1 ' >More Details  <BiSolidRightArrowAlt/></span></Link>
                    </div> 
                </div>
              </div>
            </div>
          </div>);
      })
  )
}
