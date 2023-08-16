import React, { useState } from 'react'
import { FaStar } from 'react-icons/fa'

export default function ReviewGraph({ review }) {
   var star1 = 0
   var star2 = 1
   var star3 = 0
   var star4 = 4
   var star5 = 0
   var ratingCount = 2
   console.log(review);
    // const [star1,setstar1] = useState([]) ;
    // const [star2,setstar2] = useState([]) ;
    // const [star3,setstar3] = useState([]) ;
    // const [star4,setstar4] = useState([]) ;
    // const [star5,setstar5] = useState([]) ;
    // const [ratingCount,setratingCount] = useState(0) ;
    // review.map((items)=>{
    // setratingCount(ratingCount+1);
    // var rate = Math.floor(items.rating);
    // switch (parseInt(rate)) {
    //     case 1:
    //         setstar1(star1+1);
    //         break;
    //     case 2:
    //         setstar2(star2+1);
    //         break;
    //     case 3:
    //         setstar3(star3+1);
    //         break;
    //     case 4:
    //         setstar4(star4+1);
    //         break;
    //     case 5:
    //         setstar5(star5+1);
    //         break;

    //     default:
    //         break;
    //     }    
    // })
    return (
        <div className="row">
            <div className="row align-items-center" style={{ height: "200px" }}>
                <div className="col-4 d-flex flex-column align-items-center  border-end border-2">
                    <div className="d-flex align-items-center mb-2">
                        <h2 className="mx-1 mb-0">{4}</h2>
                        <FaStar className='fw-bolder fs-4' style={{ color: "#ff7829" }} />
                    </div>
                    <p className="lh-1 fs-6">{ratingCount} Rating &amp; <br />{ratingCount} Review</p>
                </div>
                <div className="col-8">
                    <div className="d-flex align-items-center">
                        <p className="ms-2 mb-0">5</p><FaStar className='fw-bolder' style={{ color: "#ff7829" }} />
                        <div className="progress border ms-3" role="progressbar" aria-label="Basic example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ width: "100%", height: "6px" }}>
                            <div className="progress-bar w-0" style={{ backgroundColor: "rgb(255 107 65" }} ></div>
                        </div>
                        <div className="ms-3">{star5}</div>
                    </div>
                    <div className="d-flex align-items-center">
                        <p className="ms-2 mb-0">4</p><FaStar className='fw-bolder' style={{ color: "#ff7829" }} />
                        <div className="progress border ms-3" role="progressbar" aria-label="Basic example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ width: "100%", height: "6px" }}>
                            <div className="progress-bar w-75 " style={{ backgroundColor: "rgb(255 107 65" }} ></div>
                        </div>
                        <div className="ms-3">{star4}</div>
                    </div>
                    <div className="d-flex align-items-center">
                        <p className="ms-2 mb-0">3</p><FaStar className='fw-bolder' style={{ color: "#ff7829" }} />
                        <div className="progress border ms-3" role="progressbar" aria-label="Basic example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ width: "100%", height: "6px" }}>
                            <div className="progress-bar w-0" style={{ backgroundColor: "rgb(255 107 65" }} ></div>
                        </div>
                        <div className="ms-3">{star3}</div>
                    </div>
                    <div className="d-flex align-items-center">
                        <p className="ms-2 mb-0">2</p><FaStar className='fw-bolder' style={{ color: "#ff7829" }} />
                        <div className="progress border ms-3" role="progressbar" aria-label="Basic example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ width: "100%", height: "6px" }}>
                            <div className="progress-bar  w-50" style={{ backgroundColor: "rgb(255 107 65" }} ></div>
                        </div>
                        <div className="ms-3">{star2}</div>
                    </div>
                    <div className="d-flex align-items-center">
                        <p className="ms-2 mb-0">1</p><FaStar className='fw-bolder' style={{ color: "#ff7829" }} />
                        <div className="progress border ms-3" role="progressbar" aria-label="Basic example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ width: "100%", height: "6px" }}>
                            <div className="progress-bar  w-0" style={{ backgroundColor: "rgb(255 107 65" }} ></div>
                        </div>
                        <div className="ms-3">{star1}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
