import React from 'react'
import PersonPinIcon from '@mui/icons-material/PersonPin';
import AssistantIcon from '@mui/icons-material/Assistant';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import $ from 'jquery';
import Swal from 'sweetalert2';

import { BiSolidDoorOpen } from 'react-icons/bi';
import { Link } from 'react-router-dom';
export default function AfterLogin({ count,setLoggedIn }) {
    $(document).on("click","#logout",function () {
        sessionStorage.removeItem('user')   
        setLoggedIn(sessionStorage.getItem('user'))
        Swal.fire({
            title: 'Logout',
            type: 'success',
            icon: 'success',  
            text: 'You are loged out successfully..',
        });
    });
    return (
        <div className='col-4 d-flex justify-content-end gap-4'>
            <div >
                <div className='text-center'>
                    <PersonPinIcon />
                </div>
                <div className='text-muted'>
                    profile
                </div>
            </div>
            <div>
                <div className='text-center'>
                    <AssistantIcon />
                </div>
                <div className='text-muted'>
                    message
                </div>
            </div>
            <div>
                <div className='text-center'>
                    <FavoriteIcon />
                </div>
                <div className='text-muted'>
                    <Link to={'/orders'} className='text-muted text-decoration-none '><p>orders</p></Link>
                </div>
            </div>
            <div>
                <div className='text-center position-relative'>
                    <ShoppingCartIcon />
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {count}
                        <span className="visually-hidden">unread messages</span>
                    </span>
                </div>
                <div className='text-muted'>
                    <Link to={'/cart'} className='text-muted text-decoration-none '><p>my cart</p></Link>
                </div>
            </div>
            <div>
                <div className='text-center '>
                    <button className='text-muted text-decoration-none btn p-0 m-0 fs-3' id='logout'><BiSolidDoorOpen /></button>
                </div>
            </div>
        </div>
    )
}
