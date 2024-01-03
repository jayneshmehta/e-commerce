import React from 'react'
import axios from 'axios';
import env from "react-dotenv";
import { useEffect } from 'react';
import { useState } from 'react';
import CategoryName from './CategoryName'
import { Link } from 'react-router-dom'
import Productcard from './Productcard';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function CategoryProduct({ url, title, Category, Sub_Category }) {
    const [product, setProduct] = useState([])
    useEffect(() => {
        if (Sub_Category) {
            var baseURL = `${env.API_URL}products/GettingProductBySub_CategoryId-${Sub_Category}`;
        } else {
            var baseURL = `${env.API_URL}products/GettingProductByCategoryId-${Category}`;
        }
        axios.get(baseURL).then((response) => {
            setProduct(response.data);
        });
    }, [Sub_Category]);
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4,
            slidesToSlide: 4 // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 768 },
            items: 3,
            slidesToSlide: 3 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 767, min: 464 },
            items: 2,
            slidesToSlide: 1 // optional, default to 1.
        }
    };
    return (
        <div className='container mt-3' >
            <div className="card">
                <div className="row card-body p-0 gx-0">
                    <div className='col-3 p-3 ' style={{ backgroundSize: 'cover', backgroundImage: `url("${url}")` }} >
                        <CategoryName title={title} >
                            <Link to="/" className="btn btn-light ms-2 mt-4" >Source Now</Link>
                        </CategoryName>
                    </div>
                    <div className=' col-9 border-start  '>
                        <div className='row d-flex m-1'>
                            <Carousel
                                responsive={responsive}
                                // autoPlay={true}
                                swipeable={true}
                                draggable={true}
                                infinite={true}
                                partialVisible={false}
                                dotListClass="custom-dot-list-style"
                            >
                                {
                                    product.map((items, index) => {
                                        return (
                                            <Productcard items={items} key={index} index={index} />
                                        );
                                    })
                                }
                                </Carousel>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
