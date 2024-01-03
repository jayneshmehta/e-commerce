import React from 'react'
import logo192 from "./logo192.png";
import axios from 'axios';
import env from "react-dotenv";
import { useEffect } from 'react';
import { useState } from 'react';
import Swal from "sweetalert2"; 

import $ from 'jquery';
import { Link, useLocation } from 'react-router-dom';
import AfterLogin from './AfterLogin';
import BeforeLogin from './BeforeLogin';
import AdminNavbar from './Admin/AdminNavbar';

export default function Navbar() {
    const [category, setcategory] = useState([])
    const {pathname} = useLocation();
    const isAdmin = /(.*)\/admin(.*)/;
    
    var baseURL = env.API_URL+'categorys';
    useEffect(() => {
        axios.get(baseURL).then((response) => {
            setcategory(response.data)
        });
    }, []);

    var admin = pathname.match(isAdmin);
    var userExist = false;
    if (sessionStorage.getItem('user')) {
        userExist = true;
    }

    return (
        <nav className="navbar navbar-expand-lg border-bottom border-3 mt-1 ">
            <div className='container'>
                <div className='col-2 d-flex '>
                    <Link to={'/'} className='text-muted text-decoration-none '><img src={logo192} className='App-logo me-2' alt="logo" style={{ height: "40px" }} />
                        <span className='pt-1 fw-bold fs-4 text-primary'>React</span></Link>
                </div>
                {   admin?<AdminNavbar/>:userExist ? <AfterLogin /> : <BeforeLogin />
                }
            </div>
        </nav>
    )
}
