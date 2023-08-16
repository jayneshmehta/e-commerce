import React from 'react'

export default function FooterAdd() {
    return (
        <div className="container mb-3">
            <article className="card border-0 bg-primary bg-cover" style={{     backgroundSize: 'cover',  backgroundImage: "url(https://bootstrap-ecommerce-web.netlify.app/images/banners/bg-warehouse.jpg)"}}>
                <div className="card-body">
                    <a href="" className="mt-2 me-3 float-end btn btn-warning">Learn more</a>
                    <h4 className="text-white">Super discount on more than 100 USD</h4>
                    <p className="text-white mb-0">You ever write dummy info</p>
                </div>
            </article>
        </div>
    )
}
