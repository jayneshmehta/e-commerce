import React, { useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa'

export default function ReviewGraph({ review }) {
    var starRating = [];
    var total = 0;
    var total_count = 0;
    var reviews = 0;
    for (let i = 1; i <= 5; i++) {
        var count = 0;
        review.map((items) => {
            (i == 1 && items.comments) && (reviews++);
            if (parseInt(items.rating) == i) {
                count++;
            }
        })
        total += i * count;
        total_count += count;
        starRating.push({
            star: i,
            count: count,
        })
    }
    const [ratingCount, setratingCount] = useState(review?.length);
    const [avgRating, setAvgRating] = useState(0);
    useEffect(() => {
        setratingCount(review?.length)
        setAvgRating((total / total_count));
    }, [review])

    return (
        <div className="row">
            <div className="row align-items-center" style={{ height: "200px" }}>
                <div className="col-4 d-flex flex-column align-items-center  border-end border-2">
                    <div className="d-flex align-items-center mb-2">
                        <h2 className="mx-1 mb-0">{(review.length == 0) ? 0 : parseFloat(avgRating)}</h2>
                        <FaStar className='fw-bolder fs-4' style={{ color: "#ff7829" }} />
                    </div>
                    <p className="lh-1 fs-6">{ratingCount} Rating &amp; <br />{reviews} Review</p>
                </div>
                <div className="col-8">
                    {
                        starRating.map((items, index) => {
                            var ratingpercent = (items.count * 100) / ratingCount;
                            var showingpercentage = (ratingpercent >= 75) ? 100 : (ratingpercent > 50 && ratingpercent <= 75) ? 75 : (ratingpercent > 25 && ratingpercent <= 50) ? 50 : (ratingpercent > 50 && ratingpercent <= 25) ? 25 : 0
                            return (<div className="d-flex align-items-center" key={index}>
                                <p className="ms-2 mb-0">{index + 1}</p><FaStar className='fw-bolder' style={{ color: "#ff7829" }} />
                                <div className="progress border ms-3" role="progressbar" aria-label="Basic example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ width: "100%", height: "6px" }}>
                                    <div className={`progress-bar w-` + showingpercentage} style={{ backgroundColor: "rgb(255 107 65" }} ></div>
                                </div>
                                <div className="ms-3">{items.count}</div>
                            </div>)
                        })
                    }
                </div>
            </div>
        </div>
    )
}
