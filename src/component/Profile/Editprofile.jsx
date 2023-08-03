import React from 'react';
import $ from 'jquery';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


export default function Editprofile({ userdata,setUserdata }) {
    
    var profile = (userdata.profile == null) ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThxpx8l6QoJJO1-jbWEyJikEZblAfQutrYbzwPMZHCNA&s" : userdata.profile;
    const navigate = useNavigate();
    async function edit(e) {
        e.preventDefault();
        $("small").text("");
        var data = new FormData(e.target);
        var baseURL = `http://product_api.localhost/api/UpdateUserbyid-${userdata.id}`;
        await axios.post(baseURL, data)
            .then(response => {
                setUserdata(response.data.user);
                sessionStorage.setItem("user",JSON.stringify(response.data.user));
                $("#msg").html(`<p class='text-center text-success'>${response.data.message}</p>`)
                Swal.fire({
                    title: 'Updated',
                    type: 'success',
                    icon: 'success',
                    text: 'You Profile is updated successfully..',
                  });
            }).catch(
                (error) => {
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
    $(function () {
        // Multiple images preview in browser
        var imagesPreview = function (input, placeToInsertImagePreview) {
    
            if (input.files) {
                var filesAmount = input.files.length;
    
                $(placeToInsertImagePreview).html(``);
                for (let i = 0; i < filesAmount; i++) {
                    var reader = new FileReader();
                    reader.onload = function (event) {
                        $(placeToInsertImagePreview).attr({ 'src': `${event.target.result}` });
                    }
                    reader.readAsDataURL(input.files[i]);
                }
            }
        };
        $(document).on('change', "#profile", function () {
            imagesPreview(this, '#imgsrc');
        });
    
    });


    return (
        <div>
            <div className="card">
                <div className="card-body">
                    <h5>Edir profile : </h5>
                    <div className="card border-0">
                        <div className="card-body">
                            <form action="" encType='multipart/form-data' onSubmit={(e) => edit(e)}>
                                <div className="row justify-content-center">

                                    <div className=" col-3 mb-3 border border-2 rounded p-2 d-flex flex-column align-items-center">
                                        <img className='p-2 col-3 rounded' id='imgsrc' style={{ width: "180px", height: "150px" }} src={profile} alt="" />
                                        <input type="file"
                                            className="col-2 mt-2 form-control" name="profile" id="profile" aria-describedby="helpId" placeholder="" />
                                        <small id="helpId" className="form-text text-muted"></small>
                                    </div>
                                </div>
                                <div className='row d-flex align-items-center flex-column'>
                                    <div className="col-3 mb-3">
                                        {/* <label htmlFor="" className="form-label">Profile pic</label> */}
                                    </div>
                                    <div className="col-8 mb-3">
                                        <label htmlFor="name" className="form-label">Name</label>
                                        <input type="name"
                                            className="form-control" name="name" id="name" defaultValue={userdata.name} aria-describedby="Err_name" placeholder="Enter name" />
                                        <small id="Err_name" className="form-text text-muted"></small>
                                    </div>
                                    <div className="col-8 mb-3">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input type="email"
                                            className="form-control" name="email" id="email" defaultValue={userdata.email} aria-describedby="Err_email" placeholder="Enter email" />
                                        <small id="email" className="form-text text-muted"></small>
                                    </div>
                                    <div className="col-8 mb-3">
                                        <label htmlFor="contactNo" className="form-label">Contact No </label>
                                        <input type="text"
                                            className="form-control" name="contactNo" id="contactNo" defaultValue={userdata.contactNo} aria-describedby="Err_contactNo" placeholder="Enter contact no" />
                                        <small id="Err_contactNo" className="form-text text-muted"></small>
                                    </div>
                                    <div className="col-8 mb-3">
                                        <label htmlFor="address" className="form-label">Address</label>
                                        <input type="text"
                                            className="form-control" name="address" id="address" defaultValue={userdata.address} aria-describedby="Err_address" placeholder="Enter Address" />
                                        <small id="Err_address" className="form-text text-muted"></small>
                                    </div>
                                    <button type="submit" className="col-3 btn btn-outline-primary">Submit</button>
                                </div>
                                <div className='text-center d-flex justify-content-center mt-2' id='msg'>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
