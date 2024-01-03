import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import env from "react-dotenv";
import { Link, useLocation } from 'react-router-dom';
import Breadcrump from '../component/Breadcrump'
import ProductDetails from '../component/ProductDetails'
import ExtraDetails from '../component/SingleProduct/ExtraDetails'
import RelatedProducts from '../component/SingleProduct/RelatedProducts';
import FooterAdd from '../component/SingleProduct/FooterAdd';

export default function ViewProduct({addWishList}) {
    const location = useLocation()
    const product_id = location.state;
    const [product, setProduct] = useState([]);
    const [images, setImages] = useState([]);
    useEffect(() => {
      let Baseurl = `${env.API_URL}products/GettingProductById-${product_id}`;
      axios.get(Baseurl).then(async (responce) => {
        setProduct(responce.data);
        setImages(await responce.data.images?.split(','));
      });
    }, [product_id])

    return (
        <div className='bg-light'>
        <Breadcrump/>
        <ProductDetails product={product} images={images}  addWishList={addWishList}/>
        <ExtraDetails product={product}/>
        <RelatedProducts product={product}/>
        <FooterAdd/>
        </div>
    )
}
