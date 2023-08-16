import { Height } from '@mui/icons-material'
import React from 'react'
import Countcard from './Countcard'
import ProductsWithSub_category, {GetOrders,GetUsers} from '../AllStates'
export default function Dashboard() {
    const product = ProductsWithSub_category(); 
    console.log();
    return (
        <div className="container mb-5" style={{ height: '100vh' }}>
            <div className="row gx-0 justify-content-center mt-3  gap-3">
                <Countcard heading={"Total products : "} count={ProductsWithSub_category().length} />
                <Countcard heading={"Total users : "} count={GetUsers().length} />
                <Countcard heading={"Total orders : "} count={GetOrders().length} />
                <Countcard heading={"Total coupons : "} count={0} />
            </div>
            <div className="row mt-5">
                <div className="offset-lg-3 col-lg-6 col-md-12 col-12 text-center">
                    <img src="https://static.vecteezy.com/system/resources/previews/002/800/120/non_2x/admin-control-panel-vector.jpg" alt="" style={{ height: '600px' }} className="img-fluid mb-4" />
                </div>
            </div>
        </div>

    )
}
