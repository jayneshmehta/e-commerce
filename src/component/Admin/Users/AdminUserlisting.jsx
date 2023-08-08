import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Loading from '../Loading';
import Swal from 'sweetalert2';
import DataTable from 'datatables.net-dt';
import { AiTwotoneDelete } from 'react-icons/ai';
import { FaPencilAlt } from 'react-icons/fa';

export default function AdminUserlisting() {
    const [users, setUsers] = useState([])
    const getUsers = () => {
        var baseURL = 'http://192.168.101.102/api/user/getUsers';
        axios.get(baseURL).then((response) => {
            setUsers(response.data);
        });
    }

    useEffect(() => {
        getUsers();
    }, []);
    const deletebtn = async (e) => {
        e.preventDefault();
        var id = (e.target.id).split("_")[1];
        try {
            var baseURL = `http://192.168.101.102/api/user/DeletingUserById-${id}`;
            await axios.delete(baseURL)
                .then(response => {
                    Swal.fire({
                        title: 'Delete..',
                        type: 'success',
                        icon: 'success',
                        text: `${response.data.message}`,
                    });
                    getUsers();
                }).catch(
                    (error) => {
                        console.log(error);
                    }
                )
        } catch (err) {
            console.log(err);
        }
    }
    setTimeout(() => {
        let table = new DataTable('#table');
    }, 200);

    return (
        <div className='container'>
            <div className="row justify-content-center mt-5">
                {
                    (users?.length == 0) ? <Loading pageName={"Users"} /> : (
                        <>
                            <div className="row flex-row-reverse ">
                                <h5>User's Listing : </h5>
                            </div>
                            <hr/>
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
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody id="listing">
                                            {
                                                users.map((items, index) => {
                                                    return (<tr className='text-center'>
                                                        <td width='100px' className=" border border-dark border-2 " >{index + 1}</td>
                                                        <td width='140px' className=" border border-dark border-2 " >
                                                            <img src={items.profile ? "http://192.168.101.102/" + items.profile : "https://img.freepik.com/free-icon/user_318-150866.jpg"} alt='' width='100px' height='80px' />
                                                        </td>
                                                        <td width='150px' className=" border border-dark border-2 " >{items.name}</td>
                                                        <td width='400px' className=" border border-dark border-2 " >{(items.address) ? items.address : "No Address"}</td>
                                                        <td className=" border border-dark border-2 " >{items.contactNo}</td>
                                                        <td className=" border border-dark border-2 " >{items.email}</td>
                                                        <td width='220px' className=" border border-dark border-2 " >
                                                            <button className='btn btn-danger delete' id={'del_' + items.id} onClick={(e) => deletebtn(e)} ><AiTwotoneDelete /></button>
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
