import React, { useEffect, useState } from 'react'
import Productcard from './Productcard';
import Carousel from 'react-multi-carousel';


export default function OffersOfDay({ product }) {
    var countDownDate = new Date("Aug 1 , 2023 15:37:25").getTime();

    // Update the count down every 1 second
    const [days, setDays] = useState(0)
    const [hours, setHours] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [seconds, setSeconds] = useState(0)
    useEffect(() => {
        var x = setInterval(function () {

            // Get today's date and time
            var now = new Date().getTime();
            // Find the distance between now and the count down date
            var distance = countDownDate - now;

            // Time calculations for days, hours, minutes and seconds

            // Display the result in the element with id="demo"
            // document.getElementById("demo").innerHTML = days + "d " + hours + "h "
            //     + minutes + "m " + seconds + "s ";

            setDays(Math.floor(distance / (1000 * 60 * 60 * 24)))
            setHours(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)))
            setMinutes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)))
            setSeconds(Math.floor((distance % (1000 * 60)) / 1000))


            // If the count down is finished, write some text
            if (distance < 0) {
                clearInterval(x);
            }
        }, 1000);
    }, [])
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
                                        {days}
                                    </div>
                                    <div>
                                        <p>Days</p>
                                    </div>
                                </div>
                                <div className='ms-3'>
                                    <div className=" bg-secondary text-light px-2 rounded-2 fs-2">
                                        {hours}
                                    </div>
                                    <div>
                                        <p>Hours</p>
                                    </div>
                                </div>
                                <div className='ms-3'>
                                    <div className=" bg-secondary text-light px-2 rounded-2 fs-2">
                                        {minutes}
                                    </div>
                                    <div>
                                        <p>Min</p>
                                    </div>
                                </div>
                                <div className='ms-3'>
                                    <div className=" bg-secondary text-light px-2 rounded-2 fs-2">
                                        {seconds}
                                    </div>
                                    <div>
                                        <p>Sec</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-9 ps-2" >
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
                                        if (items.discountPercentage > 16) {
                                            return (
                                                <Productcard items={items} key={index} index={index} />
                                            );
                                        }
                                    })
                                }
                                </Carousel>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
