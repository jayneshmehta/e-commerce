import React from 'react';
import $ from 'jquery';
import axios from 'axios';
import env from "react-dotenv";
import Swal from 'sweetalert2';
import { imagesPreview } from '../AllStates';

export default function AddUsers() {
    const Addusers = async (e) => {
        e.preventDefault();
        $("#message").html(`<div class="spinner-border" role="status"><span class="sr-only"></span></div>`);
        $("small").text("");
        var data = new FormData(e.target);
        const BaseUrl = "http://192.168.101.102/api/adduser";
        await axios.post(BaseUrl, data)
            .then((response) => {
                let message = response.data.message;
                Swal.fire({
                    title: 'New User..',
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
                <div className="col-9 mt-5 border border-3 border-primary p-5 pt-2 bg-light rounded ">
                    <div className="row justify-content-center fs-3 text-primary mb-4">
                        -: Add User :-
                    </div>
                    <form action="" method="post" encType="multipart/form-data" id="adduser" onSubmit={(e) => Addusers(e)}>

                        <div className="row justify-content-center">
                            <div className="col-3 p-2 d-flex justify-content-center mb-4" width='200px' height="150px" >
                                <img id="prevprofile" style={{ objectFit: 'cover' }} className="img-flud border border-3 border-primary rounded p-2" width='160px' height="170px" src="https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/boy-eyeglasses-icon.svg"
                                    alt="" />
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-6 mb-4">

                                <div className="form-outline mb-4">
                                    <label htmlFor="profile">Profile Pic : </label>
                                    <input type="file" id="profile" name='profile' className="form-control" accept="image/jpe,image/jpeg,image/png,image/webp" placeholder="profile" onChange={(e) => imagesPreview(e.target, '#prevprofile',"src")} />
                                    <small id="errprofile" className="text-danger"></small>
                                </div>
                            </div>
                        </div>



                        <div className="form-outline mb-4">
                            <label htmlFor="name">Name : </label>
                            <input type="name" id="name" name='name' className="form-control" placeholder="Name" />
                            <small id="errname" className="text-danger"></small>
                        </div>



                        <div className="form-outline mb-4">
                            <label htmlFor="contact">Contact no : </label>
                            <input type="tel" maxLength="10" id="contactNo" name='contactNo' className="form-control"
                                placeholder="contact" />
                            <small id="errcontactNo" className="text-danger"></small>
                        </div>


                        <div className="form-outline mb-4">
                            <label htmlFor="address">Address : </label>
                            <textarea type="address" id="address" name='address' className="form-control"
                                placeholder="Address.."></textarea>
                            <small id="erraddress" className="text-danger"></small>
                        </div>


                        <div className="form-outline mb-4">
                            <label htmlFor="email">Email : </label>
                            <input type="email" id="email" name='email' className="form-control" placeholder="email" />
                            <small id="erremail" className="text-danger"></small>
                        </div>


                        <div className="form-outline mb-4">
                            <label htmlFor="password">Password : </label>
                            <input type="password" id="password" name='password' className="form-control" placeholder="Password" />
                            <small id="errpassword" className="text-danger"></small>
                        </div>


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
