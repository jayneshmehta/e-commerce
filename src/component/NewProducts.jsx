import React from 'react'
import { Link } from 'react-router-dom';
import ApiCalls from '../ApiCalls';

export default function NewProducts({ title, countOfProduct }) {
  const product = ApiCalls();
  function getMultipleRandom(product, num) {
    const shuffled = [...product].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  }
  return (
    <div className='container pb-5'>
      <h3 className='my-3'>{title}</h3>
      <div className='d-flex flex-wrap gap-4'>
        {
          getMultipleRandom(product, countOfProduct).map((items, index) => {
            if (index < 10) {
              return (
                <div className=' mx-auto ' key={index}>
                  <div className="card col-2 border-0 rounded " style={{ width: '15rem', height: '18rem' }} >
                    <div className='h-50'>
                      <img src={items.thumbnail} style={{ height: '170px', objectFit: 'cover', }} className="p-3 card-img-top rounded zoom" alt="..." />
                    </div>
                    <div className="card-body h-50 mt-1">
                      <h5>${items.price}</h5>
                      <Link to={'/product'} state={items.id} className="card-text text-decoration-none"><p className=' text-truncate text-capitalize fw-bold text-secondary productlink'>{items.title}</p></Link>
                      <p className='text-secondary p-0'>{items.brand}</p>
                    </div>
                  </div>
                </div>
              );
            }
          })
        }
      </div>
    </div>
  )
}
