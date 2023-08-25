import React from 'react'
import Countcard from './Countcard'
import ProductsWithSub_category, { GetOrders, GetUsers } from '../AllStates'
import OrderedGraph from './OrderedGraph';
import PieActiveArc from './PieActiveArc';
import Salesgraph from './Salesgraph';
import Alloversales from './Alloversales';

export default function Dashboard() {
    const product = ProductsWithSub_category();
    return (
        <div className="container mb-5" style={{ height: '100vh' }}>
            <div className="row gx-0 justify-content-center mt-3  gap-3">
                <Countcard heading={"Total products : "} count={ProductsWithSub_category().length} />
                <Countcard heading={"Total users : "} count={GetUsers().length} />
                <Countcard heading={"Total orders : "} count={GetOrders().length} />
                <Countcard heading={"Total coupons : "} count={0} />

                {/* <div className="offset-lg-3 col-lg-6 col-md-12 col-12 text-center">
                    <img src="https://static.vecteezy.com/system/resources/previews/002/800/120/non_2x/admin-control-panel-vector.jpg" alt="" style={{ height: '200px' }} className="img-fluid mb-4" /> */}
                {/* </div> */}
                <div className="row mt-5">
                    <div className="col-6">
                        <strong>Sales graph (monthly): </strong>
                        <Salesgraph />
                    </div>
                    <div className="col-6">
                        <strong>Orders graph Quarter wise: </strong>
                        <OrderedGraph />
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-6">
                        <strong >Orders Status graph : </strong>
                        <div className='mt-5 pe-5'>
                            <PieActiveArc />
                        </div>
                    </div>
                    <div className="col-6">
                        <strong >All Years orders graph : </strong>
                        <div className=''>
                            <Alloversales />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
