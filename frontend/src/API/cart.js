import { API_URL } from './url.js';

const fetchCart = async (userId, token) => {
    try {
        const response = await fetch(`${API_URL}/users/${userId}/cart`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        const cart = await response.json();
        console.log(cart);
        return cart;
    } catch (error) {
        console.error(error);
    }
};

const addCartItem = async (token, userCartId, productId, quantity) => {
    try {
        const response = await fetch(`${API_URL}/cart/${userCartId}/items`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                product_id: productId,
                quantity: quantity,
            }),
        });
        const newItem = await response.json();
        console.log(newItem);
        return newItem;
    } catch (error) {
        console.error(error);
    }
};

const fetchCartItems = async (userCartId, token) => {
    try {
        const response = await fetch(`${API_URL}/cart/${userCartId}/items`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        const cartItems = await response.json();
        console.log(cartItems);
        return cartItems;
    } catch (error) {
        console.error('Error fetching cart:', error);
    }
};

const updateCartItem = async (itemId, quantity, token) => {
    try {
        const response = await fetch(`${API_URL}/cart/items/${itemId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ quantity }),
        });
        const updatedItem = await response.json();
        console.log(updatedItem);
        return updatedItem;
    } catch (error) {
        console.error(error);
    }
};

const deleteCartItem = async (itemId, token) => {
    try {
        await fetch(`${API_URL}/cart/items/${itemId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(`${itemId}`);
    } catch (error) {
        console.error(`Error deleting order ${itemId}`, error);
    }
};

const cartCheckout = async (userId, userCartId, token) => {
    try {
        const response = await fetch(
            `${API_URL}/users/${userId}/carts/${userCartId}/checkout`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const checkoutData = await response.json();
        console.log(checkoutData);
        return checkoutData;
    } catch (error) {
        console.error(error);
    }
};

export {
    fetchCart,
    addCartItem,
    fetchCartItems,
    updateCartItem,
    deleteCartItem,
    cartCheckout,
};