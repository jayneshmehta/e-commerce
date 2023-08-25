import React, { useEffect, useState } from 'react'
import FormInput from '../../Forms/FormInput'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import $ from 'jquery';
import Swal from 'sweetalert2';

export default function Updatecoupon() {
    const location = useLocation()
    const coupon_id = location.state;
    const [coupon, setCoupon] = useState([]);
    var token = JSON.parse(sessionStorage.getItem("token"));
    const config = { headers: { 'Authorization': 'Bearer ' + token } };
    useEffect(() => {
        let Baseurl = `http://192.168.101.102/api/GettingCouponById-${coupon_id}`;
        axios.get(Baseurl,config).then(async (responce) => {
            setCoupon(responce.data);
        });
    }, [])

    const UpdateCoupons = async (e) => {
        e.preventDefault();
        $("#message").html(`<div class="spinner-border" role="status"><span class="sr-only"></span></div>`);
        $("small").text("");
        var data = new FormData(e.target);
       
        const BaseUrl = `http://192.168.101.102/api/UpdateCouponbyid-${coupon_id}`;
        await axios.post(BaseUrl, data,config)
            .then((response) => {
                let message = response.data.message;
                Swal.fire({
                    title: 'User Updated..',
                    type: 'success',
                    icon: 'success',
                    text: `${message}`,
                });
                $("#message").html(`<p class='text-center text-success'>${message}</p>`)
            })
            .catch((error) => {
                if (error.response.data.errors) {
                    var errors = error.response.data.errors;
                    for (let x in errors) {
                        $(`#err${x}`).text(errors[x]);
                    }
                }
                let message = error.response.data.message;
                $("#message").html(`<p class='text-center text-danger'>${message}</p>`)
            })
    }
    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-6 mt-5 shadow p-5 pt-2 bg-light rounded ">
                    <div className="row justify-content-center fs-3 text-primary mb-4">
                        -: update Coupons :-
                    </div>
                    <form action="" method="post" encType="multipart/form-data" id="addcoupons" onSubmit={(e) => UpdateCoupons(e)}>

                        <FormInput defaultValue={coupon.name} label={"Name : "} id={"name"} type={"text"} name={'name'} placeholder={'enter Coupon code..'} />

                        <FormInput defaultValue={coupon.discountPercentage} label={"Discount Percentage : "} id={"discountPercentage"} type={"text"} name={'discountPercentage'} placeholder={'enter discountPercentage'} />

                        <FormInput defaultValue={coupon.ExpireDate} label={"Expire Date : "} id={"ExpireDate"} type={"date"} name={'ExpireDate'} placeholder={'enter Expire data'} />

                        <div className="row justify-content-center">
                            <div className="col-4 d-flex justify-content-center">
                                <button type="submit" id="add" className="btn btn-primary w-100" tabIndex="4">Submit</button>
                            </div>
                        </div>

                        <div className="h-25 text-center text-danger mt-3" id="message">
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}
