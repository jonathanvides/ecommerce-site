const { client } = require('../db.js');
const uuid = require('uuid');

const createOrder = async ({ userId }) => {
    const SQL = `
      INSERT INTO orders (
          id, 
          user_id,
          status_id
          total_price,
          created_at,
          updated_at
      )
      VALUES (
          $1,
          $2,
          $3,
          0.00,
          CURRENT_TIMESTAMP,
          CURRENT_TIMESTAMP
      )
      RETURNING *;
    `;
    const response = await client.query(SQL, [uuid.v4(), userId]);
    return response.rows[0];
  };
  
  const addOrderDetails = async ({ orderId, cartItems }) => {
    const orderItems = cartItems.map((item) => {
      const SQL = `
              INSERT INTO order_details (
                  id, 
                  order_id,
                  product_id, 
                  quantity, 
                  price, 
                  created_at, 
                  updated_at
              )
              VALUES (
                  $1,
                  $2,
                  $3,
                  $4,
                  $5,
                  CURRENT_TIMESTAMP,
                  CURRENT_TIMESTAMP
              )
              RETURNING *;
          `;
      return client.query(SQL, [
        uuid.v4(),
        orderId,
        item.product_id,
        item.quantity,
        item.product_price,
      ]);
    });
    return Promise.all(orderItems);
  };
  
  const fetchAllOrders = async () => {
    const SQL = `
      SELECT * FROM orders;
    `;
    const response = await client.query(SQL);
    return response.rows;
  };
  
  const fetchOrdersById = async ({ userId }) => {
    const SQL = `
      SELECT * FROM orders WHERE user_id = $1 ;
    `;
    const response = await client.query(SQL, [userId]);
    return response.rows;
  };
  
  const fetchAllOrderDetails = async () => {
    const SQL = `
      SELECT * FROM order_details;
    `;
    const response = await client.query(SQL);
    return response.rows;
  };
  
  const fetchOrderDetailsByID = async ({ orderId }) => {
    const SQL = `
      SELECT * FROM order_details WHERE order_id = $1 ;
    `;
    const response = await client.query(SQL, [orderId]);
    return response.rows[0];
  };
  
  const updateOrderStatus = async ({
    orderId,
    newOrderStatus,
  }) => {
    const SQL = `
    UPDATE order_status
    SET 
      status = 'In Progress'
    WHERE id = $1
    RETURNING *;
    `;
  
    const response = await client.query(SQL, [
      orderId,
      newOrderStatus,
    ]);
    return response.rows[0];
  };

  const deleteOrder = async ({ orderId }) => {
    const SQL = `
      DELETE FROM orders WHERE id = $1
    `;
    await client.query(SQL, [orderId]);
  };
  
  const deleteOrderDetails = async (orderId, itemId) => {
    const SQL = `
      DELETE FROM order_details
      WHERE order_id = $1 AND id = $2
      AND EXISTS (
      SELECT 1 
      FROM orders
      WHERE id = $1
      )
    `;
  };
  
  module.exports = {
    createOrder,
    addOrderDetails,
    fetchAllOrders,
    fetchOrdersById,
    fetchAllOrderDetails,
    fetchOrderDetailsByID,
    updateOrderStatus,
    deleteOrder,
    deleteOrderDetails,
  };