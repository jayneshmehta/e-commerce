import React from 'react'
import StatusOptions from './StatusOptions'
import axios from 'axios';
import Swal from 'sweetalert2';
import $ from 'jquery';
import { updateOrder } from '../AllStates';


export default function UpdateStatusForm({ orderData, setOrderdata }) {
    // const updateOrder = async (e) => {
    //     $("#message").html("");
    //     e.preventDefault();
    //     var id = (e.target.id).split("_")[1];
    //     $("#message").html(`<div class="spinner-border" role="status"><span class="sr-only"></span></div>`);
    //     $("small").text("");
    //     var data = new FormData(e.target);
    //     const BaseUrl = `http://192.168.101.102/api/UpdateOrders-${id}`;
    //     await axios.post(BaseUrl, data)
    //         .then((response) => {
    //             let message = response.data.message;
    //             Swal.fire({
    //                 title: 'Update Order..',
    //                 type: 'success',
    //                 icon: 'success',
    //                 text: `${message}`,
    //             });
    //             $("#message").html(`<p class='text-center text-success'>${message}</p>`)
    //         })
    //         .catch((error) => {
    //             if (error.response.data.errors) {
    //                 var errors = error.response.data.errors;
    //                 for (let x in errors) {
    //                     $(`#Err${x}`).text(errors[x]);
    //                 }
    //             }
    //             let message = error.response.data.message;
    //             $("#message").html(`<p class='text-center text-danger'>${message}</p>`)
    //         })

    // }

    return (
        <form action="" method="post" id={"form_" + orderData?.id} onSubmit={(e) => updateOrder(e)}>
            <div className="mb-3">
                <label htmlFor="ShippingAddress" className="form-label"><strong> Shipping address :</strong> </label>
                <textarea type="text" className="form-control" name="ShippingAddress" id="ShippingAddress" aria-describedby="errAdd" defaultValue={orderData?.ShippingAddress}></textarea>
                <small id="ErrShippingAddress" className="form-text text-danger "></small>
            </div>

            <div className="mb-3">
                <label htmlFor="contactNo" className="form-label"><strong> Contact number : </strong></label>
                <input type="text" maxLength="10" className="form-control" name="contactNo" id="contactNo" aria-describedby="errPhone" defaultValue={orderData?.contactNo} />
                <small id="ErrcontactNo" className="form-text text-danger"></small>
            </div>

            <div className="mb-3">
                <label htmlFor="quantity" className="form-label" ><strong>Quantity : </strong></label>
                <input type="text" maxLength="10" className="form-control" name="quantity" id="quantity" aria-describedby="errquantity" defaultValue={orderData?.quantity} />
                <small id="Errquantity" className="form-text text-danger"></small>
            </div>


            <div className="mb-3">
                <label htmlFor="status" className="form-label"><strong> Status :</strong> </label>
                <select className="ms-3 border border-2 border-primary rounded p-1" name="updstatus" id="updstatus" defaultValue={orderData?.status}>
                    <StatusOptions />
                </select>
                <small id="Errupdstatus" className="form-text text-danger"></small>
            </div>

            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-primary">Submit</button>
            </div>
            <div className="h-25 text-center text-danger mt-3" id="message">
            </div>
        </form>
    )
}
