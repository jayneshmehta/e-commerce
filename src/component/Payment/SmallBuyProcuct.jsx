import React from 'react'
import { Link } from 'react-router-dom'

export default function SmallBuyProcuct({items,keys}) {
    return (
        <div className="card mt-2" key={keys}>
            <div className="card-body p-1">
                <div className="row gx-0 p-0 m-0">
                    <div className="col-4 me-2 border border-2">
                        <img className=" card-img img-fluid  p-2 zoom rounded" style={{ width: '140px', height: '80px' }} src={items.thumbnail} alt="Title" />
                    </div>
                    <div className="col-6 ps-2">
                        <Link to={'/product'} state={items.id} className='text-decoration-none'><p className="m-0 card-title text-dark fs-5 text-truncate text-capitalize  productlink">{items.title}</p></Link>
                        <p className="p-0 m-0 card-text">{items.brand}</p>
                        <p className="p-0 m-0 card-text text-success">${items.price}/- Only  </p>
                    </div>
                    <div className='col-1 d-flex justify-content-center align-items-center '>
                    <p className='fw-bolder'>x{items.quantity}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
