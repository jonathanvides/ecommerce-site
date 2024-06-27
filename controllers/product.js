const { client } = require('../db.js');
const uuid = require('uuid');

const createProduct = async ({
    name,
    description,
    quantity,
    price,
    image,
    category_id,
}) => {
    const SQL = `
        INSERT INTO products(id, name, description, quantity, price, image, category_id) 
        VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *
      `;

    const response = await client.query(SQL, [
        uuid.v4(),
        name,
        description,
        quantity,
        price,
        image,
        category_id,
    ]);

    return response.rows[0];
};

const fetchProducts = async () => {
    const SQL = `
          SELECT * FROM products
        `;

    const response = await client.query(SQL);
    return response.rows;
};

const fetchProductById = async (id) => {
    const SQL = `
      SELECT * FROM products WHERE id = $1
      `;

    const response = await client.query(SQL, [id]);
    return response.rows[0];
};

const updateProduct = async ({
    id,
    name,
    description,
    quantity,
    price,
    image,
    category_id,
}) => {
    const SQL = `
      UPDATE products 
      SET 
        name = COALESCE($2, name),
        description = COALESCE($3, description),
        quantity = COALESCE($4, quantity),
        price = COALESCE($5, price),
        image = COALESCE($6, image),
        category_id = COALESCE($7, category_id),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $1 
      RETURNING *;
    `;

    const response = await client.query(SQL, [
        id,
        name,
        description,
        quantity,
        price,
        image,
        category_id,
    ]);

    return response.rows[0];
};

const deleteProduct = async ({ id }) => {
    const SQL = `
      DELETE FROM products WHERE id = $1 RETURNING *
      `;
    await client.query(SQL, [id]);
};

module.exports = {
    createProduct,
    fetchProducts,
    fetchProductById,
    updateProduct,
    deleteProduct,
};