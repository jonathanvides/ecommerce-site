const { client } = require('../db.js');

const { createOrder, addOrderDetails } = require('./order.js');
const { fetchCartItemsById } = require('./cart.js');

const cartCheckout = async (userId, cartId) => {
    console.log('Checkout initiated for user:', { userId, cartId });
  
    const cartItems = await fetchCartItemsById(cartId);
    console.log('Fetched cart items:', cartItems);
  
    if (cartItems.length === 0) {
      throw new Error('Cart is empty.');
    }
  
    const order = await createOrder({
      userId,
    });
    console.log('Created order:', order);
  
    await addOrderDetails({
      orderId: order.id,
      cartItems,
    });
    console.log('Added order details.');
  
    const clearCartSQL = `DELETE FROM cart_items WHERE cart_id = $1 RETURNING *`;
    const clearedItems = await client.query(clearCartSQL, [cartId]);
    console.log('Cleared cart items:', clearedItems.rows);
  
    const checkCartSQL = `SELECT * FROM carts WHERE id = $1`;
    const updatedCart = await client.query(checkCartSQL, [cartId]);
    console.log('Updated cart details:', updatedCart.rows);
  
    return order;
  };
  
  module.exports = {
    cartCheckout,
  };