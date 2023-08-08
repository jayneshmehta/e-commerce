import React from 'react'

export default function StatusOptions() {
    return (
        <>
            <option value="In process">In process</option>
            <option value="Pending">Pending</option>
            <option value="Ready for dispatch">Ready for dispatch</option>
            <option value="Dispatched">Dispatched</option>
            <option value="Out for Delivery">Out for Delivery</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
        </>
    )
}
