import React from 'react'
import ProductDiscription from './ProductDiscription'
import SimilarProducts from './SimilarProducts'

export default function ExtraDetails({ product, userdata }) {
    return (
        <div className='container'>
            <div className="row mt-3 mb-3" style={{ height: '600px' }}>
                <div className="col-8" >
                    <ProductDiscription product={product} userdata={userdata} />
                </div>
                <div className="col-4">
                    <div className="card text-start ">
                        <div className="card-body ">
                            <SimilarProducts category={product.category_id} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
