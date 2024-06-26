import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userDetails } from "../API/user";
import { getToken } from "./auth";

const Account = ({ userId }) => {
    const token = getToken();
    const navigate = useNavigate();
    const [getUserDetails, setGetUserDetails] = useState('');
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
            <h4>Account Details</h4>
            <p>{`Username: ${getUserDetails.username}`}</p>
            <p>{`Name: ${getUserDetails.first_name} ${getUserDetails.last_name}`}</p>
            <p>{`Email: ${getUserDetails.email}`}</p>
            <p>{`Phone: ${getUserDetails.phone_number}` || ''}</p>
      </div>
    );
  };
  
  export default Account;