import { API_URL } from './url.js';

const fetchAllOrders = async (token) => {
    try {
        const response = await fetch(`${API_URL}/orders`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        const orders = await response.json();
        console.log(orders);
        return orders;
    } catch (error) {
        console.error(error);
    }
};

const fetchOrdersByUserId = async (userId, token) => {
    try {
        const response = await fetch(`${API_URL}/users/${userId}/orders`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        const userOrders = await response.json();
        console.log(userOrders);
        return userOrders;
    } catch (error) {
        console.error(`Error fetching orders for user ${userId}`, error);
    }
};

const fetchOrderDetails = async (orderId, token) => {
    try {
        const response = await fetch(`${API_URL}/orders/${orderId}/items`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        const orderDetails = await response.json();
        console.log(orderDetails);
        return orderDetails;
    } catch (error) {
        console.error(`Error fetching items for order ${orderId}`, error);
    }
};

const updateOrderStatus = async (orderId, newStatus, token) => {
    try {
        const response = await fetch(`${API_URL}/orders/${orderId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(newStatus),
        });
        const updatedOrder = await response.json();
        console.log(updatedOrder);
        return updatedOrder;
    } catch (error) {
        console.error(`Error updating status for order ${orderId}`, error);
    }
};

const deleteOrder = async (orderId, token) => {
    try {
        await fetch(`${API_URL}/orders/${orderId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(`${orderId}`);
    } catch (error) {
        console.error(`Error deleting order ${orderId}`, error);
    }
};

const deleteOrderDetails = async (orderId, itemId, token) => {
    try {
        await fetch(`${API_URL}/orders/${orderId}/items/${itemId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(`Deleted ${itemId} from order ${orderId}`);
    } catch (error) {
        console.error(`Error deleting item ${itemId} from order ${orderId}`, error);
    }
};

export {
    fetchAllOrders,
    fetchOrdersByUserId,
    fetchOrderDetails,
    updateOrderStatus,
    deleteOrder,
    deleteOrderDetails,
};