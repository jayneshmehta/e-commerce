import React from 'react'

export default function CouponDiv() {
    return (
        <div className="card p-3 mb-3">
            <form>
                <div>
                    <label className="form-label">Have coupon?</label>
                    <div className="input-group">
                        <input type="text" className="form-control" name="" placeholder="Add coupon" />
                        <button className="btn btn-light">Apply</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
