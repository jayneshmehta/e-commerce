import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import $ from 'jquery';
import axios from 'axios';
import env from "react-dotenv";
import FormInput from '../component/Forms/FormInput';
export default function Register() {
    const navigate = useNavigate();

    // async function verifyotp() {
    //     $(`#Err_otp`).text('');
    //     $(`#Err_email`).text('');
    //     var otp = $("#otp").val();
    //     var email = $("#email").val().trim();
    //     var baseURL = env.API_URL+'verifyOtp';
    //     var data = {
    //         email: email,
    //         otp: otp,
    //     }
    //     $("#msg").html(`<div class="spinner-border" role="status"><span className="sr-only"></span></div>`);
    //     await axios.post(baseURL, (data))
    //         .then(response => {
    //             $("#msg").html(`<p class='text-center text-success'>${response.data.message}</p>`)
    //             $("#register").removeAttr('disabled');
    //             $("#email").attr('disabled');
    //         }).catch(
    //             (error) => {
    //                 if (error.response.data.errors) {
    //                     var errors = error.response.data.errors;
    //                     for (let x in errors) {
    //                         $(`#Err_${x}`).text(errors[x]);
    //                     }
    //                 }
    //                 let message = error.response.data.message;
    //                 $("#msg").html(`<p class='text-center text-danger'>${message}</p>`)
    //             }
    //         )
    // }

    // async function sendotp() {
    //     var error = false;
    //     if ($('#name').val().trim() == "") {
    //         $("#Err_name").text("Name is required..");
    //         error = true;
    //     } else {
    //         $("#Err_name").text("");
    //     }
    //     if ($("#email").val().trim() == "") {
    //         $("#Err_email").text("Email is required..");
    //         error = true;
    //     } else {
    //         $("#Err_email").text("");
    //     }
    //     if (!error) {
    //         $("#msg").html(`<div class="spinner-border" role="status"><span class="sr-only"></span></div>`);
    //         var name = $("#name").val().trim()
    //         var email = $("#email").val().trim()
    //         var baseURL = env.API_URL+'sendmail';
    //         var data = {
    //             email: email,
    //             name: name,
    //         }
    //         await axios.post(baseURL, (data))
    //             .then(response => {
    //                 $("#otpverify").removeAttr(`hidden`);

    //                 $("#msg").html(`<p class='text-center text-success'>${response.data.message}</p>`)
    //                 $("#email").attr('readonly',true);
    //             }).catch(
    //                 (error) => {
    //                     let message = error.response.data.message;
    //                     $("#msg").html(`<p class='text-center text-danger'>${message}</p>`)
    //                 }
    //             )
    //     } else {
    //         return false;
    //     }
    // }

    async function register(e) {
        e.preventDefault();
        $(`small`).text('');
        var baseURL = env.API_URL+'register';
        if ($("#password").val() !== $("#confrim_password").val()) {
            $("#Err_Cpassword").text("Passward Doesn't match..");
        } else {
            var formdata = new FormData(e.target);
            let email = $('#email').val();
            formdata.append("email", email);
            $("#msg").html(`<div class="spinner-border" role="status"><span class="sr-only"></span></div>`);
            await axios.post(baseURL, formdata)
                .then(response => {
                    $("#msg").html(`<p class='text-center text-success'>${response.data.message}</p>`)
                    // sessionStorage.setItem("register", "Register Successfully");
                    // navigate("/login");
                }).catch(
                    (error) => {
                        $(`#Err_email`).text('');
                        $(`#Err_password`).text('');
                        if (error.response.data.errors) {
                            var errors = error.response.data.errors;
                            for (let x in errors) {
                                $(`#Err_${x}`).text(errors[x]);
                            }
                        }
                        let message = error.response.data.message;
                        $("#msg").html(`<p class='text-center text-danger'>${message}</p>`)
                    }
                )
        }
    }

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
                        <form method='post' id='registerForm' onSubmit={(e) => register(e)}>
                            <FormInput label={"Name  : "} placeholder={"Enter name"} name={"name"} type={'name'} id={'name'} />
                            <FormInput label={"Email : "} placeholder={"Enter email"} name={"email"} type={'email'} id={'email'} />
                            {/* <div className="mb-3 " id='otpverify' hidden>
                                <label className="form-label">Verify Email : </label>
                                <div className='row gx-0 m-0 p-0 input-group'>
                                    <input className="col-7 form-control" placeholder="Enter OTP" name='otp' id='otp' type="number" />
                                    <button type="button" name="verifyotp" id="verifyotp" className="col-4 btn btn-success" onClick={(e) => verifyotp(e)}>Verify otp </button>
                                </div>
                                <small id="Err_otp" className="text-danger form-text "></small>
                            </div> */}
                            <FormInput label={"Phone : "} placeholder={"Enter Phone"} name={"contactNo"} type={'number'} id={'contactNo'} />
                            <FormInput label={"Create password : "} placeholder={"At least 6 characters."} name={"password"} type={'password'} id={'password'} />
                            <FormInput label={"Confrim password : "} placeholder={"Confrim password"} name={"Cpassword"} type={'text'} id={'confrim_password'} />
                            <div className="mb-4">
                                <button type="submit" className="btn btn-primary w-100 " id='register' > Register </button>
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
