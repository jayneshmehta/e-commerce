import React from 'react'
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import CarouselAds from './CarouselAds';
import { BsArrowRight } from 'react-icons/bs'
import { Link } from 'react-router-dom';
import $ from 'jquery';

export default function Hero({setCategory}) {
    const [sub_category, setsub_category] = useState([])
    var baseURL = 'http://product_api.localhost/api/sub_category';
    useEffect(() => {
        axios.get(baseURL).then((response) => {
            setsub_category(response.data)
        });
    }, []);
    $(document).on("click",".catlist",function(){
        setCategory(this.id);  
    })
    var sub_categorys = sub_category.map((items, index) => {
        return <a  id={items.id} className="catlist  list-group-item list-group-item-action border-0 text-capitalize rounded " key={index}>{items.Sub_category_Name}</a>
    });

    let mystyle = {
        height: '400px',
    }
    return (
        <div className='container pt-3'>
            <div className="row gx-0">
                <div className="col-sm-12 mb-3 mb-sm-0">
                    <div className="card p-2">
                        <div className="card-body ">
                            <div className='d-flex gx-0 me-1 justify-content-between ' style={{ height: '400px' }}>
                                <div className='col-3 overflow-auto pe-1' >
                                    <div className="list-group scroller-y">
                                    <Link to={'/allproductlisting'} className="text-center border border-primary list-group-item list-group-item-action border-3 me-3 text-capitalize rounded fw-bolder" key={'allProducts'}>All Products<span className='ps-3 fw-bolder text-dark pb-2'><BsArrowRight strokeWidth="2" viewBox="0 2 16 16"/></span></Link>
                                        {sub_categorys}
                                    </div>
                                </div>
                                <div className='col-7 pe-3 rounded'>
                                    <CarouselAds />
                                </div>
                                <div className='col-2 '>
                                    <div className="bg-primary-light p-3 rounded mb-4" style={{ backgroundColor: '#dbe9ff' }} >
                                        <p className="d-flex py-2 mb-3 text-base">
                                            <img src="https://bootstrap-ecommerce-web.netlify.app/images/avatars/avatar.jpg" className="img-avatar me-2 rounded-circle" width="44" height="44" alt="" />
                                            <span>Hi, user <br /> let's get stated</span>
                                        </p>
                                        <a href="#" className="btn btn-sm btn-primary w-100">Join now</a>
                                    </div>
                                    <div className="bg-warning text-white p-3 rounded mb-3">
                                        Get US $10 off with a new supplier account
                                        <br /> <a href="#" className="text-white mt-1 fw-bold d-inline-block">Get now</a>
                                    </div>
                                    <div className="bg-info text-white p-3 rounded mb-2">
                                        Send quotes with supplier preferences
                                        <br /> <a href="#" className="text-white mt-1 fw-bold d-inline-block">Try now</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
