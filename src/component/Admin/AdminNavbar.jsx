import React from 'react'
import { Link } from 'react-router-dom'

export default function AdminNavbar() {
    return (
        <div>
            <div className='col-12 d-flex gap-4'>
                        <Link className='btn btn-outline-primary border-0 fs-5 text-decoration-none ' to={'/admin/allproductlisting'}>All products</Link>
                        <Link className='btn btn-outline-primary border-0 fs-5 text-decoration-none ' to={'/admin/allUsers'}>All Users</Link>
                        <Link className='btn btn-outline-primary border-0 fs-5 text-decoration-none ' to={'/admin/allOrders'}>All Orders</Link>
            </div>
        </div>
    )
}
