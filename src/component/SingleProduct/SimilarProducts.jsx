import axios from 'axios';
import env from "react-dotenv";
import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom';

export default function SimilarProducts({ category }) {

    const [product, setProduct] = useState([])
    var baseURL = `${env.API_URL}products/GettingProductBySub_CategoryId-${category}`;
    useMemo(() => {
        axios.get(baseURL).then((response) => {
            setProduct(response.data);
        });
    }, [category]);
    function getMultipleRandom(product, num) {
        const shuffled = [...product].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, num);
    }
    return (
        <>
            <h5 className='pt-1 ps-2'>You may like</h5>
            {
                getMultipleRandom(product, 4).map((items, index) => {
                    return (
                        <div className="card mt-2" key={index}>
                            <div className="card-body p-1">
                                <div className="row gx-0 p-0 m-0">
                                    <div className="col-4 me-2 border border-2">
                                        <img className=" card-img img-fluid  p-2 zoom rounded" style={{ width: '140px', height: '80px' }} src={items.thumbnail} alt="Title" />
                                    </div>
                                    <div className="col-7 ps-2">
                                        <Link to={'/product'} state={items.id} className='text-decoration-none'><p className="m-0 card-title text-dark fs-5 text-truncate text-capitalize  productlink">{items.title}</p></Link>
                                        <p className="p-0 m-0 card-text">{items.brand}</p>
                                        <p className="p-0 m-0 card-text text-success">${items.price}/- Only</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })
            }
        </>
    )
}
