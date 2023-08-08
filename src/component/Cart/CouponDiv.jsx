import React from 'react'

export default function CouponDiv() {
    return (
        <div className="card p-3 mb-3">
            <form>
                <div>
                    <label className="form-label">Have coupon?</label>
                    <div className="input-group">
                        <form action="" onClick={(e)=>{checkCoupon(e)}}>
                        <input type="text" className="form-control" name="name" placeholder="Add coupon" />
                        <button className="btn btn-light" type='submit' >Apply</button>
                        <small id='coupanErr' className='text-danger'></small>
                        </form>
                    </div>
                </div>
            </form>
        </div>
    )
}
