import React from 'react'
import SelectQuantity from '../SingleProduct/SelectQuantity'
import { Link } from 'react-router-dom'
import { ADD_CART, ADD_WISHLIST, REMOVE_CART, REMOVE_WISHLIST } from '../../ReduxStore/Action';
import store from '../../ReduxStore/Store';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import axios from 'axios';

export default function ProductCard({ items, ChangeQuantity, wishlistpage }) {
    const Buyproduct = useSelector((state) => state.buyproduct);
    const setBuyproduct = (product) => {
        const found = Buyproduct.some(items => items.id === product.id);
        if (!found) {
            store.dispatch({ type: ADD_CART, payload: product })
            // (setbuyproduct([...Buyproduct, product]))
        }
    }
    const userdata = useSelector((state) => state.userdata);
    const wishlist = useSelector((state) => state.wishlist);
    const addWishList = async (product) => {
        try {
            var data = {
                userId: userdata.id,
                productId: product.id,
            }
        } catch (err) {
            Swal.fire({
                title: 'Wishlist..',
                type: 'error',
                icon: 'error',
                text: "Please logn in first..!",
            });
            return err;
        }
        const found = wishlist.some(items => items == product.id);
        if (!found) {
            try {
                var token = JSON.parse(sessionStorage.getItem("token"));
                const config = { headers: { 'Authorization': 'Bearer ' + token } };
                var baseURL = `http://192.168.101.102/api/addOrCreate`;
                await axios.post(baseURL, data, config)
                    .then(response => {
                        Swal.fire({
                            title: 'Wishlist..',
                            type: 'success',
                            icon: 'success',
                            text: `${response.data.message}`,
                        });
                        store.dispatch({ type: ADD_WISHLIST, payload: product.id })
                        // (setWishlist(wishlist => [...wishlist, product.id]));
                        sessionStorage.setItem('wishlist', JSON.stringify([...wishlist, product.id]));
                    }).catch(
                        (error) => {
                            console.log(error);
                        }
                    )
            } catch (err) {
                console.log(err);
            }
        } else {
            Swal.fire({
                title: 'Wishlist..',
                type: 'success',
                icon: 'success',
                text: `Already in wishlist..`,
            });
        }
    }

    const RemoveShoppingCart = (id) => {
        var cartData = Buyproduct.filter((items, index) => {
            if (id !== items.id) {
                return items;
            }
        });
        console.log(cartData);
        store.dispatch({ type: REMOVE_CART, payload: cartData });
    }

    const removeWishlist = async (id) => {
        var NewWishlist = wishlist.filter((items) => (items != id));
        var data = {
            userId: userdata.id,
            productId: id.toString(),
        }
        var token = JSON.parse(sessionStorage.getItem("token"));
        const config = { headers: { 'Authorization': 'Bearer ' + token } };
        var baseURL = "http://192.168.101.102/api/removeWishlist"
        await axios.post(baseURL, (data), config)
            .then(response => {
                Swal.fire({
                    title: 'Wishlist..',
                    type: 'success',
                    icon: 'success',
                    text: `${response.data.message}`,
                });
                store.dispatch({ type: REMOVE_WISHLIST, payload: NewWishlist })
                sessionStorage.setItem('wishlist', JSON.stringify(NewWishlist));
            }).catch(
                (error) => {

                }
            )
    }

    return (
        <article className="row mb-4">
            <div className="col-lg-9 ">
                <figure className="d-flex align-items-center">
                    <div className="me-3 flex-shrink-0">
                        <img src={items.thumbnail} style={{ width: '150px', height: '100px' }} className="size-100x100 img-thumbnail" />
                    </div>
                    <figcaption className="info">
                        <Link to={'/product'} state={items.id} className='text-decoration-none title text-capitalize text-dark productlink' >{items.title}</Link>
                        <p className="text-muted">
                            {items.description}
                        </p>
                        {(wishlistpage) ? <button className="btn btn-light text-danger btn-sm me-2" id={`del_${items.id}`} onClick={() => removeWishlist(items.id)}>Remove</button>
                            : <button className="btn btn-light text-danger btn-sm me-2" id={`del_${items.id}`} onClick={() => RemoveShoppingCart(items.id)}>Remove</button>}
                        {(wishlistpage) ? <button href="#" className="btn btn-light btn-sm" onClick={() => setBuyproduct(items)}>Add to cart</button>
                            : <button href="#" className="btn btn-light btn-sm" onClick={() => addWishList(items)}>Add to wishlist</button>}
                    </figcaption>
                </figure>
            </div>
            <div className="col-lg-3">
                <div className="text-end mb-2">
                    <var className="h6">$ {parseFloat(items.price - ((items.price * items.discountPercentage) / 100)).toFixed(2)}</var>
                </div>
                <div className='d-flex justify-content-end mb-2'>
                    {(ChangeQuantity) && <SelectQuantity products={items} />}
                </div>
            </div>
        </article>
    )
}
