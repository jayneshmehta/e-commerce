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
import AdminNavbar from './component/Admin/AdminNavbar';
import AddProduct from './component/Admin/AddProducts/AddProduct';
import AdminProductlisting from './component/Admin/Productlisting/AdminProductlisting';
import UpdateProduct from './component/Admin/UpdateProducts/UpdateProduct';


export default function App() {
  const [product, setProduct] = useState([])
  const [Buyproduct, setbuyproduct] = useState([])
  var wishlisitems = (sessionStorage.getItem('wishlist') ? JSON.parse(sessionStorage.getItem('wishlist')) : "");
  const [wishlist, setWishlist] = useState(wishlisitems);
  const [loggedIn, setLoggedIn] = useState((sessionStorage.getItem('user') === null) ? false : true)
  const [userdata, setUserdata] = useState((sessionStorage.getItem('user')) ? JSON.parse(sessionStorage.getItem('user')) : "");
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
    var data = {
      userId: userdata.id,
      productId: product.id,
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
            console.log(wishlist);
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

  var baseURL = 'http://192.168.101.102/api/products';
  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setProduct(response.data);
    });
  }, []);

  return (
    <>
      <BrowserRouter>
        <Navbar count={Buyproduct.length} wishlistcount={wishlist.length} />
        <Routes>
          <Route exact path='/' element={<Home product={product} />} />
          <Route exact path='/login' element={loggedIn ? <Navigate replace to={"/"} /> : <Login setLoggedIn={setLoggedIn} />} />
          <Route exact path='/register' element={loggedIn ? <Navigate replace to={"/"} /> : <Register />} />
          <Route exact path='/allproductlisting' element={<ProductListing products={product} addWishList={addWishList} userdata={userdata} />} />
          <Route exact path='/product' element={<ViewProduct setBuyproduct={setBuyproduct} />} />
          <Route exact path='/cart' element={<Cart Buyproduct={Buyproduct} RemoveShoppingCart={RemoveShoppingCart} ChangeQuantity={ChangeQuantity} />} />
          <Route exact path='/payment' element={<Payment Buyproduct={Buyproduct} />} />
          <Route exact path='/profile' element={!loggedIn ? <Navigate replace to={"/login"} /> : <Profile setLoggedIn={setLoggedIn} userdata={userdata} setUserdata={setUserdata} />} />
          <Route exact path='/orders' element={!loggedIn ? <Navigate replace to={"/login"} /> : <Orders setLoggedIn={setLoggedIn} userdata={userdata} setUserdata={setUserdata} />} />
          <Route exact path='/wishlist' element={!loggedIn ? <Navigate replace to={"/login"} /> : <Wishlist products={product} wishlist={wishlist} setWishlist={setWishlist} userdata={userdata} setBuyproduct={setBuyproduct} />} />
          <Route exact path='/admin/allproductlisting' element={<AdminProductlisting products={product} />} />
          <Route exact path='/admin/AddProduct' element={<AddProduct />} />
          <Route exact path='/admin/UpdateProduct' state={1} element={<UpdateProduct />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}
