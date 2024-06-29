const { client } = require('../db.js');
const uuid = require('uuid');

const createCategory = async ({ name }) => {
    const SQL = `
            INSERT INTO categories(id, name, created_at, updated_at) 
            VALUES ($1, $2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) 
            ON CONFLICT (name) DO UPDATE 
            SET updated_at = excluded.updated_at
            RETURNING *;
          `;
    const response = await client.query(SQL, [uuid.v4(), name]);
    return response.rows[0];
  };
  
  const fetchAllCategories = async () => {
    const SQL = `
          SELECT * FROM categories;
          `;
    const response = await client.query(SQL);
    return response.rows;
  };
  
  const fetchCategoryById = async (id) => {
    const SQL = `
            SELECT * FROM categories WHERE id = $1
    `;
    const response = await client.query(SQL, [id]);
    return response.rows[0];
  };
  
  const updateCategory = async ({ id, name }) => {
    const SQL = `
          UPDATE categories 
          SET 
            name = $2, 
            updated_at = CURRENT_TIMESTAMP
            WHERE id = $1 
            RETURNING *;
          `;
  
    const response = await client.query(SQL, [id, name]);
    return response.rows[0];
  };
  
  const deleteCategory = async ({ id }) => {
    const checkCategory = `
    SELECT * FROM products WHERE category_id = $1
    `;
  
    const checkResponse = await client.query(checkCategory, [id]);
  
    if (checkResponse.rowCount > 0) {
      const error = new Error('Category assigned to a product, unable to delete.');
      error.status = 405;
      throw error;
    }
  
    const SQL = `
          DELETE FROM categories WHERE id = $1
          `;
    await client.query(SQL, [id]);
  };
  
  module.exports = {
    createCategory,
    fetchAllCategories,
    fetchCategoryById,
    updateCategory,
    deleteCategory,
  };