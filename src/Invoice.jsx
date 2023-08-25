import { html2pdf } from 'html2pdf.js';
import React from 'react'

export default function Invoice({ data }) {
    return (
        <div id="invoice" className='mt-3'>
            <div className="container">
                <div className="row">
                    <div className="col-xs-12">
                        <div className="invoice-title">
                            <h5>Invoice</h5>
                            <p className="pull-right fw-bolder">Order No: {data.orders[0].orderGroupId}</p>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-6">
                                <address style={{ width: "200px" }}>
                                    <strong>Billed To:</strong><br />
                                    {data.address}
                                </address>
                            </div>
                            <div className="col-6">
                                <div className="row justify-content-end text-end">
                                    <address>
                                        <strong>Shipped To:</strong><br />
                                        React <br />
                                        Shopping site<br />
                                        hinjewadi<br />
                                        middle east <br />
                                        pune-411057
                                    </address>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <address>
                                    <strong>Payment Method:</strong><br />
                                    <p className='fs-5 m-0 p-0 text-success'>{data.payment}</p>
                                    e-mail : abayomiogunnusi@email.com
                                </address>
                            </div>
                            <div className="col-6 justify-content-end text-right">
                                <div className="row justify-content-end text-end">
                                    <address>
                                        <strong>Order Date:</strong><br />
                                        {data.created_at}<br /><br />
                                    </address>
                                    <div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12">
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h3 className="panel-title"><strong>Purchase Summary</strong></h3>
                                    </div>
                                    <div className="panel-body">
                                        <div className="table-responsive">
                                            <table className="table table-condensed">
                                                <thead>
                                                    <tr>
                                                        <td><strong>Product Name</strong></td>
                                                          <td className="text-center"><strong>Amount</strong></td>
                                                        <td className="text-center"><strong>Discount</strong></td>
                                                        <td className="text-center"><strong>Discounted Price</strong></td>
                                                        <td className="text-center"><strong>Quantity</strong></td>
                                                        <td className="text-center"><strong>Total</strong></td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        data.orders.map((items) => {
                                                            return (
                                                                <tr>
                                                                    <td>{items.title}</td>
                                                                    {/* <td className="text-center"><img className='rounded-5' src={items.thumbnail} alt="" style={{width:"50px",height:"50px"}}/></td> */}
                                                                    <td className="text-center">${items.price}</td>
                                                                    <td className="text-center text-success">{items.discountPercentage}%</td>
                                                                    <td className="text-center">${(parseInt(items.price) - ((parseInt(items.price) * parseInt(items.discountPercentage)) / 100))}</td>
                                                                    <td className="text-center"><span className='fw-bolder me-2'>x</span>{items.quantity}</td>
                                                                    <td className="text-center fw-bolder">{parseFloat(items.quantity * (parseInt(items.price) - ((parseInt(items.price) * parseInt(items.discountPercentage))) / 100)).toFixed(2)}</td>
                                                                </tr>
                                                            )
                                                        })
                                                    }


                                                    <tr className=''>
                                                        <td colSpan={4} className='border-0'></td>
                                                        <td className='text-center'  >Shipping charge:</td>
                                                        <td className='text-center'>+{data.shipping}</td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan={4} className='border-0'></td>
                                                        <td className='text-center'  >S-GST:</td>
                                                        <td className='text-center'>+{17.5}</td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan={4} className='border-0'></td>
                                                        <td className='text-center'  >G-GST:</td>
                                                        <td className='text-center'>+{17.5}</td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan={4} className='border-0'></td>

                                                        <td className='text-center'  >coupon:</td>
                                                        <td className='text-center'>-{data.orders[0].coupon}%</td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan={4} className='border-0'></td>

                                                        <td className='text-center fw-bolder'  >Total :</td>
                                                        <td className='text-center fw-bolder'>{data.total_amount + data.shipping}</td>
                                                    </tr>

                                                </tbody>
                                            </table>
                                            <div>
                                            </div>
                                        </div>
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