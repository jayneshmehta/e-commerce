import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function ApiCalls() {
    const [product, setProduct] = useState([])
    var baseURL = 'http://192.168.101.102/api/products';
    useEffect(() => {
        axios.get(baseURL).then((response) => {
            setProduct(response.data);
        });
    }, []);
    return (product)
}


