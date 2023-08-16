import React from 'react'

export default function Countcard({heading,count}) {
    return (
        <div className="col-2">
            <div className="card">
                <div className="card-body">
                <span>{heading }</span><span className='px-2 text-danger'>{count}</span>
                </div>
            </div>
        </div>
    )
}
