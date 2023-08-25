import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Loading from '../Loading';
import Swal from 'sweetalert2';
import DataTable from 'datatables.net-dt';
import { AiTwotoneDelete } from 'react-icons/ai';
import { FaPencilAlt } from 'react-icons/fa';
import { GetUsers } from '../AllStates';
import deleteUser from '../AllStates';
import { Switch } from '@mui/material';
import $ from 'jquery';
export default function AdminUserlisting() {
    const users = GetUsers();
    let table;

    useEffect(() => {
        setTimeout(() => {
            table = new DataTable('#table');
        }, 500);
    }, [users]);
    const [status, setStatus] = useState(false);
    const [isAdmin, setisAdmin] = useState(false);

    const handleStatus = async (event, id) => {
        const data = {
            status: event.target.checked,
        }
        const BaseUrl = `http://192.168.101.102/api/UpdateuserStatus-${id}`;
        await axios.post(BaseUrl, data)
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
    const handleisAdmin = async(event,id) => {
        const data = {
            status: event.target.checked,
        }
        var token = JSON.parse(sessionStorage.getItem("token"));
        const config = { headers: { 'Authorization': 'Bearer ' + token } };
        const BaseUrl = `http://192.168.101.102/api/changePrivilege-${id}`;
        await axios.post(BaseUrl, data , config)
            .then((response) => {
                let message = response.data.message;
                Swal.fire({
                    title: 'Privilege Updated..',
                    type: 'success',
                    icon: 'success',
                    text: `${message}`,
                });
                setisAdmin(event.target.checked);
            })
            .catch((error) => {
                console.log(error);
                if (error.response.data.errors) {
                    var errors = error.response.data.errors;
                }else{
                    var errors = error.response.data.message;
                }
                Swal.fire({
                    title: 'Privilege Updated..',
                    type: 'error',
                    icon: 'error',
                    text: `${errors}`,
                });
            })
    };

    return (
        <div className='container'>
            <div className="row justify-content-center mt-5">
                {
                    (users?.length == 0) ? <Loading pageName={"Users"} /> : (
                        <>
                            <div className="row flex-row-reverse ">
                                <h5>User's Listing : </h5>
                            </div>
                            <hr />
                            <div className="row flex-row-reverse ">
                                <div className="col-2 d-flex justify-content-center">
                                    <Link to={"/admin/AddUsers"} className="btn btn-primary mb-4" href="Adduser.html" >Add users </Link>
                                </div>
                            </div>
                            <div className="col-12">

                                <div className="table-responsive">
                                    <table className="table bg-light" id='table'>
                                        <thead>
                                            <tr className='border border-2 border-dark  text-center'>
                                                <th scope="col">SrNo.</th>
                                                <th scope="col">Profile</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Address</th>
                                                <th scope="col">ContactNo</th>
                                                <th scope="col">Email</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Admin Access</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody id="listing">
                                            {
                                                users.map((items, index) => {
                                                    return (
                                                        <tr className='text-center' key={index}>
                                                            <td width='100px' className=" border border-dark border-2 " >{index + 1}</td>
                                                            <td width='140px' className=" border border-dark border-2  pt-2 " >
                                                                <img src={items.profile ? "http://192.168.101.102/" + items.profile : "https://img.freepik.com/free-icon/user_318-150866.jpg"} alt='' width='70px' height='70px' className='rounded-5' />
                                                            </td>
                                                            <td width='150px' className=" border border-dark border-2 " >{items.name}</td>
                                                            <td width='400px' className=" border border-dark border-2 " >{(items.address) ? items.address : "No Address"}</td>
                                                            <td className=" border border-dark border-2 " >{items.contactNo}</td>
                                                            <td className=" border border-dark border-2 " >{items.email}</td>
                                                            <td className=" border border-dark border-2 " >
                                                                <div className="form-check form-switch ms-3">
                                                                    <Switch
                                                                        defaultChecked={(items.status == '1') ? 1 : 0}
                                                                        onChange={(e) => handleStatus(e, items.id)}
                                                                        inputProps={{ 'aria-label': 'controlled' }}
                                                                    />
                                                                </div>
                                                            </td>
                                                            <td className=" border border-dark border-2 " >
                                                                <Switch
                                                                    defaultChecked={(items.isAdmin == '1') ? 1 : 0}
                                                                    onChange={(e) => handleisAdmin(e, items.id)}
                                                                    inputProps={{ 'aria-label': 'controlled' }}
                                                                />
                                                            </td>
                                                            <td width='220px' className=" border border-dark border-2 " >
                                                                <button className='btn btn-danger delete' id={'del_' + items.id} onClick={(e) => deleteUser(e, table)} ><AiTwotoneDelete /></button>
                                                                <Link to={"/admin/UpdateUsers"} className='btn btn-warning ms-3' state={items.id} ><FaPencilAlt /></Link>
                                                            </td>
                                                        </tr>)
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
