import { Slider } from '@mui/material'
import React, { useState } from 'react'
import $ from 'jquery'; 

export default function FilterByPrice({ filter,ranges }) {
    const [range, setrange] = useState(ranges);
    $(document).on("submit", "#price_form", function (e) {
        e.preventDefault();
        const min = $("#min").val()
        const max = $("#max").val()
        const range = $("#range").val()
        let data = {
            max: parseInt(max),
            min: parseInt(min),
            range: parseInt(range)
        }
        filter(data);
    })
    function handlechange(){
        $("#showPrice").html(`Price:- ${range} `);
    }
    return (
        <div>
            <div className="pb-3">
                <form action="" id='price_form'>
                    <label forhtml="min" id="showPrice" className="form-label" onChange={handlechange()}>Price:- ${range} </label>
                    <input type="range" name='range' className="form-range" id='range' defaultValue={1800} min="0" max="1800" onChange={(e) => { setrange(e.target.value) }} />
                    <div className="row mb-2 g-2">
                        <div className="col-6">
                            <label forhtml="min" className="form-label">Min</label>
                            <input className="form-control" id="min" placeholder="$0" />
                        </div>
                        <div className="col-6">
                            <label forhtml="max" className="form-label d-flex justify-content-end">Max</label>
                            <input className="form-control" id="max" placeholder="$9999" />
                        </div>
                    </div>
                    <button className="btn btn-light text-primary w-100" type="submit">Apply</button>
                </form>
            </div>
        </div >
    )
}
