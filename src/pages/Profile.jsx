import React, { useEffect, useState } from 'react';
import { Breadcrumbs, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Main from '../component/Profile/Main';
import Swal from 'sweetalert2';
import Editprofile from '../component/Profile/Editprofile';
import Orders from './Orders';
import Wishlist from './Wishlist';
import { IS_LOGIN, SET_WISHLIST, USER_DATA } from '../ReduxStore/Action';
import store from '../ReduxStore/Store';
import { useSelector } from 'react-redux';
import axios from 'axios';
import env from "react-dotenv";

export default function Profile() {
  const userdata = useSelector((state) => state.userdata);
  const Logout = () => {
    Swal.fire({
      title: 'Are you sure you want to logout..?',
      showDenyButton: true,
      icon: 'warning',
      confirmButtonText: 'Yes',
    }).then(async (result) => {
      if (result.isConfirmed) {
        var token = JSON.parse(sessionStorage.getItem("token"));
        const config = { headers: { 'Authorization': 'Bearer ' + token } };
        var baseURL = `${env.API_URL}logout-${userdata.id}`;
        await axios.get(baseURL, config).then((response) => {
          sessionStorage.removeItem('user')
          sessionStorage.removeItem('wishlist')
          sessionStorage.removeItem('cart')
          sessionStorage.removeItem('token')
          store.dispatch({ type: USER_DATA, payload: [] });
          store.dispatch({ type: SET_WISHLIST, payload: [] });
          store.dispatch({ type: IS_LOGIN, payload: false });
          Swal.fire({
            title: 'Logout',
            type: 'success',
            icon: 'success',
            text: `${response.data.message}`,
          });
        });
      }
    })
  }

  return (
    <div className="container mt-3" style={{ minHeight: "100vh" }}>
      <Breadcrumbs aria-label="breadcrumb" className='my-3'>
        <Link className='text-decoration-none' color="text.primary" to="/">Home</Link>
        <Typography color="text.primary">profile</Typography>
      </Breadcrumbs>
      <div className="row">
        <aside className="col-lg-3 col-xl-3 ">
          <ul className="nav nav-tabs card-header-tabs bg-light flex-nowrap flex-column gap-2 rounded shadow">
            <li className="nav-item">
              <a className="nav-link active" data-bs-toggle="tab" data-bs-target="#profileInfo" aria-current="true" href="#">Personal Info</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-bs-toggle="tab" data-bs-target="#Orders" href="#">Orders</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-bs-toggle="tab" data-bs-target="#wishlist" href="#">My Wishlist</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-bs-toggle="tab" data-bs-target="#edit" href="#">Profile setting</a>
            </li>
            <li className="nav-item">
              <a className="nav-link " href="#" onClick={() => Logout()}>Logout</a>
            </li>
          </ul>
        </aside>
        <div className="col-9">
          <div className="tab-content card-body">
            <article className="tab-pane active" id="profileInfo" role="tabpanel">
              <Main userdata={userdata} />
            </article>
            <article className="tab-pane" id="Orders" role="tabpanel">
              <Orders />
            </article>

            <article className="tab-pane" id="wishlist" role="tabpanel">
              <Wishlist />
            </article>

            <article className="tab-pane " id="edit" role="tabpanel">
              <Editprofile userdata={userdata} />
            </article>
          </div>
        </div>
      </div>
    </div>
  )
}