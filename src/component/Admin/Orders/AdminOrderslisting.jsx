import axios from 'axios';
import env from "react-dotenv";
import React, { useEffect, useState } from 'react'
import DataTable from 'datatables.net-dt';
import Swal from 'sweetalert2';
import Loading from '../Loading';
import StatusOptions from './StatusOptions';
import UpdateStatusForm from './UpdateStatusForm';
import { FaPencilAlt } from 'react-icons/fa';
import { AiTwotoneDelete } from 'react-icons/ai';
import { GetOrders, Statusbtn } from '../AllStates';
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-buttons/js/dataTables.buttons.js";
import "datatables.net-buttons/js/buttons.colVis.js";
import "datatables.net-buttons/js/buttons.flash.js";
import "datatables.net-buttons/js/buttons.html5.js";
import "datatables.net-buttons/js/buttons.print.js";
import $ from "jquery";

export default function AdminOrderslisting() {
    const [orderdata, setOrderdata] = useState([])

    const orders = GetOrders();
    let table;
    useEffect(() => {
        setTimeout(() => {
            table = new DataTable('#table',
                {
                    pagingType: "full_numbers",
                    pageLength: 20,
                    processing: true,
                    dom: "Bfrtip",
                    select: {
                        style: "single",
                    },

                    buttons: [
                        {
                            extend: "pageLength",
                            className: "btn btn-secondary bg-secondary",
                        },
                        {
                            extend: "copy",
                            className: "btn btn-secondary bg-secondary",
                        },
                        {
                            extend: "excel",
                            className: "btn btn-secondary bg-secondary",
                        },
                        {
                            extend: "csv",
                            className: "btn btn-secondary bg-secondary",
                        },
                        {
                            extend: "print",
                            customize: function (win) {
                                $(win.document.body).css("font-size", "10pt");
                                $(win.document.body)
                                    .find("table")
                                    .addClass("compact")
                                    .css("font-size", "inherit");
                            },
                            className: "btn btn-secondary bg-secondary",
                        },
                    ],

                    lengthMenu: [
                        [10, 20, 30, 50, -1],
                        [10, 20, 30, 50, "All"],
                    ],
                }
            );
        }, 500);
    }, [orders]);

    console.log(orders);

    const updateFormData = (e) => {
        var id = (e.target.id).split("_")[1];
        setOrderdata(orders.filter((items) => (items.id == id)));
    }

    const deletebtn = async (id) => {
        // e.preventDefault();
        // var id = (e.target.id).split("_")[1];
        try {
            console.log(id);
            var token = JSON.parse(sessionStorage.getItem("token"));
            const config = { headers: { 'Authorization': 'Bearer ' + token } };
            var baseURL = `${env.API_URL}DeletingOrderById-${id}`;
            await axios.delete(baseURL, config)
                .then(response => {
                    Swal.fire({
                        title: 'Delete..',
                        type: 'success',
                        icon: 'success',
                        text: `${response.data.message}`,
                    });
                    table.destroy();
                    GetOrders();
                }).catch(
                    (error) => {
                        console.log(error);
                    }
                )
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className=' m-5'>
            {
                (orders?.length == 0) ? <Loading pageName={"Orders"} /> : (
                    <>
                        <div className="row  ">
                            <h5>Order's Listing : </h5>
                        </div>
                        <hr />
                        <div className="table-responsive">
                            <table className="table bg-light" id='table'>
                                <thead>
                                    <tr className='border border-2  text-center'>
                                        <th scope="col">SrNo.</th>
                                        <th scope="col">OrderId</th>
                                        <th scope="col">OrderGroupId</th>
                                        {/* <th scope="col">ProductId</th>
                                        <th scope="col">UserId</th> */}
                                        <th scope="col">Quantity</th>
                                        <th scope="col">PaymentType</th>
                                        <th scope="col">ShippingAddress</th>
                                        <th scope="col">ContactNo</th>
                                        <th scope="col">TotalAmount</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody id="listing">
                                    {
                                        orders.map((items, index) => {
                                            return (<tr className='text-center' key={index}>
                                                <td>{index + 1}</td>
                                                <td width='100px' >{items.orderId}</td>
                                                <td width='100px'>{items.orderGroupId}</td>
                                                {/* <td width='60px'>{items.productId}</td>
                                                <td width='60px'>{items.userId}</td> */}
                                                <td width='60px'>{items.quantity}</td>
                                                <td width='60px'>{items.paymentType}</td>
                                                <td width='200px'>{items.ShippingAddress}</td>
                                                <td width='60px'>{items.contactNo}</td>
                                                <td width='60px'>{items.TotalAmount}</td>
                                                <td>
                                                    <select className='border border-2 py-1 border-primary rounded orderstatus' name="status" id={'status_' + items.orderGroupId} defaultValue={items.status} onChange={(e) => { Statusbtn(e) }}>
                                                        <StatusOptions />
                                                    </select>
                                                </td>
                                                <td><a className='btn btn-danger delete' id='del_${items.id}' onClick={(e) => deletebtn(items.id)} ><AiTwotoneDelete /></a>
                                                    <button className='btn btn-warning ms-3 update' data-bs-toggle="modal" data-bs-target="#staticBackdrop" id={'upd_' + items.id} onClick={(e) => updateFormData(e)} ><FaPencilAlt /></button></td>
                                            </tr>)
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>



                        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5" id="staticBackdropLabel" >Update Order Data</h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <UpdateStatusForm orderData={orderdata[0]} setOrderdata={setOrderdata} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
        </div>
    )
}
