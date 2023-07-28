import React from 'react'
import $ from 'jquery';

export default function SelectQuantity({products,ChangeQuantity}) {

  Object.assign(products, {quantity:  products.quantity });
  $(document).on("change",`#quantity${products.id}`,function(){
    Object.assign(products, {quantity:  $(`#quantity${products.id}`).val() });

      ChangeQuantity($(`#quantity${products.id}`).val(),products.id)
  })

  setTimeout(() => {
    if(products.quantity){
      $(`select[id='quantity${products.id}']`).find(`option[value=${products.quantity}]`).attr("selected",true);
    }
  }, 1000);
  return (
    <div className="d-flex mb-3 align-items-center">
      <div>
    <label htmlFor="quantity" className='fw-bolder me-2'>Quantity : </label>
      </div>
      <div>
      <select className="form-select " name="quantity" id={`quantity${products.id}`} >
        <option value="1" >1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      </div>
    </div>
  )
}
