import Navbar from './component/Navbar';
import { Navigate, Route, useLocation, } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import Home from './pages/Home';
import ViewProduct from './pages/ViewProduct';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import ProductListing from './pages/ProductListing';
import Footer from './component/Footer'
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Payment from './pages/Payment';
import Swal from 'sweetalert2';
import Wishlist from './pages/Wishlist';
import AddProduct from './component/Admin/Products/AddProduct';
import AdminProductlisting from './component/Admin/Products/AdminProductlisting';
import UpdateProduct from './component/Admin/Products/UpdateProduct';
import AddUsers from './component/Admin/Users/AddUsers';
import UpdateUsers from './component/Admin/Users/UpdateUsers';
import AdminUserlisting from './component/Admin/Users/AdminUserlisting';
import AdminOrderslisting from './component/Admin/Orders/AdminOrderslisting';
import AdminCouponslisting from './component/Admin/Coupons/AdminCouponslisting';
import { ToastContainer } from 'react-toastify';
import Error404 from './component/Error404';
import Dashboard from './component/Admin/Dashboard/Dashboard';
import ApiCalls from './ApiCalls';
import AdminLogin from './component/Admin/AdminLogin';
import AddCoupons from './component/Admin/Coupons/AddCoupons';
import Updatecoupon from './component/Admin/Coupons/Updatecoupon';


export default function App() {
  const [Buyproduct, setbuyproduct] = useState([])
  var wishlisitems = (sessionStorage.getItem('wishlist') ? JSON.parse(sessionStorage.getItem('wishlist')) : "");
  const [wishlist, setWishlist] = useState(wishlisitems);
  const [loggedIn, setLoggedIn] = useState((sessionStorage.getItem('user') === null) ? false : true)
  const [adminLoggedIn, setAdminLoggedIn] = useState((sessionStorage.getItem('admin') === null) ? false : true)
  const [userdata, setUserdata] = useState((sessionStorage.getItem('user')) ? JSON.parse(sessionStorage.getItem('user')) : "");

  const product = ApiCalls();
  useEffect(() => {
    setUserdata(JSON.parse(sessionStorage.getItem('user')));
  }, [])


  function RemoveShoppingCart(id) {
    setbuyproduct(Buyproduct.filter((items, index) => {
      if (id !== items.id) {
        return items;
      }
    }))
  }

  function ChangeQuantity(quantity, id) {
    setbuyproduct(Buyproduct.filter((items, index) => {
      if (id == items.id) {
        items.quantity = quantity
        return items;
      } else {
        return items;
      }
    }))
  }

  function setBuyproduct(product) {
    const found = Buyproduct.some(items => items.id === product.id);
    if (!found) {
      (setbuyproduct([...Buyproduct, product]))
    }
  }

  async function addWishList(product) {
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
        var baseURL = `http://192.168.101.102/api/addOrCreate`;
        await axios.post(baseURL, data)
          .then(response => {
            Swal.fire({
              title: 'Wishlist..',
              type: 'success',
              icon: 'success',
              text: `${response.data.message}`,
            });

            (setWishlist(wishlist => [...wishlist, product.id]));
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
        text: `Already in cart..`,
      });
    }
  }

  return (
    <>
      <BrowserRouter>
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
        <Navbar count={Buyproduct.length} wishlistcount={wishlist.length} setAdminLoggedIn={setAdminLoggedIn} adminLoggedIn={adminLoggedIn} />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/login' element={loggedIn ? <Navigate replace to={"/"} /> : <Login setLoggedIn={setLoggedIn} />} />
          <Route exact path='/register' element={loggedIn ? <Navigate replace to={"/"} /> : <Register />} />
          <Route exact path='/allproductlisting' element={<ProductListing addWishList={addWishList} userdata={userdata} />} />
          <Route exact path='/product' element={<ViewProduct setBuyproduct={setBuyproduct} userdata={userdata} addWishList={addWishList} />} />
          <Route exact path='/cart' element={<Cart Buyproduct={Buyproduct} RemoveShoppingCart={RemoveShoppingCart} ChangeQuantity={ChangeQuantity} loggedIn={loggedIn} />} />
          <Route exact path='/payment' element={!loggedIn ? <Navigate replace to={"/login"} /> : <Payment Buyproduct={Buyproduct} setbuyproduct={setbuyproduct} />} />
          <Route exact path='/orders' element={!loggedIn ? <Navigate replace to={"/login"} /> : <Orders userdata={userdata} />} />
          <Route exact path='/profile' element={!loggedIn ? <Navigate replace to={"/login"} /> : <Profile setLoggedIn={setLoggedIn} userdata={userdata} setUserdata={setUserdata} products={product} wishlist={wishlist} setWishlist={setWishlist} setBuyproduct={setBuyproduct} />} />
          <Route exact path='/wishlist' element={!loggedIn ? <Navigate replace to={"/login"} /> : <Wishlist products={product} wishlist={wishlist} setWishlist={setWishlist} userdata={userdata} setBuyproduct={setBuyproduct} />} />
          <Route exact path='/admin/allproductlisting' element={!adminLoggedIn ? <Navigate replace to={"/admin/login"} /> : <AdminProductlisting />} />
          <Route exact path='/admin/allUsers' element={!adminLoggedIn ? <Navigate replace to={"/admin/login"} /> : <AdminUserlisting />} />
          <Route exact path='/admin/AddProduct' element={!adminLoggedIn ? <Navigate replace to={"/admin/login"} /> : <AddProduct />} />
          <Route exact path='/admin/UpdateProduct' element={!adminLoggedIn ? <Navigate replace to={"/admin/login"} /> : <UpdateProduct />} />
          <Route exact path='/admin/AddUsers' element={!adminLoggedIn ? <Navigate replace to={"/admin/login"} /> : <AddUsers />} />
          <Route exact path='/admin/allOrders' element={!adminLoggedIn ? <Navigate replace to={"/admin/login"} /> : <AdminOrderslisting />} />
          <Route exact path='/admin/UpdateUsers' element={!adminLoggedIn ? <Navigate replace to={"/admin/login"} /> : <UpdateUsers />} />
          <Route exact path='/admin/AllCoupons' element={!adminLoggedIn ? <Navigate replace to={"/admin/login"} /> : <AdminCouponslisting />} />
          <Route exact path='/admin/AddCoupon' element={!adminLoggedIn ? <Navigate replace to={"/admin/login"} /> : <AddCoupons />} />
          <Route exact path='/admin/updateCoupon' element={!adminLoggedIn ? <Navigate replace to={"/admin/login"} /> : <Updatecoupon />} />
          <Route exact path='/admin' element={!adminLoggedIn ? <Navigate replace to={"/admin/login"} /> : <Dashboard />} />
          <Route exact path='/admin/login' element={<AdminLogin setAdminLoggedIn={setAdminLoggedIn} />} />
          <Route exact path='*' element={<Error404 />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}
