import React from 'react'
import Userinfo from './Userinfo'
import { Link } from 'react-router-dom'

export default function Main({ userdata }) {
    console.log(userdata);
    var address = (userdata?.address == null) ? "No Address" : userdata.address
    return (
        <div>
            <div className="card">
                <div className="card-body">
                    <h5 className='card-title fw-bolder'>Personal info</h5>
                    <Userinfo userdata={userdata} />
                    <hr></hr>
                    <div className="card">
                        <div className="card-body">
                            <h5 className='card-title fw-bolder'>Address info :</h5>
                            <div className="card shadow-sm">
                                {
                                    (address == "No Address")
                                        ? (<p className='p-2'>No Address..!</p>)
                                        : (<div className="p-3">
                                            <p className="mb-1">
                                                {address}
                                            </p>
                                            <div className='d-flex justify-content-end gap-2'>
                                                <Link className='text-primary text-decoration-none'>Edit</Link>
                                                <Link className='text-primary text-decoration-none'>Delete</Link>
                                            </div>
                                        </div>)}
                            </div>
                        </div>

                    </div>
                    <hr></hr>
                    <h5 className='card-title fw-bolder'>My recent orders :</h5>
                    <div className="card">
                        <div className="card-body">
                            <header className="d-lg-flex">
                                <div className="flex-grow-1">
                                    <h6 className="mb-0">Order ID: 8924 <i className="dot"></i>
                                        <span className="text-warning"> Pending </span>
                                    </h6>
                                    <span className="text-muted">Date: 16 December 2018</span>
                                </div>

                                <div className='d-flex gap-2'>
                                    <a href="#" className="btn btn-outline-danger">Cancel order</a>
                                    <a href="#" className="btn btn-primary">Track order</a>
                                </div>
                            </header>
                        </div>
                    </div>
                    <hr></hr>
                </div>
            </div>
        </div >
    )
}
