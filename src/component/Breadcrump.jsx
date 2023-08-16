import React from 'react'
import { Link } from 'react-router-dom'
export default function Breadcrump() {
    return (
        <div className='container pt-3'>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item " aria-current="page"><Link className='text-decoration-none' to='/' >Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Product</li>
                </ol>
            </nav>
        </div>
    )
}
