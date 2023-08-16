import React from 'react'
import { Link } from 'react-router-dom'

export default function EmptyOrderlist() {
    return (
        <div>
            <div className="container mb-5">
                <div className="row mb-5">
                    <div className="offset-lg-3 col-lg-6 col-md-12 col-12 text-center">
                        <img src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-5521508-4610092.png" alt="" className="img-fluid mb-4" />
                        <p className="mb-4">
                            Want to buy some Product... You will find a lot of interesting products on our shop page.
                        </p>
                        <Link to={'/allproductlisting'} className="btn btn-primary">Explore Products</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
