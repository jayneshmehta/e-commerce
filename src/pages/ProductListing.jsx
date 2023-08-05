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
export default function ProductListing({ products,userdata,addWishList }) {

  const [filterProduct, setFilterProduct] = useState([]);
  const [newrating, setRating] = useState([1, 2, 3, 4, 5]);
  const [categoryId, setCategoryId] = useState(0);
  const [searching, setSearching] = useState('');
  // const [sorting, setSorting] = useState();
  const [newprice, setPrice] = useState({ max: 1800, min: 0, range: 1800 });


  //pagination...
  let [page, setPage] = useState(1);
  const PER_PAGE = 4;
  const count = Math.ceil(filterProduct.length / PER_PAGE);
  const _DATA = usePagination(filterProduct, PER_PAGE);
  let range = 1800
  useEffect(() => {
    setPage(1)
    _DATA.jump(1);
    $("[aria-controls='page 1'").trigger('click');
  }, [filterProduct])

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  useEffect(() => {
    setFilterProduct(products);
  }, [products])

  function setSort(sort) {
    switch (sort) {
      case 'l2h':
        setFilterProduct(filterProduct.sort((a, b) => (a.price > b.price) ? 1 : -1));
        break;
      case 'h2l':
       setFilterProduct(filterProduct.sort((a, b) => (a.price < b.price) ? 1 : -1));
        break;
      case 'a2z':
        setFilterProduct(filterProduct.sort((a, b) => (a.title > b.title) ? 1 : -1));
        break;
      case 'z2a':
        setFilterProduct(filterProduct.sort((a, b) => (a.title < b.title) ? 1 : -1));
        break;
      default:
        // setFilterProduct(products)
        break;
    }
    setPage(1);
    _DATA.jump(1);
  }

  // category change...
  function handelCategoryChange(category_id) {
    if (category_id) {
      setCategoryId(category_id)
    }
  }

  // rating Change... 
  function handleRatingChange(rating) {
    if (rating.length != 0) {
      setRating(rating)
    } else {
      setRating([1, 2, 3, 4, 5])
    }
    setPage(1)
    _DATA.jump(1);
    $("[aria-controls='page 1'").trigger('click');
  }

  // Price change
  function handlePriceChange(pricedata) {
    setPrice(pricedata);
  }


  function filterfun() {
    setFilterProduct(products.filter((items) => {
      if (( ((items.title).toLowerCase().includes((searching).toLowerCase())) || (items.brand.toLowerCase().includes(searching.toLowerCase()))) && (categoryId == items.category_id || categoryId == 0) && (newrating.includes(Math.floor(items.rating))) && (items.price <= newprice.range)) {
        return items;
      }
    }));
  }

  useEffect(() => {
    filterfun();
  }, [newrating, newprice, categoryId,searching])


$("#search").on('keyup',function(){
  setSearching($("#search").val());
})

  function handelClick() {
    setRating([1, 2, 3, 4, 5]);
    setPrice({ max: 1800, min: 0, range: 1800 });
    setCategoryId(0);
    $("input[name=ratingfilter]").each(function () {
      this.checked = false;
    })
    $("#range").val(1800)
    $("#min").val('')
    $("#max").val('')
    $("#showPrice").html(`Price:- ${1800} `);
  }


  return (
    <div className='container' >
      <div className="row" >
        <Breadcrumbs aria-label="breadcrumb" className='my-3'>
          <Link className='text-decoration-none' color="text.primary" to="/">Home</Link>
          <Typography color="text.primary">All Product </Typography>
        </Breadcrumbs>
        <div className="d-flex row gx-0 gap-2 justify-content-end"> 
            <input type="text" className="col-3 px-2 border border-secondary rounded"  name="" id="search" placeholder="Search..."/>
          <Sortingdiv className='col-2 mb-2' sort={setSort} />
          <Pagination className='col-4 justify-content-end' count={count} color="secondary" onChange={handleChange} />
        </div>
        <div className="col-3 border border-2 rounded overflow-auto mt-3" style={{ height: "88vh" }}>
          <button className='btn btn-outline-primary rounded w-100 fs-5 fw-bolder m-0 p-2 text-center justify-content-center my-2' onClick={() => handelClick()}>Clear all filter's <BsArrowRight strokeWidth='1' viewBox="0 2 16 16" /></button>
          <p className='fw-bolder pt-2'>Product Filter : </p>
          <FilterByProduct filter={handelCategoryChange} />
          <p className='fw-bolder pt-2'>Pricing Filter : </p>
          <FilterByPrice filter={handlePriceChange} ranges={range} />
          <p className='fw-bolder pt-2'>Ratings Filter : </p>
          <FilterByRating filter={handleRatingChange} />
        </div>
        <div className="col-9 overflow-auto " >
          <FilteredProduct products={_DATA.currentData()} userdata={userdata} addWishList={addWishList} />
        </div>
      </div>
    </div >
  )
}
