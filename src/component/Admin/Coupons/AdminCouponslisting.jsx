import React from 'react'

export default function AdminCouponslisting() {
    return 'coupons'
}














//     // const [coupons, setCoupons] = useState([])
//     // const getCoupons = () => {
//     //     var baseURL = 'http://192.168.101.102/api/productsWithSub_category';
//     //     axios.get(baseURL).then((response) => {
//     //         setCoupons(response.data);
//     //     });
//     // }

//     // useEffect(() => {
//     //     getCoupons();
//     // }, []);

//     // const deletebtn = async (e) => {
//     //     e.preventDefault();
//     //     var id = (e.target.id).split("_")[1];
//     //     try {
//     //         var baseURL = `http://192.168.101.102/api/products/DeletingProductById-${id}`;
//     //         await axios.delete(baseURL)
//     //             .then(response => {
//     //                 Swal.fire({
//     //                     title: 'Delete..',
//     //                     type: 'success',
//     //                     icon: 'success',
//     //                     text: `${response.data.message}`,
//     //                 });
//     //                 getProducts();
//     //             }).catch(
//     //                 (error) => {
//     //                     console.log(error);
//     //                 }
//     //             )
//     //     } catch (err) {
//     //         console.log(err);
//     //     }
//     // }
//     return (
//         <div className='container'>
//             <div className="row justify-content-center mt-5">
//                 {
//                     (coupons?.length == 0) ? <Loading pageName={"coupons"} /> : (
//                         <>
//                             <div className="row flex-row-reverse ">
//                                 <h5>Product Listing : </h5>
//                             </div>
//                             <hr />
//                             <div className="row flex-row-reverse ">
//                                 <div className="col-2 d-flex justify-content-center">
//                                     <Link className="btn btn-primary mb-4" to="/admin/AddProduct" >Add Product </Link>
//                                 </div>
//                             </div>
//                             <div className="col-12">
//                                 <div className="table-responsive">
//                                     <table className="table bg-light" id='table'>
//                                         <thead>
//                                             <tr className='border border-2 border-dark  text-center'>
//                                                 <th scope="col">SrNo.</th>
//                                                 <th scope="col">Name</th>
//                                                 <th scope="col">Description</th>
//                                                 <th scope="col">Price</th>
//                                                 <th scope="col">Category</th>
//                                                 <th scope="col">Action</th>
//                                             </tr>
//                                         </thead>
//                                         <tbody id="listing">
//                                             {
//                                                 product.map((items, index) => {
//                                                     return (<tr className='text-center' key={index}>
//                                                         <td width='100px' className=" border border-dark border-2 " >{index + 1}</td>
//                                                         <td width='170px' className=" border border-dark border-2 "  >{items.title}</td>
//                                                         <td width='500px' className=" border border-dark border-2 " >{items.description}</td>
//                                                         <td className=" border border-dark border-2 " >{items.price}</td>
//                                                         <td className=" border border-dark border-2 " >{items.Sub_categories}</td>
//                                                         <td className=" border border-dark border-2 " >
//                                                             <button className='btn btn-danger delete' id={"del_" + items.id} onClick={(e) => { deletebtn(e) }} ><AiTwotoneDelete /></button>
//                                                             <Link to={"/admin/UpdateProduct"} className='btn btn-warning ms-3' state={items.id}><FaPencilAlt /></Link>
//                                                         </td>
//                                                     </tr>
//                                                     )
//                                                 })
//                                             }
//                                         </tbody>
//                                     </table>
//                                 </div>
//                             </div>
//                         </>
//                     )}
//             </div>
//         </div>
//     )
// }
