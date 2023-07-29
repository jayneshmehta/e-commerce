import React from 'react'
import ShowBuyProducts from '../component/Cart/ShowBuyProducts'

export default function Cart({ Buyproduct ,RemoveShoppingCart ,ChangeQuantity}) {
  return (
    <div >
      <ShowBuyProducts Buyproduct={Buyproduct} RemoveShoppingCart={RemoveShoppingCart} ChangeQuantity={ChangeQuantity}/>
    </div>
  )
}
