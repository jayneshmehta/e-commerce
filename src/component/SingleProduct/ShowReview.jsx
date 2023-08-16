import { Rating } from '@mui/material';
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa';


export default function ShowReview({ review }) {

    return (
        <div>

            {
                review?.map((items, index) => {
                    var features = items.features?.split(',')
                    var postAt = moment(new Date(items.updated_at)).fromNow();
                    return (
                        <div className="mt-1" key={index}>
                            <div className='row'>
                                <div className="col-1">
                                    <img src={"http://192.168.101.102/" + items.profile} className='rounded-5 me-1' style={{ width: '40px', height: "40px" }} alt="" />
                                </div>
                                <div className="col-11 p-0">
                                    <p className='p-0 m-0  text-dark fw-bolder'>
                                        {items.name}
                                    </p>
                                    <small className=' py-0'>
                                        {
                                            postAt
                                        }
                                    </small>
                                </div>
                            </div>
                            <Rating name="half-rating-read" defaultValue={parseFloat(items.rating)} precision={0.5} readOnly />
                            <br />
                            {
                                features?.map((f, index) => {
                                    return <small className='badge  border bg-primary p-1 text-light mx-2 feature' key={'featres' + index} >{f}</small>
                                })
                            }
                            {
                                (items.comments) &&
                                <div className='mt-1'>
                                    <textarea className="form-control" name="comments" id="" rows="1" defaultValue={items.comments} disabled>
                                    </textarea>
                                </div>
                            }
                            <hr></hr>
                        </div>
                    );
                })
            }
        </div >
    )
}
