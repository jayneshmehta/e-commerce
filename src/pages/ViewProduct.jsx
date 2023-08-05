import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import Breadcrump from '../component/Breadcrump'
import ProductDetails from '../component/ProductDetails'
import ExtraDetails from '../component/SingleProduct/ExtraDetails'
import RelatedProducts from '../component/SingleProduct/RelatedProducts';
import FooterAdd from '../component/SingleProduct/FooterAdd';

export default function ViewProduct({setBuyproduct}) {
    const location = useLocation()
    const product_id = location.state;
    const [product, setProduct] = useState([]);
    const [images, setImages] = useState([]);
    useEffect(() => {
      let Baseurl = `http://192.168.101.102/api/products/GettingProductById-${product_id}`;
      axios.get(Baseurl).then(async (responce) => {
        setProduct(responce.data);
        setImages(await responce.data.images.split(','));
      });
    }, [product_id])

    return (
        <div className='bg-light'>
        <Breadcrump/>
        <ProductDetails product={product} images={images} setBuyproduct={setBuyproduct}/>
        <ExtraDetails product={product}/>
        <RelatedProducts product={product}/>
        <FooterAdd/>
        </div>
    )
}
