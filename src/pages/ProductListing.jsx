import { Breadcrumbs, Pagination, Typography } from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import FilteredProduct from '../component/ProductListing/FilteredProduct';
import FilterByProduct from '../component/ProductListing/FilterByProduct';
import FilterByRating from '../component/ProductListing/FilterByRating';
import FilterByPrice from '../component/ProductListing/FilterByPrice';
import usePagination from '../component/ProductListing/usePagination';
import Sortingdiv from '../component/ProductListing/Sortingdiv';
import { BsArrowRight } from 'react-icons/bs';
import { Refresh } from '@mui/icons-material';
import $ from 'jquery';
export default function ProductListing({ products }) {

  const [filterProduct, setFilterProduct] = useState([]);

  useEffect(() => {
    setFilterProduct(products);
  }, [products])


  let [page, setPage] = useState(1);
  const PER_PAGE = 4;

  const count = Math.ceil(filterProduct.length / PER_PAGE);
  const _DATA = usePagination(filterProduct, PER_PAGE);
  const [forcePage, setForcePage] = useState(_DATA.currentPage);

  useEffect(() => {
    setPage(1)
    _DATA.jump(1);
    $("[aria-controls='page 1'").trigger('click');
  }, [filterProduct])

  const handleChange = (e, p) => {
    console.log(_DATA);
    setPage(p);
    _DATA.jump(p);
  };

  function handelCategoryChange(category_id) {
    if (category_id) {
      setFilterProduct(products.filter((items) => {
        if (category_id == items.category_id) {
          return items;
        }
      }))
    }
  }

  function handleRatingChange(rating) {
    if (rating.length != 0) {
      setFilterProduct(filterProduct.filter((items) => {
        if (rating.includes(Math.floor(items.rating))) {
          return items;
        }
      }));
    } else {
      setFilterProduct(products)
    }
    setPage(1)
    _DATA.jump(1);
    $("[aria-controls='page 1'").trigger('click');
  }

  function handlePriceChange(pricedata) {
    setFilterProduct(products.filter((items) => {
      if ((items.price > pricedata.min && items.price < pricedata.max) || items.price < pricedata.range) {
        return items;
      }
    }));
  }

  function setSort(sort) {
    let sortedArr = products;
    if (sort.length != 0) {
      switch (sort) {
        case 'l2h':
          sortedArr = filterProduct.sort((a, b) => (a.price > b.price) ? 1 : -1);
          break;
        case 'h2l':
          sortedArr = filterProduct.sort((a, b) => (a.price < b.price) ? 1 : -1);
          break;
        case 'a2z':
          sortedArr = filterProduct.sort((a, b) => (a.title > b.title) ? 1 : -1);
          break;
        case 'z2a':
          sortedArr = filterProduct.sort((a, b) => (a.title < b.title) ? 1 : -1);
          break;
        default:
          sortedArr = products
          break;
      }
      products = sortedArr
    }

  }


  return (
    <div className='container' style={{ height: '100vh' }}>
      <div className="row">
        <Breadcrumbs aria-label="breadcrumb" className='my-3'>
          <Link className='text-decoration-none' color="text.primary" to="/">Home</Link>
          <Typography color="text.primary">All Product </Typography>
        </Breadcrumbs>
        <div className="d-flex row gx-0 justify-content-end">
          <Sortingdiv className='col-2 mb-2' sort={setSort} />
          <Pagination className='col-4 justify-content-end' count={count} color="secondary" onChange={handleChange} />
        </div>
        <div className="col-3 border border-2 rounded overflow-auto mt-3" style={{ height: "85vh" }}>
          <button className='btn btn-outline-primary rounded w-100 fs-5 fw-bolder m-0 p-2 text-center justify-content-center my-2' onClick={() => setFilterProduct(products)}>Show All <BsArrowRight strokeWidth='1' viewBox="0 2 16 16" /></button>
          <p className='fw-bolder pt-2'>Product Filter : </p>
          <FilterByProduct filter={handelCategoryChange} />
          <p className='fw-bolder pt-2'>Pricing Filter : </p>
          <FilterByPrice filter={handlePriceChange} />
          <p className='fw-bolder pt-2'>Ratings Filter : </p>
          <FilterByRating filter={handleRatingChange} />
        </div>
        <div className="col-9  overflow-auto" style={{ height: '100vh' }} >
          < FilteredProduct products={_DATA.currentData()} />
          <div className="row gx-0 my-2">
          </div>
        </div>
      </div>
    </div >
  )
}
