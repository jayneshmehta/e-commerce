import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import env from "react-dotenv";
import Swal from 'sweetalert2';
import { imagesPreview } from '../AllStates';

export default function UpdateProduct() {

    const location = useLocation()
    const product_id = location.state;
    const [product, setProduct] = useState([]);
    useEffect(() => {
        let Baseurl = `${env.API_URL}products/GettingProductById-${product_id}`;
        axios.get(Baseurl).then(async (responce) => {
            setProduct(responce.data);
        });
    }, [product_id])


    const [category, setCategory] = useState([])
    var baseURL1 = env.API_URL+'categorys';
    useEffect(() => {
        axios.get(baseURL1).then((response1) => {
            setCategory(response1.data);
        });
    }, []);

    const getSubCategory = (e) => {
        var id = e.target.value;
        $("#category_id").html('<option value=" ">Choose Sub_categories </option>');
        var baseURL2 = `${env.API_URL}getSub_categoryByCategoryId-${id}`;
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
        const BaseUrl = `${env.API_URL}products/UpdateProductById-${product_id}`;
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



    return (
        <div className="container">
            <div className="row justify-content-center mt-3" >
                <div className="col-9 bg-light p-4 rounded">
                    <div className="row justify-content-center fs-3 text-primary mb-4">
                        Update Product
                    </div>
                    <form action="" method="post" id="AddProductForm" onSubmit={(e) => Updateproduct(e)}>
                        <div className="form-outline mb-4">
                            <label htmlFor="title">Title : </label>
                            <input type="text" id="title" name='title' className="form-control" defaultValue={product.title} placeholder="title" />
                            <small id="errtitle" className="text-danger"></small>
                        </div>

                        <div className="form-outline mb-4">
                            <label htmlFor="brand">Brand : </label>
                            <input type="text" id="brand" name='brand' className="form-control" defaultValue={product.brand} placeholder="brand" />
                            <small id="errbrand" className="text-danger"></small>
                        </div>

                        <div className="form-outline mb-4">
                            <label htmlFor="description">Description : </label>
                            <textarea type="text" id="description" name='description' defaultValue={product.description} className="form-control"
                                placeholder="add description"></textarea>
                            <small id="errdescription" className="text-danger"></small>
                        </div>


                        <div className="form-outline mb-4">
                            <label htmlFor="price">Price : </label>
                            <input type="number" id="price" name='price' className="form-control" defaultValue={product.price} placeholder="price" />
                            <small id="errprice" className="text-danger"></small>
                        </div>

                        <div className="form-outline mb-4">
                            <label htmlFor="rating">Discount Percentage : </label>
                            <input type="discountPercentage" id="discountPercentage" name='discountPercentage' defaultValue={product.discountPercentage} className="form-control" placeholder="Discount Percentage" />
                            <small id="errdiscountPercentage" className="text-danger"></small>
                        </div>

                        <div className="form-outline mb-4">
                            <label htmlFor="stock">stock : </label>
                            <input type="stock" id="stock" name='stock' className="form-control" defaultValue={product.stock} placeholder="stock " />
                            <small id="errstock" className="text-danger"></small>
                        </div>

                        <div className="form-outline mb-4">
                            <label htmlFor="category" className="form-label">Categories</label>
                            <select className="form-select " name="category" defaultValue={product.category_id} id="category" onChange={(e) => { getSubCategory(e) }}>
                                <option>Choose Categories </option>
                                {
                                    category.map((items, index) => {
                                        return <option value={items.id} key={index}>{items.name}</option>;
                                    })
                                }
                            </select>
                            <small id="errcategories" className="text-danger"></small>
                        </div>
                        <div className="form-outline mb-4">
                            <label htmlFor="category" className="form-label">Sub_Categories</label>
                            <select className="form-select " name="category_id" defaultValue={product.category_id} id="category_id">
                                <option value="" >Choose Sub_Categories </option>
                            </select>
                            <small id="errcategory_id" className="text-danger"></small>
                        </div>

                        <div className="row">
                            <div className="form-outline mb-4 col-4">
                                <label htmlFor="thumbnail">Thumbnail : </label>
                                <input type="file" id="thumbnail" name='thumbnail' accept="image/jpe,image/jpeg,image/png,image/webp" className="form-control" placeholder="thumbnail" onChange={(e) => { imagesPreview(e.target, '#thumbnail_prev'); }} />
                                <small id="errthumbnail" className="text-danger"></small>
                            </div>
                            <div className="col-7" id='thumbnail_prev'>
                                <img className=' border border-2 border-dark rounded p-1' src={product.thumbnail} width='100px' height="70px" alt="" srcSet="" id="thumbnail_img" />
                            </div>
                        </div>

                        <div className="row">

                            <div className="form-outline mb-4 col-4">
                                <label htmlFor="images">Add Images : </label>
                                <input type="file" id="images" name='images[]' className="form-control" accept="image/jpe,image/jpeg,image/png,image/webp" placeholder="add images" multiple="multiple" onChange={(e) => { imagesPreview(e.target, '#image_src'); }} />
                                <small id="errimages" className="text-danger"></small>
                            </div>
                            <div className="col-7" id="image_src">
                                {
                                    (product.images)?.split(",").map((items, index) => {
                                        return (
                                            <img className=' border border-2 border-dark rounded p-1' key={index} src={items} width='100px' height="70px" alt="" srcSet="" ></img>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className='col-4'>
                                <button id="update" className="btn btn-primary w-100" tabIndex="4">Update product</button>
                            </div>
                        </div>
                        <div className="h-25 text-center mt-3" id="message">
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
