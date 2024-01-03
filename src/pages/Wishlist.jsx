import React, { useEffect, useState } from 'react'
import ProductCard from '../component/Cart/ProductCard'
import axios from 'axios';
import env from "react-dotenv";
import Swal from 'sweetalert2';
import EmptyCart from '../component/Cart/EmptyCart';
import EmpltyWishlist from '../component/Wishlist/EmpltyWishlist';
import { useSelector } from 'react-redux';
import { REMOVE_WISHLIST } from '../ReduxStore/Action';

export default function Wishlist() {
  const userdata = useSelector((state) => state.userdata);
  const wishlist = useSelector((state) => state.wishlist);
  const products = useSelector((state) => state.product);



  return (
    <>
      {
        wishlist.length <= 1 ? < EmpltyWishlist /> :
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
                                <ProductCard items={items} wishlistpage={true} />
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