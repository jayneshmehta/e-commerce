import React, { useEffect, useState } from 'react'

export default function Wishlist({ products, wishlist }) {

  return (
    products.map((items) => {
      var id = (items.id).toString();
      if (wishlist.includes("'"+items.id+"'")) {
        return (
          < div className='container' >
            "hellooo"
            {items}
          </div >
        )
      }
    })
  )
}
