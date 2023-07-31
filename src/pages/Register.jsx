import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import $ from 'jquery';
import axios from 'axios';
export default function Register() {
    const navigate = useNavigate();



    $(document).on("submit","#registerForm",async function (e) {
        e.preventDefault();
        $(`#Err_email`).text('');
        $(`#Err_password`).text('');
        $(`#Err_name`).text('');
        $(`#Err_contactNo`).text('');
        $("#Err_Cpassword").text("");
        console.log('pass = ' + $("#password").val());
        console.log('Cpass = ' + $("#confrim_password").val());
        var baseURL = 'http://product_api.localhost/api/register';
        if ($("#password").val() !== $("#confrim_password").val()) {
            $("#Err_Cpassword").text("Passward Doesn't match..");
        } else {
            var formdata = new FormData(e.target);
            $("#msg").html(`<div class="spinner-border" role="status"><span class="sr-only"></span></div>`);
            await axios.post(baseURL, formdata)
                .then(response => {
                    sessionStorage.setItem("user", JSON.stringify(response.data.user));
                    $("#msg").html(`<p className='text-center text-success'>${response.data.message}</p>`)
                    sessionStorage.setItem("register", "Register Successfully");
                    navigate("/login");
                }).catch(
                    (error) => {
                        $(`#Err_email`).text('');
                        $(`#Err_password`).text('');
                        var errors = error.response.data.errors;
                        for (let x in errors) {
                            $(`#Err_${x}`).text(errors[x]);
                        }
                        let message = error.response.data.message;
                        $("#msg").html(`<p class='text-center text-danger'>${message}</p>`)
                    }
                )
        }
    })


    return (
        <div className="container mt-5">
            <div className="row d-flex align-items-center justify-content-center h-100">
                <div className="col-md-8 col-lg-7 col-xl-6">
                    <img src="https://cdni.iconscout.com/illustration/premium/thumb/sign-up-8044448-6430849.png?f=webp"
                        className="img-fluid" alt="Phone image" />
                </div>
                <div className="card shadow mx-auto" style={{ maxWidth: '500px' }}>
                    <div className="card-body">
                        <h4 className="card-title mb-4">Sign in</h4>
                        <form method='post' id='registerForm'>
                            <div className="row gx-2">
                                <label className="form-label">Name : </label>
                                <input type="text" className="form-control" name="name" />
                                <small id="Err_name" className="text-danger form-text "></small>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email : </label>
                                <input className="form-control" placeholder="Enter email" name='email' type="email" />
                                <small id="Err_email" className="text-danger form-text "></small>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Phone </label>
                                <div className="row gx-2">
                                    <input className="form-control" name='contactNo' placeholder="Phone" type="number" /> </div>
                                <small id="Err_contactNo" className="text-danger form-text "></small>

                            </div>
                            <div className="mb-3">
                                <label className="form-label">Create password</label>
                                <input className="form-control" placeholder="At least 6 characters." name='password' id='password' type="password" />
                                <small id="Err_password" className="text-danger form-text "></small>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Confrim password</label>
                                <input className="form-control" id='confrim_password' placeholder="" type="password" />
                                <small id="Err_Cpassword" className="text-danger form-text "></small>
                            </div>
                            <div className="mb-4">
                                <button type="submit" className="btn btn-primary w-100"> Register </button>
                            </div>
                            <div className='text-center d-flex justify-content-center mt-2' id='msg'>
                            </div>
                        </form>
                        <hr />
                        <p className="text-center mb-2">Already have account? <Link to='/login'>Login in</Link></p>

                    </div>
                </div>

                <br /><br />

            </div>
        </div>
    )
}
