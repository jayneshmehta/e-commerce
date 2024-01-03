import Navbar from './component/Navbar';
import { Navigate, Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
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
import AdminLogin from './component/Admin/AdminLogin';
import AddCoupons from './component/Admin/Coupons/AddCoupons';
import Updatecoupon from './component/Admin/Coupons/Updatecoupon';
import ShowInvoice from './pages/ShowInvoice';
import GoogleLogin from './pages/GoogleLogin';
import store from './ReduxStore/Store';
import { useSelector } from 'react-redux';
import { GET_PRODUCT } from './ReduxStore/Action';
import Notification from './pages/Notification';
import env from "react-dotenv";


export default function App() {
  const getProduct = async () => {
    var baseURL = env.API_URL+'products';
    await axios.get(baseURL).then((response) => {
      store.dispatch({ type: GET_PRODUCT, payload: response.data })
    });
  }

  useEffect(() => {
    getProduct();
  }, [])

  const loggedIn = useSelector((state) => state.loggedIn);
  const adminLoggedIn = useSelector((state) => state.adminLoggedIn);

  return (
    <>
      <BrowserRouter>
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/login' element={loggedIn ? <Navigate replace to={"/"} /> : <Login />} />
          <Route exact path='/login/google' element={loggedIn ? <Navigate replace to={"/"} /> : <GoogleLogin />} />
          <Route exact path='/register' element={loggedIn ? <Navigate replace to={"/"} /> : <Register />} />
          <Route exact path='/allproductlisting' element={<ProductListing />} />
          <Route exact path='/product' element={<ViewProduct />} />
          <Route exact path='/cart' element={<Cart />} />
          <Route exact path='/payment' element={!loggedIn ? <Navigate replace to={"/login"} /> : <Payment />} />
          <Route exact path='/orders' element={!loggedIn ? <Navigate replace to={"/login"} /> : <Orders />} />
          <Route exact path='/profile' element={!loggedIn ? <Navigate replace to={"/login"} /> : <Profile />} />
          <Route exact path='/wishlist' element={!loggedIn ? <Navigate replace to={"/login"} /> : <Wishlist />} />
          <Route exact path='/notification' element={!loggedIn ? <Navigate replace to={"/login"} /> : <Notification />} />
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
          <Route exact path='/admin/login' element={adminLoggedIn ? <Navigate replace to={"/admin"} /> : <AdminLogin />} />
          <Route exact path='/showInvoice' element={!loggedIn ? <Navigate replace to={"/login"} /> : <ShowInvoice />} />
          <Route exact path='*' element={<Error404 />} />

        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}
