import React, { useEffect, useState } from 'react'
import CouponDiv from './CouponDiv';
import PriceSummary from './PriceSummary';
import BuyProductCard from './BuyProductCard';
import EmptyCart from './EmptyCart';

export default function ShowBuyProducts({ Buyproduct, RemoveShoppingCart, ChangeQuantity }) {

    const [Cartitems, setCartitems] = useState([])
    useEffect(() => {
        setCartitems(Buyproduct)
    }, [Buyproduct])

return (
    <>
    {
        Buyproduct.length===0?< EmptyCart />:
            <div className='container mt-3' >
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
                        <CouponDiv />
                        <PriceSummary Buyproduct={Buyproduct} />
                    </div>
                </div>
            </div>

        }
    </>
)
}
