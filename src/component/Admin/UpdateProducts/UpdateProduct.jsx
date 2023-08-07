import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function UpdateProduct() {

    const location = useLocation()
    const product_id = location.state;
    const [product, setProduct] = useState([]);
    const [images, setImages] = useState([]);
    useEffect(() => {
        let Baseurl = `http://192.168.101.102/api/products/GettingProductById-${1}`;
        axios.get(Baseurl).then(async (responce) => {
            setProduct(responce.data);
        });
    }, [product_id])


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
                $("#category_id").append(`<option value=${item.id}>${item.Sub_category_Name}</option>`);
            })
        });
    }

    const Updateproduct = async (e) => {
        e.preventDefault();
        $("#message").html(`<div class="spinner-border" role="status"><span class="sr-only"></span></div>`);
        $("small").text("");
        var data = new FormData(e.target);
        const BaseUrl = `http://192.168.101.102/api/products/UpdateProductById-1`;
        await axios.post(BaseUrl, data)
            .then((response) => {
                Swal.fire({
                    title: 'Update Product..',
                    type: 'success',
                    icon: 'success',
                    text: `${response.data.message}`,
                });
                let message = response.data.message;
                $("#message").html(`<p class='text-center text-success'>${message}</p>`)
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
                    <div class="row justify-content-center fs-3 text-primary mb-4">
                        Update Product
                    </div>
                    <form action="" method="post" id="AddProductForm" onSubmit={(e) => Updateproduct(e)}>

                        <div class="form-outline mb-4">
                            <label for="title">Title : </label>
                            <input type="text" id="title" name='title' class="form-control" defaultValue={product.title} placeholder="title" />
                            <small id="errtitle" class="text-danger"></small>
                        </div>

                        <div class="form-outline mb-4">
                            <label for="brand">Brand : </label>
                            <input type="text" id="brand" name='brand' class="form-control" defaultValue={product.brand} placeholder="brand" />
                            <small id="errbrand" class="text-danger"></small>
                        </div>

                        <div class="form-outline mb-4">
                            <label for="description">Description : </label>
                            <textarea type="text" id="description" name='description' defaultValue={product.description} class="form-control"
                                placeholder="add description"></textarea>
                            <small id="errdescription" class="text-danger"></small>
                        </div>


                        <div class="form-outline mb-4">
                            <label for="price">Price : </label>
                            <input type="number" id="price" name='price' class="form-control" defaultValue={product.price} placeholder="price" />
                            <small id="errprice" class="text-danger"></small>
                        </div>

                        <div class="form-outline mb-4">
                            <label for="rating">Discount Percentage : </label>
                            <input type="discountPercentage" id="discountPercentage" name='discountPercentage' defaultValue={product.discountPercentage} class="form-control" placeholder="Discount Percentage" />
                            <small id="errdiscountPercentage" class="text-danger"></small>
                        </div>

                        <div class="form-outline mb-4">
                            <label for="stock">stock : </label>
                            <input type="stock" id="stock" name='stock' class="form-control" defaultValue={product.stock} placeholder="stock " />
                            <small id="errstock" class="text-danger"></small>
                        </div>

                        <div class="form-outline mb-4">
                            <label for="category" class="form-label">Categories</label>
                            <select class="form-select " name="category" defaultValue={product.category_id} id="category" onChange={(e) => { getSubCategory(e) }}>
                                <option>Choose Categories </option>
                                {
                                    category.map((items) => {
                                        return <option value={items.id}>{items.name}</option>;
                                    })
                                }
                            </select>
                            <small id="errcategories" class="text-danger"></small>
                        </div>
                        <div class="form-outline mb-4">
                            <label for="category" class="form-label">Sub_Categories</label>
                            <select class="form-select " name="category_id" defaultValue={product.category_id} id="category_id">
                                <option value="" selected>Choose Sub_Categories </option>
                            </select>
                            <small id="errcategory_id" class="text-danger"></small>
                        </div>

                        <div class="row">
                            <div class="form-outline mb-4 col-4">
                                <label for="thumbnail">Thumbnail : </label>
                                <input type="file" id="thumbnail" name='thumbnail' accept="image/jpe,image/jpeg,image/png,image/webp" class="form-control" placeholder="thumbnail" onChange={(e) => { imagesPreview(e.target, '#thumbnail_prev'); }} />
                                <small id="errthumbnail" class="text-danger"></small>
                            </div>
                            <div class="col-7" id='thumbnail_prev'>
                                <img class=' border border-2 border-dark rounded p-1' src={product.thumbnail} width='100px' height="70px" alt="" srcset="" id="thumbnail_img" />
                            </div>
                        </div>

                        <div class="row">

                            <div class="form-outline mb-4 col-4">
                                <label for="images">Add Images : </label>
                                <input type="file" id="images" name='images[]' class="form-control" accept="image/jpe,image/jpeg,image/png,image/webp" placeholder="add images" multiple="multiple" onChange={(e) => { imagesPreview(e.target, '#image_src'); }} />
                                <small id="errimages" class="text-danger"></small>
                            </div>
                            <div class="col-7" id="image_src">
                                {
                                    (product.images)?.split(",").map((items) => {
                                        return (
                                            <img class=' border border-2 border-dark rounded p-1' src={items} width='100px' height="70px" alt="" srcset="" ></img>
                                        )
                                    })
                                }
                            </div>

                        </div>
                        <button id="update" class="btn btn-primary w-100" tabindex="4">Update product</button>
                        <div class="h-25 text-center mt-3" id="message">
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
