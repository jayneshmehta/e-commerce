import React from 'react'
import logo192 from "./logo192.png";
import PersonPinIcon from '@mui/icons-material/PersonPin';
import AssistantIcon from '@mui/icons-material/Assistant';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import $ from 'jquery';
import { Autocomplete } from '@mui/material';
import { TextField } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Navbar({count}) {
    const [category, setcategory] = useState([])
    var baseURL = 'http://product_api.localhost/api/categorys';
    useEffect(() => {
        axios.get(baseURL).then((response) => {
            setcategory(response.data)
        });
    }, []);
    var categorys = category.map((items, index) => {
        return <option value={items.id} key={index}>{items.name}</option>
    });

    $(document).on("submit", "#navForm", function (e) {
        e.preventDefault();
    });
    return (
        <nav className="navbar navbar-expand-lg border-bottom border-3 mt-1 ">
            <div className='container'>

                <div className='col-2 d-flex '>
                    <Link to={'/'} className='text-muted text-decoration-none '><img src={logo192} className='App-logo me-2' alt="logo" style={{ height: "40px" }} />
                        <span className='pt-1 fw-bold fs-4 text-primary'>React</span></Link>

                </div>

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
                </div>
            </div>
        </nav>
    )
}
