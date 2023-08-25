import React, { useEffect, useState } from 'react'
import $ from 'jquery';
import { useSelector } from 'react-redux';
import { SET_WISHLIST } from '../../ReduxStore/Action';
import store from '../../ReduxStore/Store';

export default function SelectQuantity({ products }) {

  const [quantity, setQuantity] = useState()

  useEffect(() => {
    setQuantity(1)
  }, [products])

  const Buyproduct = useSelector((state) => state.buyproduct);

  function handelclick(e) {
    setQuantity(e.target.value);
  }



  function ChangeQuantity(quantity, id) {
    var changeQuantity = (Buyproduct.filter((items, index) => {
      if (id == items.id) {
        items.quantity = quantity
        return items;
      } else {
        return items;
      }
    }))
    store.dispatch({ type: SET_WISHLIST, payload: changeQuantity });
  }

  $(document).on("change", `#quantity${products.id}`, function () {
    Object.assign(products, { quantity: $(`#quantity${products.id}`).val() });
    ChangeQuantity($(`#quantity${products.id}`).val(), products.id)
  })

  setTimeout(() => {
    if (products.quantity) {
      $(`select[id='quantity${products.id}']`).find(`option[value=${products.quantity}]`).attr("selected", true);
    }
    // if(products.quantity == undefined){
    //   $(`select[id='quantity${products.id}']`).find(`option[value=${1}]`).attr("selected",true);
    // }
  }, 1000);
  return (
    <div className="d-flex mb-3 align-items-center">
      <div>
        <label htmlFor="quantity" className='fw-bolder me-2'>Quantity : </label>
      </div>
      <div>
        <select className="form-select " name="quantity" id={`quantity${products.id}`} value={quantity} defaultValue={1} onChange={handelclick} >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
    </div>
  )
}
