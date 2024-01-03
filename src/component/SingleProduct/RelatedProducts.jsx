import axios from 'axios';
import env from "react-dotenv";
import React, { useMemo, useState } from 'react'
import NewProducts from '../NewProducts';
export default function RelatedProducts({ product }) {
    const [products, setProduct] = useState([])
    
    var baseURL = `${env.API_URL}products/GettingProductBySub_CategoryId-${parseInt(product.category_id)}`;
    useMemo(() => {
        axios.get(baseURL).then((response) => {
            setProduct(response.data);
        });
    }, [product]);
    return (
        <div>
            <NewProducts product={products.reverse()} title={"Related Product's"} countOfProduct = {5}/>
        </div>
    )
}
