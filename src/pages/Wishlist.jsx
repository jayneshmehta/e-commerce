import React, { useEffect, useState } from 'react'
import ProductCard from '../component/Cart/ProductCard'
import axios from 'axios';
import Swal from 'sweetalert2';
import EmptyCart from '../component/Cart/EmptyCart';
import EmpltyWishlist from '../component/Wishlist/EmpltyWishlist';

export default function Wishlist({ products, wishlist, setWishlist, userdata, setBuyproduct }) {

  const removeWishlist = async (id) => {
    var NewWishlist = wishlist.filter((items) => (items != id));
    var data = {
      userId: userdata.id,
      productId: id.toString(),
    }
    var baseURL = "http://192.168.101.102/api/removeWishlist"
    await axios.post(baseURL, (data))
      .then(response => {
        Swal.fire({
          title: 'Wishlist..',
          type: 'success',
          icon: 'success',
          text: `${response.data.message}`,
        });
        setWishlist(NewWishlist);
        sessionStorage.setItem('wishlist', JSON.stringify(NewWishlist));
      }).catch(
        (error) => {

        }
      )
  }
  return (
    <>
      {
        wishlist.length === 1 ? < EmpltyWishlist /> :
          <div className='container mt-3 ' >
            <div className="row justify-content-center">
              <div className="col-11 overflow-auto scroller" style={{ height: '80vh' }}>
                <div className="card text-start">
                  <div className="card-body">
                    <h5>WishList: </h5>
                    <div className="card-text">
                      {
                        products.map((items, index) => {
                          if (wishlist.includes(items.id)) {
                            return (
                              <div key={index}>
                                <ProductCard items={items} RemoveShoppingCart={removeWishlist} setBuyproduct={setBuyproduct} wishlistpage={true} />
                              </div>
                            )
                          }
                        }
                        )
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div >
      }
    </>
  )
}