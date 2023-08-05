import React from 'react'
import { Link } from 'react-router-dom'
export default function Productcard({ items , index}) {
    return (
        <div className='border-end p-2 border-1' key={index}>
            <div className="card col-2 border-0 p-2 " style={{ width: '13rem', height: '17rem' }} >
                <div className='h-50'>
                <img src={items.thumbnail} style={{ height: '130px', objectFit: 'cover' }} className="card-img-top rounded zoom" alt="..." />
                </div>
                <div className="card-body">
                    <Link to={'/product'} state={items.id}  className=" card-text text-center text-decoration-none text-capitalize "style={{ width: "5px"}} >
                        <p className='m-1 text-truncate pt-2 p-0 text-center text-secondary productlink'>{items.title}</p>
                        <p className='text-center text-truncate p-0 m-1 text-secondary'>{items.brand}</p>
                        </Link>
                    <p className='d-flex justify-content-center'><span className="card-text text-center  px-2  bg-danger rounded-5 text-light">{"-" + items.discountPercentage + "%"}</span></p>
                </div>
            </div>
        </div>
    )
}
