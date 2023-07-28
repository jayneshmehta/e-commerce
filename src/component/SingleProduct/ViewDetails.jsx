import React from 'react'
import { AiOutlineCheck, AiOutlineComment } from 'react-icons/ai'
import {FaShoppingBag , FaCartPlus} from 'react-icons/fa';
import {RxCross2} from 'react-icons/rx';
import $ from 'jquery';
import { Rating } from '@mui/material';
import SelectQuantity from './SelectQuantity';
import { Link } from 'react-router-dom';



export default function ViewDetails({ product,setBuyproduct }) {
    const rating = (parseInt(product.rating));

    function ChangeQuantity(id,quantity){
       
    }
    $(`#star${rating}`).attr('checked',"checked")
     function stock(){
        if(product.stock > 0){
            return <span className='text-success'><AiOutlineCheck className='fs-5 text-success' />In stock</span>;
        }else{
            return <span className='text-danger '><RxCross2 className='fs-5 text-danger' />Out of Stock</span>;
        }
    }
    $(document).on("change",".rate",function(){
        <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
          <img src="..." class="rounded me-2" alt="..."/>
          <strong class="me-auto">Bootstrap</strong>
          <small>11 mins ago</small>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">
          Hello, world! This is a toast message.
        </div>
      </div>
    });

    return (
        <>
            <p className="mb-2 mt-3 fw-bolder "> {stock()} </p>
            <p className='mb-0 text-truncate fs-4 fw-bolder text-capitalize'>{product.title}</p>
            <p className='mb-0 text-truncate  text-muted text-capitalize'>{product.brand}</p>
            <ul className="list-group   list-group-horizontal  w-75">
                <li className="list-group-item border-0 text-muted text-center p-0">
                    <div className="row" >
                        <div className="d-flex ">
                            <div className="rate d-flex flex-row-reverse">
                            <Rating className='fs-3' name="read-only" value={Math.floor(product.rating)} style={{ color: '#fc8200' }} readOnly />
                            </div>
                            <div className="ps-2">
                                <span id="rating" className='fs-5 fw-bolder' style={{ color: '#fc8200'}}>{product.rating}</span>
                            </div>
                        </div>
                    </div>
                </li>
                <li className='text-muted ms-2 pt-2'>
                    <AiOutlineComment className=' fs-4' />
                    <span className='ms-1 pt-5'>Review's</span>
                </li>
            </ul>
            <div className='p-2 w-50' style={{ backgroundColor: '#ffe8d1' }} >
                <div>
                    <p className='p-0 m-0 text-danger fs-5'>Price : </p>
                    <p className='p-0 ps-4  m-0 fw-bold'><span className='text-decoration-line-through' >${product.price}</span> <span className='text-danger ps-2 '>-{product.discountPercentage}%</span></p>
                    <h3 className='text-success ps-4  fw-bold ps-2 fw-lighter'><span className='fs-5 pe-2'>${Math.floor(product.price - (product.price * (product.discountPercentage) / 100))}</span>Only</h3>
                </div>
            </div>
            <div className='w-50 my-2'>
                <SelectQuantity products={product} ChangeQuantity={ChangeQuantity}/>
            </div>
            <div className='w-50 my-2'>
                <Link to={'/cart'} className='btn btn-warning mt-3 fw-bolder w-75' id='buynow' onClick={()=>setBuyproduct(product)} ><FaShoppingBag className='me-1 fs-5 pb-1'/> Buy Now </Link>
            </div>
            <div className='w-50 mb-5'>
                <button className='btn btn-danger mt-3 w-75' id='addtocart' onClick={()=>setBuyproduct(product)}><FaCartPlus className='me-1 fs-5 pb-1'/> Add to cart </button>
            </div>
            <hr className='mt-4' />
            <dl className="row">
                <dt className="col-xxl-3 col-lg-4 fw-normal text-muted">Customization:</dt>
                <dd className="col-xxl-9 col-lg-8">Customized logo and design custom packages</dd>

                <dt className="col-xxl-3 col-lg-4 fw-normal text-muted">Protection:</dt>
                <dd className="col-xxl-9 col-lg-8">Refund Policy </dd>

                <dt className="col-xxl-3 col-lg-4 fw-normal text-muted">Warranty:</dt>
                <dd className="col-xxl-9 col-lg-8">2 years full warranty </dd>
            </dl>
        </>
    )
}


