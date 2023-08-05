import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';

export default function PriceSummary({ Buyproduct, delivery, handelSubmit }) {

    var Subtotal = 0;
    var lastprice = 0;
    var Discount = 0;
    var Shipping = delivery ? parseInt(delivery) : 30;
    Buyproduct.map((items) => {
        if (!items.quantity) {
            items.quantity = 1
        }
        Subtotal += parseInt(items.quantity) * parseInt(items.price - ((items.price * items.discountPercentage) / 100))
        lastprice += parseInt(items.quantity) * parseInt(items.price)
        Discount += lastprice - Subtotal;
    })
    var Tax = 14

    var Total = Subtotal + Tax + Shipping;
    setTimeout(() => {
        if (Subtotal != 0) {
            Total = Subtotal + Tax + Shipping;
        }
    }, 1000);
    const handelClick = () => {
        sessionStorage.setItem('cart', JSON.stringify(Buyproduct));
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
                </dl>
                <hr />
                <dl className="row">
                    <dt className="col-7 h5 text-muted">Total:</dt>
                    <dd className="col-5 h5 text-end"> ${(Subtotal != 0) ? Total : 0}</dd>
                </dl>

                <div className="my-3">
                    {
                        (!handelSubmit)
                        ?(<Link to={'/payment'} onClick={() => { handelClick() }} className="btn btn-lg p-3 btn-success w-100"> Make Payment </Link>)
                        :(<button onClick={() => {handelSubmit()}} className="btn btn-lg p-3 btn-success w-100"> Checkout </button>)
                    }
                </div>
                <p className="text-center mt-3">
                    <img src="	https://bootstrap-ecommerce-web.netlify.app/images/misc/payments.png" height="24" />
                </p>
            </div>
        </div>
    )
}
