import React from 'react'
import ShowBuyProducts from '../component/Cart/ShowBuyProducts'
import store from '../ReduxStore/Store';
import { useSelector } from 'react-redux';
import { ADD_CART } from '../ReduxStore/Action';

export default function Cart({ addWishList }) {
  const Buyproduct = useSelector((state) => state.buyproduct);
  const setBuyproduct = (product) => {
    const found = Buyproduct.some(items => items.id === product.id);
    if (!found) {
      store.dispatch({ type: ADD_CART, payload: product })
      // (setbuyproduct([...Buyproduct, product]))
    }
  }
  return (
    <div >
      <ShowBuyProducts Buyproduct={Buyproduct} addWishList={addWishList}  />
    </div>
  )
}
