import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Account from "./components/Account";
import Products from "./components/Products";
import Product from "./components/SingleProduct";
import Nav from "./components/Nav";
import { getToken } from "./components/auth";
import { userDetails } from "./API/user";

import './App.css'

function App() {
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const initializeUser = async () => {
      const token = getToken();
      if (token) {
        try {
          const fetchUserDetails = await userDetails(token);
          setUserId(fetchUserDetails.id);

        } catch (error) {
          console.error('Error initializing user:', error);
          navigate('/login');
        }
      } else {
        navigate('/login');
      }
    };

    initializeUser();
  }, [navigate]);

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
        <Route path="/products" element={<Products />} />
        <Route path="/products/:productId" element={<Product userId={userId} />} />
      </Routes>
    </section>
    </>
  )
}

export default App
