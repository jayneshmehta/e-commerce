import axios from 'axios';
import React, { useMemo, useState } from 'react'
import NewProducts from '../NewProducts';
export default function RelatedProducts({ product }) {
    const [products, setProduct] = useState([])
    
    var baseURL = `http://product_api.localhost/api/products/GettingProductBySub_CategoryId-${parseInt(product.category_id)}`;
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
