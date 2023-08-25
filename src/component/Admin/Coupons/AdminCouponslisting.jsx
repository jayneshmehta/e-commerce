import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { AiTwotoneDelete } from 'react-icons/ai';
import { FaPencilAlt } from 'react-icons/fa';
import Loading from '../Loading';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Switch } from '@mui/material';
import DataTable from 'datatables.net-dt';

export default function AdminCouponslisting() {
    const [coupons, setCoupons] = useState([])
    var token = JSON.parse(sessionStorage.getItem("token"));
    const config = { headers: { 'Authorization': 'Bearer ' + token } };
    const getCoupons = () => {
        var token = JSON.parse(sessionStorage.getItem("token"));
        const config = { headers: { 'Authorization': 'Bearer ' + token } };
        var baseURL = 'http://192.168.101.102/api/getCoupons';
        axios.get(baseURL,config).then((response) => {
            setCoupons(response.data);
        });
    }

    useEffect(() => {
        getCoupons();
    }, []);
    const [status, setStatus] = useState(false);
    const handleStatus = async (event, id) => {
        const data = {
            status: event.target.checked,
        }
       
        const BaseUrl = `http://192.168.101.102/api/UpdatecouponStatus-${id}`;
        await axios.post(BaseUrl, data ,config)
            .then((response) => {
                let message = response.data.message;
                Swal.fire({
                    title: 'status Updated..',
                    type: 'success',
                    icon: 'success',
                    text: `${message}`,
                });
                setStatus(event.target.checked);
            })
            .catch((error) => {
                if (error.response.data.errors) {
                    var errors = error.response.data.errors;
                    Swal.fire({
                        title: 'status Updated..',
                        type: 'error',
                        icon: 'error',
                        text: `${errors}`,
                    });
                }
            })
    };
    var table;
    useEffect(() => {
        setTimeout(() => {
            table = new DataTable('#table');
        }, 500);
    }, [coupons]);

    const deletebtn = async (id) => {
        try {
            var baseURL = `http://192.168.101.102/api/deleteCouponbyid-${id}`;
            await axios.delete(baseURL,config)
                .then(response => {
                    Swal.fire({
                        title: 'Delete..',
                        type: 'success',
                        icon: 'success',
                        text: `${response.data.message}`,
                    });
                    getCoupons();
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
        <div className='container'>
            <div className="row justify-content-center mt-5">
                {
                    (coupons?.length == 0) ? <Loading pageName={"coupons"} /> : (
                        <>
                            <div className="row flex-row-reverse ">
                                <h5>Coupn Listing : </h5>
                            </div>
                            <hr />
                            <div className="row flex-row-reverse ">
                                <div className="col-2 d-flex justify-content-center">
                                    <Link className="btn btn-primary mb-4" to="/admin/AddCoupon" >Add Coupons </Link>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="table-responsive">
                                    <table className="table bg-light" id='table'>
                                        <thead>
                                            <tr className='border border-2 border-dark  text-center'>
                                                <th scope="col">SrNo.</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Discount</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Expire Date</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody id="listing">
                                            {
                                                coupons.map((items, index) => {
                                                    return (<tr className='text-center' key={index}>
                                                        <td width='100px' className=" border border-dark border-2 " >{index + 1}</td>
                                                        <td width='170px' className=" border border-dark border-2 "  >{items.name}</td>
                                                        <td width='500px' className=" border border-dark border-2 " >{items.discountPercentage}</td>
                                                        <td className=" border border-dark border-2"><div className="form-check form-switch ms-3">
                                                            <Switch
                                                                defaultChecked={(items.status == 'active') ? 1 : 0}
                                                                onChange={(e) => handleStatus(e, items.id)}
                                                                inputProps={{ 'aria-label': 'controlled' }}
                                                            />
                                                        </div></td>
                                                        <td className=" border border-dark border-2 " >{items.ExpireDate}</td>
                                                        <td className=" border border-dark border-2 " >
                                                            <button className='btn btn-danger delete' id={"del_" + items.id} onClick={() => { deletebtn(items.id) }} ><AiTwotoneDelete /></button>
                                                            <Link to={"/admin/updateCoupon"} className='btn btn-warning ms-3' state={items.id}><FaPencilAlt /></Link>
                                                        </td>
                                                    </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </>
                    )}
            </div>
        </div>
    )
}
