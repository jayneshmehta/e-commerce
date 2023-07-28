import React from 'react'
import SelectQuantity from '../SingleProduct/SelectQuantity'
import { Link } from 'react-router-dom'

export default function ProductCard({items,RemoveShoppingCart,ChangeQuantity}) {  
    return (
        <article className="row mb-4">
            <div className="col-lg-9 ">
                <figure className="d-flex align-items-center">
                    <div className="me-3 flex-shrink-0">
                        <img src={items.thumbnail} style={{ width: '150px', height: '100px' }} className="size-100x100 img-thumbnail" />
                    </div>
                    <figcaption className="info">
                        <Link to={'/product'} state={items.id} className='text-decoration-none title text-capitalize text-dark productlink' >{items.title}</Link>
                        <p className="text-muted">
                            {items.description}
                        </p>
                        <button className="btn btn-light text-danger btn-sm me-2" id={`del_${items.id}`} onClick={()=>RemoveShoppingCart(items.id)}>Remove</button>
                        <a href="#" className="btn btn-light btn-sm">Save for later</a>
                    </figcaption>
                </figure>
            </div>
            <div className="col-lg-3">
                <div className="text-end mb-2">
                    <var className="h6">$ {parseFloat(items.price - ( (items.price * items.discountPercentage)/100)).toFixed(2)}</var>
                </div>
                <div className='d-flex justify-content-end mb-2'>
                    <SelectQuantity products={items} ChangeQuantity={ChangeQuantity}/>
                </div>
            </div>
        </article>
    )
}
