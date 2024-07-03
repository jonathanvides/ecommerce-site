import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartItem } from "./CartItem";
import { getToken } from "./auth";
import { fetchCartItems, fetchCart } from "../API/cart";

const Cart = ({ userId }) => {
    const token = getToken();
    const [cartItems, setCartItems] = useState([]);
    const [pageRefresh, setPageRefresh] = useState(false);
    const [userCartId, setUserCartId] = useState(null);
    const [cartDetails, setCartDetails] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        const getUserCart = async () => {
            try {
                const userCart = await fetchCart(userId, token);
                setUserCartId(userCart.id);
                setCartDetails(userCart)
            } catch (error) {
                console.error('Error fetching cart:', error);
            }
        };

        if (userId) {
            getUserCart();
        }
    }, [token, userId, pageRefresh]);

    useEffect(() => {
        const getCartItems = async () => {
            if (userCartId) {
                try {
                    const fetchedItems = await fetchCartItems(userCartId, token);
                    setCartItems(fetchedItems);
                } catch (error) {
                    console.error('Error fetching items:', error);
                }
            }
        };
        getCartItems();
    }, [token, pageRefresh, userCartId]);

    const calculateTotal = () => {
        return cartItems
          .reduce((total, item) => total + item.price * item.quantity, 0)
          .toFixed(2);
      };

    const handleCheckout = () => {
        if (!token) {
          navigate("/login");
        } else {
          navigate("/checkout");
        }
      };    

    const refreshHandler = () => {
        setPageRefresh(!pageRefresh);
    };

    if (!token) {
        return (
            <p>Please login to view cart.</p>
        );
    } else if (cartItems.length === 0) {
        return (
            <p>Cart is empty.</p>
        );
    } else {
        return (
            <div>
                <h2>Cart Details</h2>
                <p>Cart ID: {cartDetails.id}</p>
                {cartItems.map((item) => (
                    <CartItem key={item.id} item={item} refresh={refreshHandler} /> 
                ))}
                <h2>Total: ${calculateTotal()}</h2>
                <button onClick={handleCheckout}> Checkout </button>
            </div>
        );
    }
};

export default Cart;