import { Rating } from '@mui/material'
import React from 'react'
import $ from 'jquery';

export default function FilterByRating({filter}) {
  $(document).on("click", "input[type='checkbox']", function (e) {
    var array = [];
    $("input[type='checkbox']:checked").each(function () {
      array.push(parseInt($(this).val()));
    });
    filter(array);
  });

  return (
    <div className='ps-4'>
      <form action="" >
        <div className="form-check">
          <input  id="5star" className="form-check-input ratingfilter" name='ratingfilter' type="checkbox" value="5"  />
          <Rating htmlFor='5star' name="read-only[]"  value={5} style={{ color: "#fc8200" }} readOnly />
        </div>
        <div className="form-check">
          <input  id="4star" className="form-check-input ratingfilter" name='ratingfilter' type="checkbox" value="4"  />
          <Rating htmlFor='4star' name="read-only[]"  value={4} style={{ color: "#fc8200" }} readOnly />
        </div>
        <div className="form-check">
          <input  id="3star" className="form-check-input ratingfilter" name='ratingfilter' type="checkbox" value="3"  />
          <Rating htmlFor='3star' name="read-only[]"  value={3} style={{ color: "#fc8200" }} readOnly />
        </div>
        <div className="form-check">
          <input  id="2star" className="form-check-input ratingfilter" name='ratingfilter' type="checkbox" value="2"  />
          <Rating htmlFor='2star' name="read-only[]"  value={2} style={{ color: "#fc8200" }} readOnly />
        </div>
      </form>
    </div>
  )
}
