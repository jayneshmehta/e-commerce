import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function PriceSummary({ coupon, Buyproduct, delivery, handelSubmit, loggedIn }) {
    var Subtotal = 0;
    var lastprice = 0;
    var Discount = 0;
    var Shipping = delivery ? parseInt(delivery) : 30;
    var CoupanDiscount = coupon ? parseInt(coupon) : 0;
    const navigate = useNavigate();
    Buyproduct.map((items) => {
        if (!items.quantity) {
            items.quantity = 1
        }
        lastprice += parseInt(items.quantity) * parseInt(items.price)
        Subtotal += parseInt(items.quantity) * parseInt(items.price - ((items.price * items.discountPercentage) / 100))
        Discount += lastprice - Subtotal;
    })
    var Tax = 14
    const [Total, setTotal] = useState(Subtotal + Shipping)
    useEffect(() => {
        setTimeout(() => {

            if (Subtotal != 0) {
                setTotal(Subtotal + Shipping);
                (CoupanDiscount != 0) &&
                    setTotal(parseFloat((Subtotal + Shipping) - ((Subtotal + Shipping) * CoupanDiscount) / 100).toFixed(2));

            }
        }, 600);
    }, [coupon, Buyproduct, Shipping])
    const handelClick = () => {
        sessionStorage.setItem('cart', JSON.stringify(Buyproduct));
        (loggedIn) ?
            navigate('/payment') 
            :Swal.fire({
                title: 'Login..',
                type: 'error',
                icon: 'error',
                text: 'Please Login First...',
            });
    }
    return (
        <div className="card shadow-lg">
            <div className="card-body">
                <dl className="row">
                    <dt className="col-7 fw-normal text-muted">Subtotal: </dt>
                    <dd className="col-5 text-end">${lastprice}</dd>

                    <dt className="col-7 fw-normal text-muted">Discount:</dt>
                    <dd className="col-5 text-end">- ${(Subtotal != 0) ? Discount : "0"}</dd>

                    <dt className="col-7 fw-normal text-muted">Tax:</dt>
                    <dd className="col-5 text-end">+ ${(Subtotal != 0) ? Tax : "0"} </dd>

                    <dt className="col-7 fw-normal text-muted">Shipping:</dt>
                    <dd className="col-5 text-end">+ ${(Subtotal != 0) ? Shipping : 0} </dd>

                    <dt className="col-7 fw-normal text-muted">Coupon discount:</dt>
                    <dd className="col-5 text-end"> {(coupon) ? "- " + coupon + "%" : 0} </dd>
                </dl>
                <hr />
                <dl className="row">
                    <dt className="col-7 h5 text-muted">Total:</dt>
                    <dd className="col-5 h5 text-end"> ${(Subtotal != 0) ? Total : 0}</dd>
                </dl>

                <div className="my-3">
                    {
                        (!handelSubmit)
                            ? (<button to={'/payment'} onClick={() => { handelClick() }} className="btn btn-lg p-3 btn-success w-100"> Make Payment </button>)
                            : (<button onClick={() => { handelSubmit() }} className="btn btn-lg p-3 btn-success w-100"> Checkout </button>)
                    }
                </div>
                <p className="text-center mt-3">
                    <img src="	https://bootstrap-ecommerce-web.netlify.app/images/misc/payments.png" height="24" />
                </p>
            </div>
        </div>
    )
}
