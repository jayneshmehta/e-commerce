import axios from 'axios';
import env from "react-dotenv";
import React, { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../component/Admin/Loading';
import { IS_LOGIN, SET_WISHLIST, USER_DATA } from '../ReduxStore/Action';
import store from '../ReduxStore/Store';

export default function GoogleLogin() {
    let location = useLocation();
    let callBackdata = location.search;
    useEffect(() => {
        signinWithgoogle();
    }, [])

    const signinWithgoogle = async () =>{
        var baseURL = `${env.API_URL}auth/callback/google${callBackdata}`;
        await axios.get(baseURL)
        .then((response) => {
            // console.log(response); 
            sessionStorage.setItem("user", JSON.stringify(response.data.user));
            store.dispatch({ type: IS_LOGIN, payload: sessionStorage.getItem('user') })
            store.dispatch({ type: USER_DATA, payload: response.data.user });
            store.dispatch({ type: SET_WISHLIST, payload: response.data.wishlist });
            sessionStorage.setItem("wishlist", JSON.stringify(response.data.wishlist));
            sessionStorage.setItem("token", JSON.stringify(response.data.token));
            sessionStorage.setItem("login", "Login Successfull :) ");
        }).catch((error) => {
            console.log(error);           
        })
    }
  return (
    <div className='row justify-content-center'>
        <Loading pageName={"Login.."} />
    </div>
  )
}
