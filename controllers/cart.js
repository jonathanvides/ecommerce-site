const { client } = require('../db.js');
const uuid = require('uuid');

const fetchAllCarts = async () => {
    const SQL = `
    SELECT * FROM carts;
    `;
    const response = await client.query(SQL);
    return response.rows;
  };
  
  const fetchCartById = async (id) => {
    const SQL = `
          SELECT * FROM carts WHERE user_id = $1;
        `;
  
    const response = await client.query(SQL, [id]);
    return response.rows[0];
  };
  
  const fetchCartItemsById = async (id) => {
    const SQL = `
      SELECT * FROM cart_items WHERE cart_id = $1
    `;
  
    const response = await client.query(SQL, [id]);
    return response.rows;
  };
  
  const addCartItem = async ({
    cart_id,
    product_id,
    quantity,
    user_id,
  }) => {
    const productSQL = `SELECT * FROM products WHERE id = $1`;
    const productResponse = await client.query(productSQL, [
      product_id,
    ]);
  
    if (productResponse.rows.length === 0) {
      throw new Error('Product does not exist.');
    }
  
    const SQL = `
      INSERT INTO cart_items (
        id, 
        cart_id, 
        product_id, 
        product_name, 
        product_description, 
        product_price, 
        product_image,
        quantity, 
        created_at, 
        updated_at
      ) 
      VALUES (
        $1, 
        $2, 
        $3, 
        (SELECT name FROM products WHERE id = $3), 
        (SELECT description FROM products WHERE id = $3), 
        (SELECT price FROM products WHERE id = $3), 
        (SELECT image FROM products WHERE id = $3),
        $4::integer, 
        CURRENT_TIMESTAMP, 
        CURRENT_TIMESTAMP
      )
      RETURNING *;
    `;
    const response = await client.query(SQL, [
      uuid.v4(),
      cart_id,
      product_id,
      parseInt(quantity, 10),
      user_id,
    ]);
    return response.rows[0];
  };
  
  const updateCartItem = async ({ id, quantity }) => {
    const SQL = `
      UPDATE cart_items
        SET
        quantity = $2,
        updated_at = CURRENT_TIMESTAMP,
      WHERE id = $1
      RETURNING *;
    `;
    const response = await client.query(SQL, [id, quantity]);
    return response.rows[0];
  };
  
  const deleteCartItem = async ({ id }) => {
    const SQL = `
    DELETE FROM cart_items WHERE id = $1
    `;
    await client.query(SQL, [id]);
  };
  
  module.exports = {
    fetchAllCarts,
    fetchCartById,
    addCartItem,
    fetchCartItemsById,
    updateCartItem,
    deleteCartItem,
  };