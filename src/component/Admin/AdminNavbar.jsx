import React from 'react'
import { AiOutlineUserSwitch } from 'react-icons/ai'
import { BiSolidCoupon } from 'react-icons/bi'
import { BsFillCartCheckFill } from 'react-icons/bs'
import { FaTshirt, FaUsers } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default function AdminNavbar() {
    return (
        <div>
            <div className='col-12 d-flex gap-4'>
                <Link className='text-dark border-0  text-decoration-none ' to={'/admin/allproductlisting'}><div className='text-center'><FaTshirt className=' fs-3 fw-bolder ' style = {{color:"limegreen" }}/></div><div>Products</div></Link>
                <Link className='text-dark border-0  text-decoration-none ' to={'/admin/allUsers'}><div className='text-center'><FaUsers className=' fs-3 fw-bolder ' style={{color:"blueviolet" }} /></div><div>Users</div></Link>
                <Link className='text-dark border-0  text-decoration-none ' to={'/admin/allOrders'}><div className='text-center'><BsFillCartCheckFill className=' fs-3 text-center fw-bolder ' style={{color:"mediumorchid"}}/></div><div>Orders</div></Link>
                <Link className='text-dark border-0  text-decoration-none ' to={'/admin/allCoupons'}><div className='text-center'><BiSolidCoupon className=' fs-3 text-center fw-bolder ' style={{color:"red"}}/></div><div>Coupons</div></Link>
            </div>
        </div>
    )
}
