import axios from 'axios';
import React from 'react';
import $ from 'jquery';

export default function CouponDiv({ setcoupon }) {
    const checkCoupon = async (e) => {
        e.preventDefault();
        let formdata = new FormData(e.target);
        $("#Err_coupon").html(`<div class="spinner-border text-center" role="status"><span class="sr-only"></span></div>`);
        var name = $("#name").val();
        if (name == "") {
            $("#Err_coupon").html(`<p class='text-center text-danger'>Enter a coupon Code.. </p>`)
        } else {
            var token = JSON.parse(sessionStorage.getItem("token"));
            const config = { headers: { 'Authorization': 'Bearer ' + token } };
            let baseURL = `http://192.168.101.102/api/getCouponsByName-${name}`;
            await axios.get(baseURL,config)
                .then(response => {
                    if ((response.data.status)) {
                        $("#Err_coupon").html(`<p class='text-center text-success'>${response.data.message}</p>`);
                        setcoupon(parseInt(response.data.discount));
                    } else {
                        setcoupon(0);
                        $("#Err_coupon").html(`<p class='text-center text-danger'>${response.data.message}</p>`);
                    }
                }).catch(
                    (error) => {
                        if (error.response.data.errors) {
                            var errors = error.response.data.errors;
                            for (let x in errors) {
                                $(`#Err_${x}`).text(errors[x]);
                            }
                        }

                        let message = error.response.data.message;
                        $("#Err_coupon").html(`<p class='text-center text-danger'>${message}</p>`)
                    }
                )
        }
    }
    return (
        <div className="card p-3 mb-3">

            <div>
                <label className="form-label">Have coupon?</label>
                <form onSubmit={checkCoupon}>
                    <div className="input-group">
                        <input type="text" className="form-control" id='name' name="name" placeholder="Add coupon" />
                        <button className="btn btn-light" type='submit'>Apply</button>
                    </div>
                    <div id='Err_coupon' className='row justify-content-center mt-2'></div>
                </form>
            </div>
        </div>
    )
}
