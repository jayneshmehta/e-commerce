import React from 'react'
import Productcard from './Productcard';


export default function OffersOfDay({product}) {

    return (
        <div className="container mt-3 ">
            <div className="card">
                <div className="card-body p-0">
                    <div className="row gx-0">
                        <div className="col-3  pe-2 border-end pb-5 pt-2 ps-2">
                            <h3 className='ps-2'>Deals and offers</h3>
                            <p className='text-muted ps-2'>Hygiene equipments</p>
                            <div className='d-flex text-center'>
                                <div className='ms-2'>
                                    <div className=" bg-secondary text-light px-2 rounded-2 fs-2">
                                        02
                                    </div>
                                    <div>
                                        <p>Days</p>
                                    </div>
                                </div>
                                <div className='ms-3'>
                                    <div className=" bg-secondary text-light px-2 rounded-2 fs-2">
                                        05
                                    </div>
                                    <div>
                                        <p>Hours</p>
                                    </div>
                                </div>
                                <div className='ms-3'>
                                    <div className=" bg-secondary text-light px-2 rounded-2 fs-2">
                                        {24}
                                    </div>
                                    <div>
                                        <p>Min</p>
                                    </div>
                                </div>
                                <div className='ms-3'>
                                    <div className=" bg-secondary text-light px-2 rounded-2 fs-2">
                                        {33}
                                    </div>
                                    <div>
                                        <p>Sec</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-9 ps-2" >
                            <div className='d-flex scroller'>
                                {
                                    product.map((items, index) => {
                                        if (items.discountPercentage > 16) {
                                            return (
                                                <Productcard items = {items} key={index} index={index}/>
                                                );
                                            }
                                        })
                                    }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
