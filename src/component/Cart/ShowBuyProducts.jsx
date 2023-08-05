import React, { useEffect, useState } from 'react'
import CouponDiv from './CouponDiv';
import PriceSummary from './PriceSummary';
import BuyProductCard from './BuyProductCard';
import EmptyCart from './EmptyCart';
import { Breadcrumbs, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function ShowBuyProducts({ Buyproduct, RemoveShoppingCart, ChangeQuantity }) {

    const [Cartitems, setCartitems] = useState([])
    useEffect(() => {
        setCartitems(Buyproduct)
    }, [Buyproduct])

    return (
        <>
            {
                Buyproduct.length === 0 ? < EmptyCart /> :
                    <div className='container mt-3'>
                        <Breadcrumbs aria-label="breadcrumb" className='my-3'>
                            <Link className='text-decoration-none' color="text.primary" to="/">Home</Link>
                            <Typography color="text.primary">cart</Typography>
                        </Breadcrumbs>
                        <div className="row">
                            <div className="col-9 overflow-auto" style={{ height: '80vh' }}>
                                <div className="card text-start">
                                    <div className="card-body">
                                        <h5>Shopping Cart </h5>
                                        <div className="card-text">
                                            {
                                                <BuyProductCard allitems={Cartitems} RemoveShoppingCart={RemoveShoppingCart} ChangeQuantity={ChangeQuantity} />
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-3">
                                <PriceSummary Buyproduct={Buyproduct} />
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}
