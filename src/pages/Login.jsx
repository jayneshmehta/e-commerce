import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import $ from 'jquery';
import axios from 'axios';
import Swal from 'sweetalert2';
import FormInput from '../component/Forms/FormInput';

export default function Login({ setLoggedIn }) {

    const [Passwordchanged, setPasswordchanged] = useState(false)

    const navigate = useNavigate();
    if (sessionStorage.getItem('register')) {
        Swal.fire({
            title: 'Register',
            type: 'success',
            icon: 'success',
            text: sessionStorage.getItem('register'),
        });
        sessionStorage.removeItem('register')
    }
    useEffect(() => {
        if (sessionStorage.getItem('fpassword')) {
            Swal.fire({
                title: 'Forget password',
                type: 'success',
                icon: 'success',
                text: sessionStorage.getItem('fpassword'),
            });
            sessionStorage.removeItem('fpassword')
        }
    }, [Passwordchanged])
    const loginform = async function (e) {
        e.preventDefault();
        var baseURL = 'http://192.168.101.102/api/login';
        var formdata = new FormData(e.target);
        $("#msg").html(`<div class="spinner-border" role="status"><span class="sr-only"></span></div>`);
        await axios.post(baseURL, formdata)
            .then(response => {
                $(`#Err_email`).text('');
                $(`#Err_password`).text('');
                sessionStorage.setItem("user", JSON.stringify(response.data.user));
                setLoggedIn(sessionStorage.getItem('user'))
                sessionStorage.setItem("wishlist", JSON.stringify(response.data.wishlist));
                sessionStorage.setItem("login", "Login Successfull :) ");
                $("#msg").html(`<p class='text-center text-success'>${response.data.message}</p>`)
                navigate("/");
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

    const changePassword = async (e) => {
        e.preventDefault();
        var error = false;
        $("#Err_Cpassword").text("");
        $("#Err_fpassword").text("");
        if ($("#confrim_password").val() == "") {
            $("#Err_Cpassword").text("This field is require");
            error = true;
        }

        var fpassword = $("#fpassword").val();
        var confrim_password = $("#confrim_password").val();

        var contactNo = $("#contactNo").val();
        if (!error) {
            if (fpassword !== confrim_password) {
                $("#Err_Cpassword").text("Passward Doesn't match..");
            } else {
                $("#fmsg").html(`<div class="spinner-border" role="status"><span class="sr-only"></span></div>`);
                let data = {
                    fpassword: fpassword,
                    contactNo: contactNo,
                }
                var baseURL = 'http://192.168.101.102/api/changePassword';
                await axios.post(baseURL, (data))
                    .then(response => {
                        let message = response.data.message;
                        $("#fmsg").html(`<p class='text-center text-success'>${message}</p>`)
                        sessionStorage.setItem('fpassword', "password has been changed pls login & check..");
                        setPasswordchanged(true);
                        $("#closemodal").trigger("click");
                    }).catch(
                        (error) => {
                            console.log(error);
                            if (error.response.data.errors) {
                                var errors = error.response.data.errors;
                                for (let x in errors) {
                                    $(`#Err_f${x}`).text(errors[x]);
                                }
                            }
                            let message = error.response.data.message;
                            $("#fmsg").html(`<p class='text-center text-danger'>${message}</p>`)
                        }
                    )
            }

        }
    }
    async function verifyOtp() {
        $("#sendotp").attr("disabled", true);
        $("#contactNo").attr("disabled", true);

        var otp = $("#otp").val();
        var contactNo = $("#contactNo").val();
        $("#fmsg").html(`<div class="spinner-border" role="status"><span class="sr-only"></span></div>`);
        let data = {
            otp: otp,
            contactNo: contactNo
        }
        var baseURL = 'http://192.168.101.102/api/verifysmsotp';
        await axios.post(baseURL, (data))
            .then(response => {
                let message = response.data.message;
                $("#fmsg").html(`<p class='text-center text-success'>${message}</p>`)
                $("#otp").attr("disabled", true);
                $("#verifyotp").attr("disabled", true);
                $("#newpasswordDetails").removeAttr("hidden");
            }).catch(
                (error) => {
                    if (error.response.data.errors) {
                        var errors = error.response.data.errors;
                        for (let x in errors) {
                            $(`#Err_${x}`).text(errors[x]);
                        }
                    }
                    let message = error.response.data.message;
                    $("#fmsg").html(`<p class='text-center text-danger'>${message}</p>`)
                }
            )
    }

    async function sendsmsotp() {
        $(`#Err_contactNo`).text('');
        var baseURL = 'http://192.168.101.102/api/sendsmsotp';
        var contactNo = $("#contactNo").val();
        var data = {
            contactNo: contactNo,
        }
        $("#fmsg").html(`<div class="spinner-border" role="status"><span class="sr-only"></span></div>`);
        await axios.post(baseURL, data)
            .then(response => {
                $("#verifyOtp").removeAttr('hidden')
                $("#fmsg").html(`<p class='text-center text-success'>${response.data.message}</p>`)
            }).catch(
                (error) => {
                    if (error.response.data.errors) {
                        var errors = error.response.data.errors;
                        for (let x in errors) {
                            $(`#Err_${x}`).text(errors[x]);
                        }
                    }
                    let message = error.response.data.message;
                    $("#fmsg").html(`<p class='text-center text-danger'>${message}</p>`)
                }
            )
    }

    return (
        <div className="container">
            <div className="container py-5 h-100">
                <div className="row d-flex align-items-center justify-content-center h-100">

                    <div className="col-md-8 col-lg-7 col-xl-6">
                        <img src="https://img.freepik.com/premium-vector/register-access-login-password-internet-online-website-concept-flat-illustration_385073-108.jpg"
                            className="img-fluid" alt="Phone image" />
                    </div>
                    <div className="card p-3  shadow col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                        <h2 className='text-dark'>Login : </h2>
                        <form className='pt-3 py-5' id='loginform' method='POST' onSubmit={(e) => loginform(e)}>
                            <FormInput label={"Email address : "} placeholder={"Enter email"} name={"email"} type={'email'} id={'email'} />

                            <FormInput label={"Password : "} placeholder={"Enter password"} name={"password"} type={'password'} id={'password'} />

                            <div className="d-flex justify-content-around align-items-center mb-4">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="checked" />
                                    <label className="form-check-label" htmlFor="checked"> Remember me </label>
                                </div>
                                <button type='button' className="btn " data-bs-toggle="modal" data-bs-target="#exampleModal">Forgot password?</button>
                            </div>
                            <div className='row justify-content-center '>
                                <button type="submit" className="col-6 btn btn-primary btn-lg btn-block">Sign in</button>
                                <p className="small fw-bold mt-2 pt-1 mb-0 text-center mt-3">Don't have an account? <Link to={'/register'}
                                    className="link-danger">Register</Link></p>
                            </div>
                            <div className='text-center d-flex justify-content-center mt-2' id='msg'>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Forget password</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form action="" onSubmit={changePassword}>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label">Contact No : </label>
                                    <div className="row gx-0 m-0 p-0 input-group">
                                        <input className="col-7 form-control" placeholder="Contact No" name="contactNo" id="contactNo" type="number" />
                                        <button type="button" name="sendotp" id="sendotp" className="col-4 btn btn-primary" onClick={() => sendsmsotp()} >Send otp </button>
                                    </div>
                                    <small id="Err_contactNo" className="text-danger form-text"></small>
                                </div>
                                <div className='' id='verifyOtp' hidden>
                                    <div className="mb-3 " id='otpverify' >
                                        <label className="form-label">Verify user : </label>
                                        <div className='row gx-0 m-0 p-0 input-group'>
                                            <input className="col-7 form-control" placeholder="Enter OTP" name='otp' id='otp' type="number" />
                                            <button type="button" name="verifyotp" id="verifyotp" className="col-4 btn btn-success" onClick={() => verifyOtp()} >Verify otp </button>
                                        </div>
                                        <small id="Err_otp" className="text-danger form-text"></small>
                                    </div>
                                </div>
                                <div className='' id='newpasswordDetails' hidden>
                                    <div className="mb-3">
                                        <label className="form-label">New password</label>
                                        <input className="form-control" placeholder="At least 6 characters." name='fpassword' id='fpassword' type="password" />
                                        <small id="Err_fpassword" className="text-danger form-text "></small>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Confrim password</label>
                                        <input className="form-control" id='confrim_password' placeholder="" type="password" />
                                        <small id="Err_Cpassword" className="text-danger form-text "></small>
                                    </div>
                                </div>
                                <div className='text-center d-flex justify-content-center mt-2' id='fmsg'></div>

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" id='closemodal' data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary">Save changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
