import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import $ from 'jquery';
import axios from 'axios';
import Swal from 'sweetalert2';


export default function Login({setLoggedIn}) {

    const navigate = useNavigate();
    if(sessionStorage.getItem('register')){
        Swal.fire({
            title: 'Register',
            type: 'success',
            icon: 'success',  
            text: sessionStorage.getItem('register'),
        });
        sessionStorage.removeItem('register')
    }
    $(document).on("submit","#loginform",async function (e) {
        e.preventDefault();
        var baseURL = 'http://product_api.localhost/api/login';
        var formdata = new FormData(e.target);
        $("#msg").html(`<div class="spinner-border" role="status"><span class="sr-only"></span></div>`);
        await axios.post(baseURL, formdata)
            .then(response => {
                $(`#Err_email`).text('');
                $(`#Err_password`).text('');
                sessionStorage.setItem("user", JSON.stringify(response.data.user));
                sessionStorage.setItem("login", "Login Successfull :) ");
                $("#msg").html(`<p class='text-center text-success'>${response.data.message}</p>`)
                setLoggedIn(sessionStorage.getItem('user'))
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
    })

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
                        <form className='pt-3 py-5' id='loginform' method='POST'>
                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="email">Email address : </label>
                                <input type="email" id="email" name='email' className="form-control form-control-xl" placeholder='Email' />
                                <small id="Err_email" className="form-text text-danger"></small>
                            </div>

                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="password">Password : </label>
                                <input type="password" id="password" name='password' className="form-control form-control-xl" placeholder='Password' />
                                <small id="Err_password" className="form-text text-danger"></small>
                            </div>

                            <div className="d-flex justify-content-around align-items-center mb-4">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="checked" />
                                    <label className="form-check-label" htmlFor="checked"> Remember me </label>
                                </div>
                                <a href="#!">Forgot password?</a>
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
        </div>
    )
}
