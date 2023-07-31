import Navbar from './component/Navbar';
import { Navigate, Route } from 'react-router-dom';
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

function App() {
  const [product, setProduct] = useState([])
  const [Buyproduct, setbuyproduct] = useState([])
  const [loggedIn, setLoggedIn] = useState()

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
  var baseURL = 'http://product_api.localhost/api/products';
  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setProduct(response.data);
    });
    setLoggedIn(sessionStorage.getItem('user'));
  }, []);
  return (
    <>
      <BrowserRouter>
        <Navbar count={Buyproduct.length} setLoggedIn={setLoggedIn}/>
        <Routes>
          <Route exact path='/' element={<Home product={product} />} />
          <Route exact path='/login' element={loggedIn ? <Navigate replace to={"/"} /> : <Login setLoggedIn={setLoggedIn}/>} />
          <Route exact path='/register' element={loggedIn ? <Navigate replace to={"/"} /> : <Register />} />
          <Route exact path='/allproductlisting' element={<ProductListing products={product} />} />
          <Route exact path='/product' element={<ViewProduct setBuyproduct={setBuyproduct} />} />
          <Route exact path='/cart' element={<Cart Buyproduct={Buyproduct} RemoveShoppingCart={RemoveShoppingCart} ChangeQuantity={ChangeQuantity} />} />
          <Route exact path='/orders' Component={Orders} />
        </Routes>
        {/* <Footer/> */}
      </BrowserRouter>
    </>
  );
}
export default App;
