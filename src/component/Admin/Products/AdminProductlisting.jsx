import axios from 'axios';
import env from "react-dotenv";
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Loading from '../Loading';
import DataTable from 'datatables.net-dt';
import { AiTwotoneDelete } from 'react-icons/ai';
import { FaPencilAlt } from 'react-icons/fa';
import ProductsWithSub_category from '../AllStates';
import { deleteProduct } from '../AllStates';
import $ from 'jquery';

export default function AdminProductlisting() {

  const product = ProductsWithSub_category();
  let table

  useEffect(() => {
    setTimeout(() => {
      console.log("hellloooooo");
      table = new DataTable('#table', 
          {
            pagingType: "full_numbers",
            pageLength: 20,
            processing: true,
            dom: "Bfrtip",
            select: {
              style: "single",
            },

            buttons: [
              {
                extend: "pageLength",
                className: "btn btn-secondary bg-secondary",
              },
              {
                extend: "copy",
                className: "btn btn-secondary bg-secondary",
              },
              {
                extend: "excel",
                className: "btn btn-secondary bg-secondary",
              },
              {
                extend: "csv",
                className: "btn btn-secondary bg-secondary",
              },
              {
                extend: "print",
                customize: function (win) {
                  $(win.document.body).css("font-size", "10pt");
                  $(win.document.body)
                    .find("table")
                    .addClass("compact")
                    .css("font-size", "inherit");
                },
                className: "btn btn-secondary bg-secondary",
              },
            ],

            lengthMenu: [
              [10, 20, 30, 50, -1],
              [10, 20, 30, 50, "All"],
            ],
          }
        );
    }, 500);
  }, [product]);

  return (
    <div className='container'>
      <div className="row justify-content-center mt-5">
        {
          (product?.length == 0) ? <Loading pageName={"product"} /> : (
            <>
              <div className="row flex-row-reverse ">
                <h5>Product Listing : </h5>
              </div>
              <hr />
              <div className="row flex-row-reverse ">
                <div className="col-2 d-flex justify-content-center">
                  <Link className="btn btn-primary mb-4" to="/admin/AddProduct" >Add Product </Link>
                </div>
              </div>
              <div className="col-12">
                <div className="table-responsive">
                  <table className="table bg-light" id='table'>
                    <thead>
                      <tr className='border border-2 border-dark  text-center'>
                        <th scope="col">SrNo.</th>
                        <th scope="col">Thumbnail</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Price</th>
                        <th scope="col">Category</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody id="listing">
                      {
                        product?.map((items, index) => {
                          return (<tr className='text-center' key={index}  >
                            <td width='50px' className=" border border-dark border-2 " >{index + 1}</td>
                            <td width='100px' className=" border border-dark border-2  pt-2 " >
                              <img src={items.thumbnail ? items.thumbnail : "https://img.freepik.com/free-icon/user_318-150866.jpg"} alt='' width='70px' height='65px' className='rounded-5' />
                            </td>
                            <td width='120px' className=" border border-dark border-2 "  >{items.title}</td>
                            <td width='400px' className=" border border-dark border-2 " >{items.description}</td>
                            <td className=" border border-dark border-2 " >{items.price}</td>
                            <td className=" border border-dark border-2 " >{items.Sub_categories}</td>
                            <td className=" border border-dark border-2 " >
                              <button className='btn btn-danger delete' id={"del_" + items.id} onClick={(e) => { deleteProduct(e, table) }}><AiTwotoneDelete /></button>
                              <Link to={"/admin/UpdateProduct"} className='btn btn-warning ms-3' state={items.id}><FaPencilAlt /></Link>
                            </td>
                          </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
      </div>
    </div>
  )
}
