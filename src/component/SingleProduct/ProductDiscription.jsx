import React from 'react'

export default function ProductDiscription({ product }) {
    return (
        <div className="card text-start ">
            <div className="card-body">
                <ul className="nav nav-tabs card-header-tabs bg-light">
                    <li className="nav-item">
                        <a className="nav-link active" data-bs-toggle="tab" data-bs-target="#details" aria-current="true" href="#">Description</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-bs-toggle="tab" data-bs-target="#reviews" href="#">Reviews</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-bs-toggle="tab" data-bs-target="#shipping" href="#">Shipping</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link " data-bs-toggle="tab" data-bs-target="#seller" href="#">About seller</a>
                    </li>
                </ul>
                <div className="tab-content card-body">
                    <article className="tab-pane active" id="details" role="tabpanel">
                        <h6>Description</h6>
                        {product.description}
                    </article>
                    <article className="tab-pane" id="reviews" role="tabpanel">
                        <h6>Reviews </h6>
                        Culpa reprehenderit, nam doloribus possimus sapiente quo cumque maxime rerum. Sit repellat nisi consequuntur assumenda, ipsam ab aut hic sint laboriosam tempore!
                    </article>

                    <article className="tab-pane" id="shipping" role="tabpanel">
                        <h6>Shipping information </h6>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa reprehenderit, nam doloribus possimus sapiente quo cumque maxime rerum. Sit repellat nisi consequuntur assumenda, ipsam ab aut hic sint laboriosam tempore!
                    </article>

                    <article className="tab-pane " id="seller" role="tabpanel">
                        <h6>About seller </h6>
                        Seller Culpa reprehenderit, nam doloribus possimus sapiente quo cumque maxime rerum. Sit repellat nisi consequuntur assumenda, ipsam ab aut hic sint laboriosam tempore!
                    </article>
                </div>
            </div>
        </div>
    )
}
