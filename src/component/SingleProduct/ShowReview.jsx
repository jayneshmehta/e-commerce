import { Rating } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function ShowReview({ product }) {
    const [review, setreview] = useState([]);
    useEffect(() => {
        let Baseurl = `http://192.168.101.102/api/review/GettingreviewBproductId-${product.id}`;
        axios.get(Baseurl).then(async (responce) => {
            setreview(responce.data);
        });
    }, [product])
    return (
        <div>
            {
                review.map((items, index) => {
                    var features = items.features?.split(',');
                    return (
                        <div className="mt-1" key={index}>
                            <p className='p-0 m-1 text-dark fw-bolder'>
                                <img src={"http://192.168.101.102/"+items.profile} className='rounded-5 me-1' style={{width:'30px',height:"30px"}} alt="" /> {items.name}</p>
                            <Rating name="half-rating-read" defaultValue={items.rating} precision={0.5} readOnly />
                            <br />
                            {
                                features.map((f) => {
                                    return <small className='badge  border bg-primary p-1 text-light mx-2 feature' >{f}</small>
                                })
                            }
                            <div className='mt-1'>
                                <textarea className="form-control" name="comments" id="" rows="1" disabled>
                                    {items.comments}
                                </textarea>
                            </div>
                            <hr></hr>
                        </div>
                    );
                })
            }
        </div>
    )
}
