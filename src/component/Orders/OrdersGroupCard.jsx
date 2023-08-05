import axios from 'axios';
import React, { useEffect, useState } from 'react'
import SmallBuyProcuct from '../Payment/SmallBuyProcuct';
import $ from 'jquery';

export default function OrdersGroupCard({ groupId, key }) {
    const [ordersByGroup, setordersByGroup] = useState([]);

    const [data, setdata] = useState({
        status: '',
        shipping: 0,
        created_at: 0,
        address: "",
        total_amount: 0,
        payment: '',
    });

    async function getOrders() {
        try {
            var baseURL = `http://192.168.101.102/api/getOrdersBygroupId-${groupId}`;
            await axios.get(baseURL)
                .then(response => {
                    var total = 0;
                    setordersByGroup(response.data);
                    total += parseInt(response.data.map((items) => { return items.TotalAmount }));
                    setdata({
                        status: response.data[0]?.status,
                        shipping: (response.data[0]?.shippingType == "Normal") ? 30 : ((response.data[0]?.shippingType == "Express") ? 90 : 120),
                        created_at: response.data[0]?.orderedDate,
                        address: response.data[0]?.ShippingAddress,
                        total_amount: total,
                        payment: response.data[0]?.paymentType,
                    });
                }).catch(
                    (error) => {
                        let message = error.response.data.message;
                    }
                )
        } catch (err) {

        }
    }
    useEffect(() => {
        getOrders();
    }, []);

    const Openmodel = (id) => {

        $("#trackOrderModel").click();
        $("#orderId").html(groupId);
        $("#orderstatus").html('');
        $("#orderstatus").html('');

        var date = new Date(data.created_at);

        var maxTime  = (data.shipping == 30)?12:(data.shipping == 60)?6:3
        var status = 0;
        switch (data.status) {
            case 'In process':
                date.setDate(date.getDate() + maxTime-0);
                var deleveryDate = date.toLocaleString('en-us', { day: '2-digit', month: 'short', year: 'numeric' })
                status = 0;
                break;

            case 'Pending':
                status = 0;
                date.setDate(date.getDate() + maxTime-1);
                var deleveryDate = date.toLocaleString('en-us', { day: '2-digit', month: 'short', year: 'numeric' })
                break;

            case 'Ready for dispatch':
                status = 1;
                date.setDate(date.getDate() + maxTime-1);
                var deleveryDate = date.toLocaleString('en-us', { day: '2-digit', month: 'short', year: 'numeric' })
                break;

            case 'Dispatched':
                status = 1;
                var deleveryDate = "Arriving tommorow"
                break;

            case 'Out for Delivery':
                status = 2;
                var deleveryDate = 'Arriving today';
                break;

            case 'Delivered':
                status = 3;
                var deleveryDate = 'Delivered';
                break;

            default:
                break;
        }
        $("#deleveryState").html(deleveryDate);

        let i = 0;
        $('.step0').removeClass("active");
        $('.step1').removeClass("active");
        $('.step2').removeClass("active");
        $('.step3').removeClass("active");

        while (i <= status) {
            $(`.step${i}`).addClass("active");
            i++;
        }
    }
    return (
        <div className="card border-primary mb-4">
            <div className="card-body">
                <header className="d-lg-flex">
                    <div className="flex-grow-1">
                        <h6 className="mb-0">Order ID: {groupId} <i className="dot"></i>
                            <span className="text-warning"> {data.status}</span>
                        </h6>
                        <span className="text-muted">Date: {data.created_at}</span>
                    </div>
                    <div className='gap-2'>
                        <a href="#" className="btn me-2 btn-outline-danger">Cancel order</a>
                        <button className=" btn btn-primary" onClick={() => Openmodel(groupId)}> Track order</button>
                    </div>
                </header>
                <hr />
                <div className="row gx-0">
                    <div className="row gx-0 p-2">
                        <div className="col-lg-6 px-2 ">
                            <p className="mb-0 text-muted">Shipping address</p>
                            <p className="m-0"> {data.address} </p>
                        </div>
                        <div className="col-lg-4 px-2  border-start">
                            <p className="mb-0 text-muted">Payment</p>
                            <p className="m-0">
                                <span className="text-success"> {data.payment}  </span> <br />
                                Shipping fee: ${data.shipping} <br />
                                Total paid:  ${data.total_amount}
                            </p>
                        </div>
                    </div>
                    <hr />
                    <ul className="row  d-flex flex-wrap">
                        {
                            ordersByGroup.map((item, index) => {
                                return (
                                    <div className='col-4' key={index}>
                                        <SmallBuyProcuct items={item} keys={index} />
                                    </div>)
                            })
                        }
                    </ul>
                </div>
            </div>

        </div>
    )
}
