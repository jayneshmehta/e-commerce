import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DataTable from 'datatables.net-dt';
import Swal from 'sweetalert2';
import Loading from '../Loading';
import StatusOptions from './StatusOptions';
import UpdateStatusForm from './UpdateStatusForm';
import { FaPencilAlt } from 'react-icons/fa';
import { AiTwotoneDelete } from 'react-icons/ai';

export default function AdminOrderslisting() {
    const [orders, setOrders] = useState([])
    const [orderdata, setOrderdata] = useState([])
    var baseURL = 'http://192.168.101.102/api/orders';
    const getOrders = () => {
        axios.get(baseURL).then((response) => {
            setOrders(response.data);
        });
    }
    useEffect(() => {
        getOrders();
    }, []);

    const Statusbtn = async (e) => {
        e.preventDefault();
        var status = (e.target.value);
        var data = {
            status: status,
        }
        var id = (e.target.id).split("_")[1];
        try {
            var baseURL = `http://192.168.101.102/api/UpdateStatus-${id}`;
            await axios.post(baseURL, data)
                .then(response => {
                    Swal.fire({
                        title: 'Status..',
                        type: 'success',
                        icon: 'success',
                        text: `${response.data.message}`,
                    });
                    getOrders();
                }).catch(
                    (error) => {
                        Swal.fire({
                            title: 'Status..',
                            type: 'error',
                            icon: 'error',
                            text: `${error.data.message}`,
                        });
                    }
                )
        } catch (err) {
            console.log(err);
        }
    }

    const updateFormData = (e) => {
        var id = (e.target.id).split("_")[1];
        setOrderdata(orders.filter((items) => (items.id == id)));
    }

    setTimeout(() => {
        let table = new DataTable('#table');
    }, 300);


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
                                                    <select className='border border-2 py-1 border-primary rounded orderstatus' name="status" id={'status_' + items.id} defaultValue={items.status} onChange={(e) => { Statusbtn(e) }}>
                                                        <StatusOptions />
                                                    </select>
                                                </td>
                                                <td><a className='btn btn-danger delete' id='del_${items.id}' ><AiTwotoneDelete /></a>
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
