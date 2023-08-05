import React from 'react'
import Userinfo from './Userinfo'

export default function Main({ userdata }) {
    var address = (userdata?.address == null) ? "No Address" : userdata.address
    return (
        <div>
            <div className="card">
                <div className="card-body">
                    <h5 className='card-title fw-bolder'>Personal info</h5>
                    <Userinfo userdata={userdata} />
                    <hr></hr>
                    <div className="card">
                        <div className="card-body">
                            <h5 className='card-title fw-bolder'>Address info :</h5>
                            <div className="card shadow-sm">
                                {
                                    (address == "No Address")
                                        ? (<p className='p-2'>No Address..!</p>)
                                        : (<div className="p-3">
                                            <p className="mb-1">
                                                {address}
                                            </p>
                                    </div>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
