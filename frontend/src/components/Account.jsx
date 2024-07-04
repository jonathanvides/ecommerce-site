import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userDetails } from "../API/user";
import { fetchOrdersByUserId } from "../API/order";
import { getToken } from "./auth";

const Account = ({ userId }) => {
  const token = getToken();
  const navigate = useNavigate();
  const [getUserDetails, setGetUserDetails] = useState('');
  const [orders, setOrders] = useState([]);
  const [loading, setLoadingState] = useState(false);
  const [pageRefresh, setPageRefresh] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!token) {
        navigate('/login');
        return;
      }
      setLoadingState(true); // CSS Idea: Make it a loading wheel with an animation
      try {
        const fetchedUser = await userDetails(token);
        console.log(fetchedUser);
        setGetUserDetails(fetchedUser);
        setError('');
      } catch (error) {
        console.error('Failed to fetch user details:', error);
        setError('Failed to load user details.');
      } finally {
        setLoadingState(false);
      }
    };
    fetchUserDetails();
  }, [token, pageRefresh, navigate]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (getUserDetails.id) {
        try {
          const ordersData = await fetchOrdersByUserId(getUserDetails.id, token);
          setOrders(ordersData);
        } catch (error) {
          console.error('Failed to fetch orders:', error);
        }
      }
    };
    fetchOrders();
  }, [getUserDetails.id, token]);

  const refreshHandler = () => {
    setPageRefresh(!pageRefresh);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Account</h1>
      <h2>Welcome!</h2>
      <section className="details">
      <h4>Account Details</h4>
      <p className="username">{`Username: ${getUserDetails.username}`}</p>
      <p className="name">{`Name: ${getUserDetails.first_name} ${getUserDetails.last_name}`}</p>
      <p className="email-user">{`Email: ${getUserDetails.email}`}</p>
      <p className="phone-number">{`Phone: ${getUserDetails.phone_number}` || ''}</p>

      <h4 className="order">Order Details</h4>
      {orders.map(order => (
        <div key={order.id}>
          <p>Order ID: {order.id}</p>
          <p>Status: {order.status}</p>
          <p>Total: ${order.total}</p>
        </div>
      ))}
      </section>
    </div>
  );
};

export default Account;