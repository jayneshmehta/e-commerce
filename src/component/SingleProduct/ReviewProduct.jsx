import { Rating } from '@mui/material';
import React from 'react';
import $ from 'jquery';
import axios from 'axios';
import env from "react-dotenv";
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
export default function ReviewProduct({ product, getreviews }) {
    var features = []
    const userdata = useSelector((state) => state.userdata);
    if (!sessionStorage.getItem("user")) {
        $('#submit').attr("disabled", true);
    }
    const addReview = async (e) => {
        e.preventDefault();
        let formdata = new FormData(e.target);
        formdata.append('features', features)
        formdata.append('userId', userdata.id)
        formdata.append('productId', product.id)
        var token = JSON.parse(sessionStorage.getItem("token"));
        const config = { headers: { 'Authorization': 'Bearer ' + token } };
        var baseURL = "http://192.168.101.102/api/addReview";
        await axios.post(baseURL, formdata, config)
            .then(response => {
                toast.success(response.data.message);
                getreviews();
                // Swal.fire({
                //     title: 'Review..',
                //     type: 'success',
                //     icon: 'success',
                //     text: `${response.data.message}`,
                //   });
            }).catch(
                (error) => {
                    toast.warning(error.response.data.error);
                    console.log(error);
                })
    }
    $(".badge").on("click", function () {
        let id = this.id;
        if ($(`#${this.id}`).hasClass("bg-warning")) {
            features = features.filter(function (e) { return e !== ($(`#${id}`).text()) })
            $(`#${this.id}`).removeClass('bg-warning');
            $(`#${this.id}`).addClass('bg-light');
        } else {
            features.push(($(`#${this.id}`).text()));
            $(`#${this.id}`).removeClass('bg-light');
            $(`#${this.id}`).addClass('bg-warning');
        };
    })
    return (
        <div className="">

            <span className="d-block ">Rate the Product?</span>
            <form onSubmit={(e) => addReview(e)}>
                <Rating name="rating" id={'rating'} defaultValue={2.5} precision={0.5} /><br />
                <small className='badge  border bg-light p-1 text-dark mx-2 feature' id='Fast_delivery' >Fast delivery  </small>
                <small className='badge  border bg-light p-1 text-dark mx-2 feature' id="Best_Quality" >Best Quality  </small>
                <small className='badge  border bg-light p-1 text-dark mx-2 feature' id='Best_in_price' >Best in price  </small>
                <small className='badge  border bg-light p-1 text-dark mx-2 feature' id='Recommendable' >Recommendable  </small>
                <div className='mt-3'>
                    <textarea className="form-control" name="comments" id="" rows="3" placeholder="Add a comment...">
                    </textarea>
                </div>
                <button type="submit" className='btn btn-primary rounded mt-3' id='submit'>Submit</button>
            </form>
        </div>

    )
}
