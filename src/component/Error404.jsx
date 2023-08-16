import React from 'react'
import { Link } from 'react-router-dom'

export default function Error404() {
    return (
        <div>
            <div className="container mb-5">
                <div className="row mb-5">
                    <div className="offset-lg-3 col-lg-6 col-md-12 col-12 text-center">
                        <img src="https://img.freepik.com/free-vector/404-error-with-portals-concept-illustration_114360-7870.jpg?w=2000" alt="" className="img-fluid mb-4" />
                        <p className="mb-4">
                            Are you lost let's start from the beginning..
                        </p>
                        <Link to={'/'} className="btn btn-primary">Return to home</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
