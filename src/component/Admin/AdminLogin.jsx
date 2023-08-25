import React from 'react'
import FormInput from '../Forms/FormInput'
import $ from 'jquery'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { IS_ADMINLOGIN } from '../../ReduxStore/Action';
import store from '../../ReduxStore/Store';

export default function AdminLogin() {
    const navigate = useNavigate();
    const loginform = async function (e) {
        e.preventDefault();
        var baseURL = 'http://192.168.101.102/api/admin/login';
        var formdata = new FormData(e.target);
        $("#msg").html(`<div class="spinner-border" role="status"><span class="sr-only"></span></div>`);
        await axios.post(baseURL, formdata)
            .then(response => {
                $(`#Err_email`).text('');
                $(`#Err_password`).text('');
                sessionStorage.setItem("admin", JSON.stringify(response.data.user));
                sessionStorage.setItem("token", JSON.stringify(response.data.token));
                $("#msg").html(`<p class='text-center text-success'>${response.data.message}</p>`)
                store.dispatch({ type: IS_ADMINLOGIN, payload: true })
                navigate("/admin");
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
    return (
        <div className="container py-5 h-100">
            <div className="row d-flex align-items-center justify-content-center h-100">

                <div className="col-md-8 col-lg-7 col-xl-6">
                    <img src="https://img.freepik.com/premium-vector/admin-login-concept-icon_106317-32963.jpg?w=2000"
                        className="img-fluid" alt="Phone image" />
                </div>
                <div className="card p-3  shadow col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                    <h2 className='text-dark'>Login : </h2>
                    <form className='pt-3 py-5' id='loginform' method='POST' onSubmit={(e)=>loginform(e)}>
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
                        </div>
                        <div className='text-center d-flex justify-content-center mt-2' id='msg'>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
