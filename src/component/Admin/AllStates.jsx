import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import $ from 'jquery';

export default function ProductsWithSub_category() {
    const [product, setProduct] = useState([])
    const getProducts = async () => {
        var baseURL = 'http://192.168.101.102/api/productsWithSub_category';
        await axios.get(baseURL).then(async (response) => {
            setProduct(response.data);
        });
    }
    useEffect(() => {
        getProducts();
    }, []);
    return product;
}

export const deleteProduct = async (e, table) => {
    var id = (e.target.id).split("_")[1];
    try {
        var baseURL = `http://192.168.101.102/api/products/DeletingProductById-${id}`;
        await axios.delete(baseURL)
            .then((response) => {
                Swal.fire({
                    title: 'Delete..',
                    type: 'success',
                    icon: 'success',
                    text: `${response.data.message}`,
                });
                table.destroy();
                ProductsWithSub_category();
            }).catch(
                (error) => {
                    if (!error.response.data.status) {
                        Swal.fire({
                            title: 'Status..',
                            type: 'error',
                            icon: 'error',
                            text: `${error.response.data.message}`,
                        });
                    }
                    console.log(error);
                }
            )
    } catch (err) {
        console.log(err);
    }
}

export const GetUsers = () => {
    const [users, setUsers] = useState([])
    const getUsers = () => {
        var baseURL = 'http://192.168.101.102/api/user/getUsers';
        axios.get(baseURL).then((response) => {
            setUsers(response.data);
        });
    }
    useEffect(() => {
        getUsers();
    }, []);
    return users;
}

export const deleteUser = async (e, table) => {
    e.preventDefault();
    var id = (e.target.id).split("_")[1];
    try {
        var baseURL = `http://192.168.101.102/api/user/DeletingUserById-${id}`;
        await axios.delete(baseURL)
            .then(response => {
                Swal.fire({
                    title: 'Delete..',
                    type: 'success',
                    icon: 'success',
                    text: `${response.data.message}`,
                });
                table.destroy();
                GetUsers();

            }).catch(
                (error) => {
                    console.log(error);
                }
            )
    } catch (err) {
        console.log(err);
    }
}

export const GetOrders = () => {

    const [orders, setOrders] = useState([])

    const getOrders = async () => {
        var baseURL = 'http://192.168.101.102/api/orders';
        await axios.get(baseURL).then((response) => {
            setOrders(response.data);
        });
    }
    useEffect(() => {
        getOrders();
    }, []);

    return orders;
}

export const Statusbtn = async (e, table) => {
    e.preventDefault();
    var status = (e.target.value);
    var data = {
        status: status,
    }
    var id = (e.target.id).split("_")[1];
    try {
        var baseURL = `http://192.168.101.102/api/UpdateStatus-${id}`;
        await axios.post(baseURL, data)
            .then(response => {
                Swal.fire({
                    title: 'Status..',
                    type: 'success',
                    icon: 'success',
                    text: `${response.data.message}`,
                });
                GetOrders.setOrders([]);
                GetOrders.getOrders();
            }).catch(
                (error) => {
                    Swal.fire({
                        title: 'Status..',
                        type: 'error',
                        icon: 'error',
                        text: `${error.data.message}`,
                    });
                }
            )
    } catch (err) {
        console.log(err);
    }
}

export const updateOrder = async (e) => {
    e.preventDefault();
    $("#message").html("");
    var id = (e.target.id).split("_")[1];
    $("#message").html(`<div class="spinner-border" role="status"><span class="sr-only"></span></div>`);
    $("small").text("");
    var data = new FormData(e.target);
    const BaseUrl = `http://192.168.101.102/api/UpdateOrders-${id}`;
    await axios.post(BaseUrl, data)
        .then((response) => {
            let message = response.data.message;
            Swal.fire({
                title: 'Update Order..',
                type: 'success',
                icon: 'success',
                text: `${message}`,
            });
            $("#message").html(`<p class='text-center text-success'>${message}</p>`)
        })
        .catch((error) => {
            if (error.response.data.errors) {
                var errors = error.response.data.errors;
                for (let x in errors) {
                    $(`#Err${x}`).text(errors[x]);
                }
            }
            let message = error.response.data.message;
            $("#message").html(`<p class='text-center text-danger'>${message}</p>`)
        })

}

export const imagesPreview = (input, placeToInsertImagePreview, place) => {

    if (input.files) {
        var filesAmount = input.files.length;

        $(placeToInsertImagePreview).html(``);
        for (let i = 0; i < filesAmount; i++) {
            var reader = new FileReader();
            reader.onload = function (event) {
                if (place == 'src') {
                    $(placeToInsertImagePreview).attr({ 'src': `${event.target.result}` });
                } else {
                    $(placeToInsertImagePreview).append(`<img class=' border border-2 border-dark rounded p-1' src="${event.target.result}" width ='100px' height="70px" alt="" srcset="" >`);
                }
            }
            reader.readAsDataURL(input.files[i]);
        }
    }
};



