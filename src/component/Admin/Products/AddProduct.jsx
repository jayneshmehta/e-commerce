import axios from 'axios';
import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import Swal from 'sweetalert2';
export default function AddProduct() {
  const Addproduct = async (e) => {
    e.preventDefault();
    $("#message").html(`<div class="spinner-border" role="status"><span class="sr-only"></span></div>`);
    $("small").text("");
    var data = new FormData(e.target);
    const BaseUrl = "http://192.168.101.102/api/products";
    await axios.post(BaseUrl, data)
      .then((response) => {
        Swal.fire({
          title: 'New Product..',
          type: 'success',
          icon: 'success',
          text: `${response.data.message}`,
        });
        let message = response.data.message;
        $("#message").html(`<p class='text-center text-danger'>${message}</p>`)
      })
      .catch((error) => {
        if (error.response.data.errors) {
          var errors = error.response.data.errors;
          for (let x in errors) {
            $(`#err${x}`).text(errors[x]);
          }
        }
        let message = error.response.data.message;
        $("#message").html(`<p class='text-center text-danger'>${message}</p>`)
      })
  }

  const [category, setCategory] = useState([])
  var baseURL1 = 'http://192.168.101.102/api/categorys';
  useEffect(() => {
    axios.get(baseURL1).then((response1) => {
      setCategory(response1.data);
    });
  }, []);

  const getSubCategory = (e) => {
    var id = e.target.value;
    $("#category_id").html('<option value=" ">Choose Sub_categories </option>');
    var baseURL2 = `http://192.168.101.102/api/getSub_categoryByCategoryId-${id}`;
    axios.get(baseURL2).then((response2) => {
      response2.data.map((item) => {
      return item.Sub_category_Name
      })
    });
  }

    var imagesPreview = function (input, placeToInsertImagePreview) {

      if (input.files) {
        var filesAmount = input.files.length;

        $(placeToInsertImagePreview).html(``);
        for (let i = 0; i < filesAmount; i++) {
          console.log(filesAmount);
          var reader = new FileReader();
          reader.onload = function (event) {
            $(placeToInsertImagePreview).append(`<img class=' border border-2 border-dark rounded p-1' src="${event.target.result}" width ='100px' height="70px" alt="" srcset="" >`);
          }
          reader.readAsDataURL(input.files[i]);
        }
      }
    };

  return (
    <div className="container">
      <div className="row justify-content-center mt-3" >
        <div className="col-9 bg-light p-4 rounded">
          <div className="row justify-content-center fs-3 text-primary mb-4">
            Add Product
          </div>
          <form method="post" id="AddProductForm" onSubmit={(e) => { Addproduct(e) }}>

            <div className="form-outline mb-4">
              <label htmlFor="title">Title : </label>
              <input type="text" id="title" name='title' className="form-control" placeholder="title" />
              <small id="errtitle" className="text-danger"></small>
            </div>

            <div className="form-outline mb-4">
              <label htmlFor="brand">Brand : </label>
              <input type="text" id="brand" name='brand' className="form-control" placeholder="brand" />
              <small id="errbrand" className="text-danger"></small>
            </div>


            <div className="form-outline mb-4">
              <label htmlFor="description">Description : </label>
              <textarea type="text" id="description" name='description' className="form-control"
                placeholder="add description"></textarea>
              <small id="errdescription" className="text-danger"></small>
            </div>


            <div className="form-outline mb-4">
              <label htmlFor="price">Price : </label>
              <input type="number" id="price" name='price' className="form-control" placeholder="price" />
              <small id="errprice" className="text-danger"></small>
            </div>


            <div className="form-outline mb-4">
              <label htmlFor="rating">Discount Percentage : </label>
              <input type="discountPercentage" id="discountPercentage" name='discountPercentage' className="form-control" placeholder="Discount Percentage" />
              <small id="errdiscountPercentage" className="text-danger"></small>
            </div>


            <div className="form-outline mb-4">
              <label htmlFor="stock">stock : </label>
              <input type="stock" id="stock" name='stock' className="form-control" placeholder="stock " />
              <small id="errstock" className="text-danger"></small>
            </div>


            <div className="form-outline mb-4">
              <label htmlFor="category" className="form-label">Categories</label>
              <select className="form-select " name="category" id="category"  onChange={(e) => { getSubCategory(e) }}>
                <option>Choose Categories </option>
                {
                  category.map((items) => {
                    return <option value={items.id}>{items.name}</option>;
                  })
                }
              </select>
              <small id="errcategories" className="text-danger"></small>
            </div>

            <div className="form-outline mb-4">
              <label htmlFor="category_id" className="form-label">Sub Categories : </label>
              <select className="form-select " name="category_id" id="category_id">
                <option value=''>Choose Sub Categories </option>

              </select>
              <small id="errcategory_id" className="text-danger"></small>
            </div>


            <div className="row">

              <div className="form-outline mb-4 col-4">
                <label htmlFor="thumbnail">Thumbnail : </label>
                <input type="file" id="thumbnail" name='thumbnail' accept="image/jpe,image/jpeg,image/png,image/webp" className="form-control" placeholder="thumbnail" onChange={(e) => { imagesPreview(e.target, '#thumbnail_prev'); }}/>
                <small id="errthumbnail" className="text-danger"></small>
              </div>
              <div className="col-7" id='thumbnail_prev'>

              </div>
            </div>

            <div className="row">

              <div className="form-outline mb-4 col-4">
                <label htmlFor="images">Add Images : </label>
                <input type="file" id="images" name='images[]' className="form-control" accept="image/jpe,image/jpeg,image/png,image/webp" placeholder="add images" multiple="multiple" onChange={(e) => { imagesPreview(e.target, '#image_src'); }}/>
                <small id="errimages" className="text-danger"></small>
              </div>
              <div className="col-7" id="image_src">
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-4">
                <button id="add" className="btn btn-primary w-100" tabIndex="4">Add product</button>
              </div>
            </div>
            <div className="h-25 text-center mt-3" id="message">
            </div>
          </form>
        </div>
      </div>
    </div >
  )
}
