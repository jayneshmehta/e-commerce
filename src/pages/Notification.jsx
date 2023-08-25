import React, { useEffect } from 'react'
import { GET_NOTIFICATION } from '../ReduxStore/Action';
import { useSelector } from 'react-redux';
import axios from 'axios';
import store from '../ReduxStore/Store';
import { AiFillStar, AiOutlineLogin } from 'react-icons/ai';
import { GrUpdate } from 'react-icons/gr';
import { FiShoppingCart } from 'react-icons/fi';
import { BiLogOutCircle } from 'react-icons/bi';
import { BsDot } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { Badge, Breadcrumbs, Typography } from '@mui/material';

export default function Notification() {
    const userdata = useSelector((state) => state.userdata);
    const getNotification = async () => {
        var token = JSON.parse(sessionStorage.getItem("token"));
        const config = { headers: { 'Authorization': 'Bearer ' + token } };
        var baseURL = `http://192.168.101.102/api/notificationById-${userdata.id}`;
        await axios.get(baseURL, config).then((response) => {
            store.dispatch({ type: GET_NOTIFICATION, payload: response.data })
        });
    }
    useEffect(() => {
        getNotification();
    }, [])
    const notifications = useSelector((state) => state.notifications);
    return (
        <div className='container '>
            <Breadcrumbs aria-label="breadcrumb" className='my-3'>
                <Link className='text-decoration-none' color="text.primary" to="/">Home</Link>
                <Typography color="text.primary">Activities</Typography>
            </Breadcrumbs>
            <h3 className='mt-2'>All Activities : </h3>
            <hr />
            {
                notifications.map((items) => {
                    var date = new Date(items.created_at);
                    var icon = (items.icon == 'login') ? <AiOutlineLogin />
                        : (items.icon == 'order') ? <FiShoppingCart />
                            : (items.icon == "review") ? <AiFillStar /> : (items.icon == "logout") ? <BiLogOutCircle /> : <GrUpdate />

                    return (
                        <div className="row ">
                            <div className="col-8">
                                <div className="card mt-2 mx-5">
                                    <div className="card-body">
                                            <div className="row ">
                                                <div className="col-2 d-flex justify-content-center align-items-center fs-4  border-end border-3">
                                                    {icon}
                                                </div>
                                                <div className="col-6">
                                                    <span className='fw-bolder text-capitalize'>{items.activity}</span><br></br>
                                                    <BsDot className='fw-bolder fs-4' /><span className='ms-2'>{items.message}</span>
                                                </div>
                                                <div className="col-3">
                                                    <strong>Time :</strong><br></br>
                                                    {
                                                        <span className='ms-3'>{date.getDate() + ' / ' + (date.getMonth() + 1) + ' / ' + date.getFullYear()}
                                                        </span>}
                                                </div>

                                            </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    )
}
