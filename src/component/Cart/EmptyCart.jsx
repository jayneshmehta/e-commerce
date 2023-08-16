import React from 'react'
import { Link } from 'react-router-dom'

export default function EmptyCart() {
    return (
        <div className="container">
            <div className="row">
                <div className="offset-lg-3 col-lg-6 col-md-12 col-12 text-center">
                    <img src="https://cdni.iconscout.com/illustration/premium/thumb/emptybag-8316260-6632280.png?f=webp" alt="" className="img-fluid mb-4"/>
                        <h2>Your shopping cart is empty</h2>
                        <p className="mb-4">
                            Return to the store to add items for your delivery slot. Before proceed to checkout you must add some products to your shopping cart. You will find a lot of interesting products on our shop page.
                        </p>
                        <Link to={'/'} className="btn btn-primary">Explore Products</Link>
                </div>
            </div>
        </div>
    )
}
