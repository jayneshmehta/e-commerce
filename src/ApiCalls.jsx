import axios from 'axios';
import env from "react-dotenv";
import React, { useEffect, useState } from 'react'
import { GET_PRODUCT } from './ReduxStore/Action';
import store from './ReduxStore/Store';

export default function ApiCalls() {
    var baseURL = env.API_URL+'products';
    useEffect(() => {
        axios.get(baseURL).then((response) => {
           store.dispatch({ type: GET_PRODUCT, payload: response.data })
        });
    }, []);
    return true;
}


