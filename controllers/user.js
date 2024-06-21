const { client } = require('../db.js');
const uuid = require('uuid');
const bcrypt = require('bcrypt');

const createUser = async ({
    username,
    email,
    password,
    first_name,
    last_name,
    phone_number,
}) => {
    const SQL = ` INSERT INTO users (id, username, email, password, first_name, last_name, phone_number) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
    const response = await client.query(SQL, [
        uuid.v4(),
        username,
        email,
        await bcrypt.hash(password, 10),
        first_name,
        last_name,
        phone_number,
    ]);
    return response.rows[0];
};

const fetchUsers = async () => {
    const SQL = ` SELECT * FROM users`;
    const response = await client.query(SQL);
    return response.rows;
};

const fetchUserById = async (id) => {
    const SQL = `
        SELECT * FROM users WHERE id = $1`;
    const response = await client.query(SQL, [id]);
    return response.rows[0];
};

const updateUser = async (id, newUserData) => {
    const {
        username,
        email,
        password,
        first_name,
        last_name,
        phone_number,
    } = newUserData;

    let hashedPassword;
    if (password) {
        hashedPassword = await bcrypt.hash(password, 10);
    }

    const SQL = `
        UPDATE users
        SET 
          username = COALESCE($2, username),
          email = COALESCE($3, email),
          password = COALESCE($4, password),
          first_name = COALESCE($5, first_name),
          last_name = COALESCE($6, last_name),
          phone_number = COALESCE($7, phone_number),
          updated_at = CURRENT_TIMESTAMP
        WHERE id = $1
        RETURNING *;
        `;

    const response = await client.query(SQL, [
        id,
        username,
        email,
        hashedPassword || password,
        first_name,
        last_name,
        phone_number,
    ]);

    return response.rows[0];
};

const deleteUser = async (id) => {
    const SQL = `
        DELETE FROM users WHERE id = $1;
        `;
    await client.query(SQL, [id]);
};

module.exports = {
    createUser,
    fetchUsers,
    fetchUserById,
    updateUser,
    deleteUser,
  };