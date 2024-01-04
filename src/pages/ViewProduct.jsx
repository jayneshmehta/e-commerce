import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import env from "react-dotenv";
import { useLocation } from 'react-router-dom';
import Breadcrump from '../component/Breadcrump'
import ProductDetails from '../component/ProductDetails'
import ExtraDetails from '../component/SingleProduct/ExtraDetails'
import RelatedProducts from '../component/SingleProduct/RelatedProducts';
import FooterAdd from '../component/SingleProduct/FooterAdd';
import store from '../ReduxStore/Store';
import { useSelector } from 'react-redux';
import { TEMP_PRODUCT } from '../ReduxStore/Action';

export default function ViewProduct({addWishList}) {
    const location = useLocation()
    const product_id = location.state;
    const [images, setImages] = useState([]);

    const getTempProduct = async (product_id) => {
      var baseURL = `${env.API_URL}products/GettingProductById-${product_id}`;
      await axios.get(baseURL).then( async (response) => {
        store.dispatch({ type: TEMP_PRODUCT, payload: response.data })
        await setImages( response.data.images?.split(','));
      });
    }

    useEffect(() => {
      getTempProduct(product_id);
    }, [product_id])

  const product = useSelector((state) => state.tempProduct);
    console.log(product);

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
