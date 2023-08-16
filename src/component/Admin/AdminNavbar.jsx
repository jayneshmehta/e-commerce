import React from 'react'
import { AiOutlineUserSwitch } from 'react-icons/ai'
import { BiCategoryAlt, BiSolidCoupon } from 'react-icons/bi'
import { BsFillCartCheckFill } from 'react-icons/bs'
import { FaTshirt, FaUsers } from 'react-icons/fa'
import { FiLogOut, FiPower } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

export default function AdminNavbar({ setAdminLoggedIn, adminLoggedIn }) {
    const Logout = () => {
        Swal.fire({
            title: 'Are you sure you want to logout..?',
            showDenyButton: true,
            icon: 'warning',
            confirmButtonText: 'Yes',
        }).then((result) => {
            if (result.isConfirmed) {
                sessionStorage.removeItem('admin')
                setAdminLoggedIn(false);
                Swal.fire({
                    title: 'Logout',
                    type: 'success',
                    icon: 'success',
                    text: 'You are loged out successfully..',
                });
            }
        })
    }
    return (
        <div>
            <div className='col-2 d-flex gap-4'>
                {(adminLoggedIn)
                    &&
                    (<>
                        <Link className='text-dark border-0  text-decoration-none ' to={'/admin/allproductlisting'}><div className='text-center'><FaTshirt className=' fs-3 fw-bolder ' style={{ color: "#0fe3d8" }} /></div><div>Products</div></Link>
                        <Link className='text-dark border-0  text-decoration-none ' to={'/admin/'}><div className='text-center'><BiCategoryAlt className=' fs-3 fw-bolder ' style={{ color: "limegreen" }} /></div><div>Category</div></Link>
                        <Link className='text-dark border-0  text-decoration-none ' to={'/admin/allUsers'}><div className='text-center'><FaUsers className=' fs-3 fw-bolder ' style={{ color: "blueviolet" }} /></div><div>Users</div></Link>
                        <Link className='text-dark border-0  text-decoration-none ' to={'/admin/allOrders'}><div className='text-center'><BsFillCartCheckFill className=' fs-3 text-center fw-bolder ' style={{ color: "mediumorchid" }} /></div><div>Orders</div></Link>
                        <Link className='text-dark border-0  text-decoration-none ' to={'/admin/allCoupons'}><div className='text-center'><BiSolidCoupon className=' fs-3 text-center fw-bolder ' style={{ color: "red" }} /></div><div>Coupons</div></Link>
                        <div className='text-center'>
                            <FiPower className=' fs-3 text-center fw-bolder ' style={{ color: "red" }} onClick={() => Logout()} />
                            <div>Logout</div>
                        </div>
                    </>
                    )}
            </div>
        </div>
    )
}
