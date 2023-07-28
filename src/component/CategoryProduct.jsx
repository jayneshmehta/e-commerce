import React from 'react'
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import CategoryName from './CategoryName'
import { Link } from 'react-router-dom'
import Productcard from './Productcard';

export default function CategoryProduct({ url, title, id }) {
    const [product, setProduct] = useState([])
    var baseURL = `http://product_api.localhost/api/products/GettingProductByCategoryId-${id}`;
    useEffect(() => {
        axios.get(baseURL).then((response) => {
            setProduct(response.data);
        });
    }, []);
    return (
        <div className='container mt-3' >
            <div className="card">
                <div className="row card-body p-0 gx-0">
                    <div className='col-3 p-3 ' style={{ backgroundSize: 'cover', backgroundImage: `url("${url}")` }} >
                        <CategoryName title={title} >
                            <Link to="/" className="btn btn-light ms-2 mt-4" >Source Now</Link>
                        </CategoryName>
                    </div>
                    <div className=' col-9 border-start ps-2 '>
                        <div className='d-flex scroller'>
                            {
                                product.map((items, index) => {
                                    return (
                                        <Productcard items={items} key={index} index={index} />
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
