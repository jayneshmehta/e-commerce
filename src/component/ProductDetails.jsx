import React from 'react'
import ViewImages from './SingleProduct/ViewImages';
import ViewDetails from './SingleProduct/ViewDetails';

export default function ProductDetails({product , images , setBuyproduct}) {


  return (
    <section>
      <div className="container">
        <article className='card'>
          <div className="row gx-0">
            <div className="col-4  p-3">
              <ViewImages images={images} thumbnail={product.thumbnail}/>
            </div>
            <div className="col-8  ps-3"> 
              <ViewDetails product={product} setBuyproduct={setBuyproduct}/>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}
