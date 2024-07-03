import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Account from "./components/Account";
import Products from "./components/Products";
import Product from "./components/SingleProduct";
import Cart from "./components/Cart";
import Checkout from './components/Checkout';
import Nav from "./components/Nav";
import { getToken } from "./components/auth";
import { userDetails } from "./API/user";
import { fetchCart } from "./API/cart";

import './App.css'

function App() {
  const [userId, setUserId] = useState('');
  const [userCartId, setUserCartId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const initializeUser = async () => {
      const token = getToken();
      if (token) {
        try {
          const fetchUserDetails = await userDetails(token);
          setUserId(fetchUserDetails.id);
          console.log(fetchUserDetails);
          const userCart = await fetchCart(fetchUserDetails.id, token);
          setUserCartId(userCart.id);
        } catch (error) {
          console.error('Error initializing user:', error);
          navigate('/login');
        }
      } else {
        navigate('/');
      }
    };

    initializeUser();
  }, []);

  console.log(userId);

  return (
    <>
    <Nav />
    <section>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<Register setUserId={setUserId} />} />
        <Route path="/login" element={<Login setUserId={setUserId} />} />
        <Route path="/account" element={<Account userId={userId} />} />
        <Route path="/cart" element={<Cart userId={userId} />} />
        <Route path="/checkout" element={<Checkout userId={userId} userCartId={userCartId} />} />
        <Route path="/products" element={<Products userCartId={userCartId} />} />
        <Route path="/products/:productId" element={<Product userCartId={userCartId} userId={userId} />} />
      </Routes>
    </section>
    </>
  )
}

export default App
