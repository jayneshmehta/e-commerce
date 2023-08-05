import React from 'react'

export default function TrackOrderModal() {
    return (
        <div>
        <button className='d-none' data-bs-toggle="modal" data-bs-target="#viewStatus" id='trackOrderModel' ></button>
            <div className="modal fade modal-xl" id="viewStatus" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1"
                aria-labelledby="viewStatusLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="viewStatusLabel">Status</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="card">
                                <div className="row d-flex justify-content-between px-3 top">
                                    <div className="d-flex">
                                        <h5>ORDER <span className="text-primary font-weight-bold" id="orderId">#Y34XDHR</span></h5>
                                    </div>
                                    <div className="d-flex flex-column text-sm-right">
                                        <p className="mb-0">Expected Arrival : <span id="deleveryState" >01/12/19</span></p>
                                        <p>USPS <span className="font-weight-bold">234094567242423422898</span></p>
                                    </div>
                                </div>

                                <div className="row d-flex justify-content-center">
                                    <div className="col-12">
                                        <ul id="progressbar" className="text-center">
                                            <li className="step0" id="step0"></li>
                                            <li className="step1" id="step1"></li>
                                            <li className="step2" id="step2"></li>
                                            <li className="step3" id="step3"></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="row mx-5 justify-content-between top">
                                    <div className="col-2 d-flex icon-content">
                                        <img className="icon" src="https://i.imgur.com/9nnc9Et.png" />
                                        <div className="d-flex flex-column">
                                            <p className="font-weight-bold">Order<br />Processed</p>
                                        </div>
                                    </div>
                                    <div className="col-2 d-flex icon-content">
                                        <img className="icon" src="https://i.imgur.com/u1AzR7w.png" />
                                        <div className="d-flex flex-column">
                                            <p className="font-weight-bold">Order<br />Shipped</p>
                                        </div>
                                    </div>
                                    <div className="col-2 d-flex icon-content">
                                        <img className="icon" src="https://i.imgur.com/TkPm63y.png" />
                                        <div className="d-flex flex-column">
                                            <p className="font-weight-bold">Order<br />Out for Delivery</p>
                                        </div>
                                    </div>
                                    <div className="col-2 d-flex icon-content">
                                        <img className="icon" src="https://i.imgur.com/HdsziHP.png" />
                                        <div className="d-flex flex-column">
                                            <p className="font-weight-bold">Order<br />Delivered</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">okay</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
