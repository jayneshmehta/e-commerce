import React, { useEffect, useState } from 'react'
import EmptyCart from '../component/Cart/EmptyCart'
import BuyProductCard from '../component/Cart/BuyProductCard'
import CouponDiv from '../component/Cart/CouponDiv'
import PriceSummary from '../component/Cart/PriceSummary'
import { Breadcrumbs, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useCreditCardValidator, images } from 'react-creditcard-validator';
import $ from 'jquery';
import SmallBuyProcuct from '../component/Payment/SmallBuyProcuct'
import axios from 'axios'
import Swal from 'sweetalert2'

export default function Payment({ Buyproduct }) {

    function expDateValidate(month, year) {
        if (Number(year) > 2035) {
            return 'Expiry Date Year cannot be greater than 2035';
        }
        return;
    }

    const {
        getCardNumberProps,
        getCardImageProps,
        getCVCProps,
        getExpiryDateProps,
        meta: { erroredInputs }
    } = useCreditCardValidator({ expiryDateValidator: expDateValidate });

    const [delivery, setdelivery] = useState(30)
    const handleChange = (e) => {
        setdelivery(parseInt(e.target.value));
    }
    const [Cartitems, setCartitems] = useState(JSON.parse(sessionStorage.getItem('cart')));

    const navigate = useNavigate();


    const handelSubmit = () => {
        var error = false;

        var paymentType = $('[name="payment"]:checked').val();
        var shippingType = delivery;
        var ShippingAddress = $("#ShippingAddress").val();
        var Cname = $("#Cname").val();
        var shippingType = delivery;
        var allProducts = Cartitems;
        var user = JSON.parse(sessionStorage.getItem('user'));
        if (ShippingAddress.trim() == "") {
            $("#Err_ShippingAddress").text("Enter a address..");
            error = true;
        } else {
            $("#Err_ShippingAddress").text("");
        }
        if (paymentType == 'creditcard') {

            if ($("#expiryDate").val() == "") {
                $("#err_expiredate").text("Enter a expire date..");
                error = true;
            } else {
                $("#err_expiredate").text("");
            }
            if ($("#Cname").val() == "") {
                $("#errCname").addClass('text-danger');
                $("#errCname").text("Enter a name on card..");
                error = true;
            } else {
                $("#errCname").removeClass('text-danger');
                $("#errCname").text("");
            }
            if ($("#cardNumber").val() == "") {
                $("#errCnumber").text("Enter a Card number..");
                error = true;
            } else {
                $("#errCnumber").text("");
            }
            if ($("#cvc").val() == '') {
                $("#errCvv").text("Enter a Cvv..");
                error = true;
            } else {
                $("#errCvv").text("");
            }
        } else if (paymentType == 'upi') {
            const regex = new RegExp(/^[a-zA-Z0-9.-]{2,256}@[a-zA-Z][a-zA-Z]{2,64}$/);
            console.log();
            if ($("#upiinput").val() != '' && regex.test($("#upiinput").val())) {
                $("#errUpi").text("");
            } else {
                $("#errUpi").text("Enter a valid upi..");
                error = true;
            }
        }

        if (!error) {
            var data = {
                paymentType: paymentType,
                shippingType: shippingType,
                ShippingAddress: ShippingAddress,
                allProducts: allProducts,
                user: user,
            }
            var baseURL = 'http://192.168.101.102/api/orders';
            axios.post(baseURL, (data))
                .then(response => {
                    Swal.fire({
                        title: 'Order Placed..',
                        type: 'success',
                        icon: 'success',
                        text: `${response.data.message}`,
                    });
                    sessionStorage.removeItem("cart");
                    navigate('/');
                }).catch(
                    (error) => {
                        let message = error.response.data.message;
                        $("#msg").html(`<p class='text-center text-danger'>${message}</p>`)
                    }
                )
        } else {
            return false;
        }
    }

    return (
        <>
            {
                <div className='container mt-3'>
                    <Breadcrumbs aria-label="breadcrumb" className='my-3'>
                        <Link className='text-decoration-none' color="text.primary" to="/">Home</Link>
                        <Link className='text-decoration-none' color="text.primary" to="/cart">Cart</Link>
                        <Typography color="text.primary">Payment</Typography>
                    </Breadcrumbs>
                    <div className="row">
                        <div className="col-9 overflow-auto" >
                            <div className="card text-start">
                                <div className="card-body">
                                    <h5 className="card-title"> Shipping info </h5>
                                    <div className="row gap-2 mb-3 justify-content-center">
                                        <div className="border border-2 rounded col-lg-4 mb-3" >
                                            <div className="box-check p-3">
                                                <label className="form-check">
                                                    <input className="form-check-input" type="radio" value={120} name="delivery" onChange={(e) => handleChange(e)} />
                                                    <b className="border-oncheck"></b>
                                                    <span className="form-check-label">
                                                        Prime delivery <br />
                                                        <small className="text-muted">1-2 days</small>
                                                    </span>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="border border-2 rounded col-lg-4 mb-3">
                                            <div className="box-check p-3">
                                                <label className="form-check">
                                                    <input className="form-check-input" type="radio" value={90} name="delivery" onChange={(e) => handleChange(e)} />
                                                    <b className="border-oncheck"></b>
                                                    <span className="form-check-label">
                                                        Express delivery   <br />
                                                        <small className="text-muted">4-5 days</small>
                                                    </span>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="border border-2 rounded col-lg-3 mb-3">
                                            <div className="box-check p-3">
                                                <label className="form-check">
                                                    <input className="form-check-input" type="radio" value={30} name="delivery" defaultChecked onChange={(e) => handleChange(e)} />
                                                    <b className="border-oncheck"></b>
                                                    <span className="form-check-label">
                                                        Normal delivery <br />
                                                        <small className="text-muted"> 7-10 days </small>
                                                    </span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row px-5">
                                        <div className="col-sm-8 mb-3">
                                            <label htmlFor="" className="form-label">Address</label>
                                            <input type="text" className="form-control" name='ShippingAddress' id='ShippingAddress' placeholder="Enter full address" />
                                            <small className=" text-danger" id='Err_ShippingAddress'></small>
                                        </div>

                                        {/* <div className="col-sm-4 mb-3">
                                                <label htmlFor="" className="form-label">City </label>
                                                <input type="text" className="form-control" name='city' placeholder="Enter city" />
                                                <small className="text-muted text-danger" id='Err_city'></small>
                                            </div>

                                            <div className="col-sm-4 mb-3">
                                                <label htmlFor="" className="form-label">House</label>
                                                <input type="text" className="form-control" name='house' placeholder="Flat No. / Floor no. / House name " />
                                                <small className="text-muted text-danger" id='Err_house'></small>
                                            </div>

                                            <div className="col-sm-4 col-6 mb-3">
                                                <label htmlFor="" className="form-label">Postal code</label>
                                                <input type="number" className="form-control" name='zip' maxLength={6} placeholder="789456" />
                                                <small className="text-muted text-danger" id='Err_zip'></small>
                                            </div> */}
                                    </div>
                                    <hr></hr>
                                    <h5 className="card-title"> Payment info </h5>
                                    <div className=" p-5 pt-2  rounded ">

                                        <div className="form-check border my-3 py-2 bg-light shadow rounded">
                                            <div className='d-flex justify-content-between '>
                                                <div>
                                                    <input className="form-check-input m-1" type="radio" name="payment" id="creditcard" value="creditcard"
                                                        onClick={() => { $(".paymentView").addClass("d-none"); $("#creditcarddiv").removeClass("d-none"); }} />
                                                    <label className="form-check-label " htmlFor="creditcard">
                                                        <span className='fw-bolder'>Credit Card</span>
                                                    </label>
                                                </div>
                                                <div className='d-flex gap-2 pe-5'>
                                                    <img className='p-1 border rounded me-auto' src="http://192.168.101.102/uploads/visa.svg" style={{ width: '45px', height: "25px" }} alt="" />
                                                    <img className='p-1 border rounded me-auto' src="http://192.168.101.102/uploads/Mastercard.svg" style={{ width: '45px', height: "25px" }} alt="" />
                                                    <img className='p-1 border rounded me-auto' src="http://192.168.101.102/uploads/Maestro.svg" style={{ width: '45px', height: "25px" }} alt="" />
                                                </div>
                                            </div>
                                            <div className='px-4 d-none paymentView' id="creditcarddiv">
                                                <hr></hr>
                                                <div className="form-outline mb-4 mt-1">
                                                    <label htmlFor="name">Name on card : </label>
                                                    <input id='Cname' className="form-control mt-2" />
                                                    <small id="errCname" className="">Full name as displayed on card </small>
                                                </div>

                                                <div className="form-outline  mb-4 mt-1">
                                                    <label htmlFor="Cnumber">Card Number : </label>
                                                    <div className="input-group ">
                                                        <input id='Cnumber' className="form-control" {...getCardNumberProps()} />
                                                        <span className="input-group-addon mx-2 p-0 bg-light" id="basic-addon2"> <svg className="input-group  rounded me-auto mt-1 m-1" style={{ width: '50px', height: "35px" }} {...getCardImageProps({ images })} /></span>
                                                    </div>
                                                    <small id='errCnumber' className='text-danger'>{erroredInputs.cardNumber && erroredInputs.cardNumber}</small>
                                                    {/* <div className='input-group'>
                                                      
                                                    </div> */}
                                                </div>


                                                <div className="multi-input  mb-4 mt-1 ">
                                                    <div>
                                                        <label htmlFor="expiredate" >Valid Till : </label>
                                                        <div className="input-group">
                                                            <input id='expireDate' name='expiredate' className="form-control mt-2"  {...getExpiryDateProps()} />
                                                        </div>
                                                        <small id='err_expiredate' className='text-danger'>{erroredInputs.expiryDate && erroredInputs.expiryDate}</small>
                                                    </div>
                                                    <div className='mt-2'>
                                                        <label htmlFor="cvv">CVV:</label>
                                                        <div className="input-group">
                                                            <input type='password' id='cvc' name='cvv' className="form-control mt-2" {...getCVCProps()} />
                                                        </div>
                                                        <small id='errCvv' className='text-danger'>{erroredInputs.cvc && erroredInputs.cvc}</small>
                                                    </div>
                                                </div>

                                                <div className="h-25 text-center" id="message">
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-check border my-3 py-2 bg-light shadow rounded">
                                            <div className='d-flex justify-content-between '>
                                                <div>
                                                    <input className="form-check-input m-1" type="radio" name="payment" id="debitcard" value="debitcard" onClick={() => { $(".paymentView").addClass("d-none"); $("#Debitcarddiv").removeClass("d-none") }} />
                                                    <label className="form-check-label " htmlFor="debitcard">
                                                        <span className='fw-bolder'>Debit Card</span>
                                                    </label>
                                                </div>
                                                <div className='d-flex gap-2 pe-5'>
                                                    <img className='p-1 border rounded me-auto' src="http://192.168.101.102/uploads/Mastercard.svg" style={{ width: '45px', height: "25px" }} alt="" />
                                                    <img className='p-1 border rounded me-auto' src="http://192.168.101.102/uploads/visa.svg" style={{ width: '45px', height: "25px" }} alt="" />
                                                    <img className='p-1 border rounded me-auto' src="http://192.168.101.102/uploads/Maestro.svg" style={{ width: '45px', height: "25px" }} alt="" />
                                                </div>
                                            </div>
                                            <div className='px-4 d-none paymentView' id="Debitcarddiv">
                                                <hr></hr>
                                                <div className="form-outline mb-4 mt-1">
                                                    <label htmlFor="name">Name on card : </label>
                                                    <input type="text" id="Dname" name='Dname' className="form-control mt-2" placeholder="Name on card" />
                                                    <small id="errDName" className="text-danger">Full name as displayed on card </small>
                                                </div>

                                                <div className="form-outline mb-4">
                                                    <label htmlFor="name">Card Number : </label>
                                                    <input type="number" id="Dnumber" name='Dnumber' className="form-control mt-2"
                                                        placeholder="Enter card number" />
                                                    <small id="errDNumber" className="text-danger"></small>
                                                </div>

                                                <div className="row">
                                                    <div className="col-6 form-outline mb-4">
                                                        <label htmlFor="name">Expiration : </label>
                                                        <input type="date" id="Dexpdate" name='expdate' className="form-control"
                                                            placeholder="Expire date " />
                                                        <small id="errDExpiration" className="text-danger"></small>
                                                    </div>

                                                    <div className="col-6 form-outline mb-4">
                                                        <label htmlFor="cvv">CVV : </label>
                                                        <input type="password" id="Dcvv" name='cvv' className="form-control" maxLength="3"
                                                            placeholder="cvv number " />
                                                        <small id="errDCvv" className="text-danger"></small>
                                                    </div>

                                                </div>
                                                <div className="h-25 text-center" id="message">
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-check border my-3 py-2 bg-light shadow rounded">
                                            <div className='d-flex justify-content-between '>
                                                <div>
                                                    <input className="form-check-input m-1" type="radio" name="payment" id="upi" value="upi" onClick={() => { $(".paymentView").addClass("d-none"); $("#upidiv").removeClass("d-none") }} defaultChecked />
                                                    <label className="form-check-label" htmlFor="upi">
                                                        <span className='fw-bolder'>UPI</span>
                                                    </label>
                                                </div>
                                                <div className='d-flex gap-2 pe-5'>
                                                    <img className='p-1 border rounded me-auto' src="http://192.168.101.102/uploads/PayPal.svg" style={{ width: '45px', height: "25px" }} alt="" />
                                                    <img className='p-1 border rounded me-auto' src="http://192.168.101.102/uploads/google-pay.svg" style={{ width: '45px', height: "25px" }} alt="" />
                                                </div>
                                            </div>
                                            <div className="px-3 paymentView" id="upidiv">
                                                <hr></hr>
                                                <div className="form-outline mb-4 ">
                                                    <label htmlFor="upiinput">UPI Id : </label>
                                                    <input type="text" id="upiinput" name='upiinput' className="form-control mt-2"
                                                        placeholder="UPI ID" />
                                                    <small id="errUpi" className="text-danger"></small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div >
                        <div className="col-3">
                            <CouponDiv />
                            <PriceSummary Buyproduct={Cartitems} delivery={delivery} handelSubmit={handelSubmit} />
                            <hr />
                            <div>
                                <span className='text-muted'>Items in cart</span>
                            </div>
                            <div className='overflow-auto py-2 my-2 scroller' style={{ height: '400px' }}>
                                {
                                    Cartitems.map((item, index) => {
                                        return (<SmallBuyProcuct items={item} keys={index} />)
                                    })
                                }
                            </div>
                        </div>
                    </div >
                </div >
            }
        </>
    )
}
