const { client } = require('../db.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'shhh';

const authenticateUser = async ({ email, password }) => {
    const SQL = `
      SELECT id, password
      FROM users 
      WHERE email = $1;
    `;
    const response = await client.query(SQL, [email]);
    const user = response.rows[0];

    if (!user) {
        const error = new Error('User Not Found.');
        error.status = 401;
        throw error;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        const error = new Error('Invalid Password.');
        error.status = 401;
        throw error;
    }

    const token = jwt.sign(
        {
            id: user.id,
        },
        secret,
        {}
    );
    return { token };
};

const findUserByToken = async (token) => {
    let userId;
    try {
      const decoded = jwt.verify(token, secret);
      userId = decoded.id;
    } catch (ex) {
      const error = new Error('Not an authorized user.');
      error.status = 401;
      throw error;
    }
  
    const SQL = `
      SELECT id, email FROM users WHERE id = $1;
    `;
    const response = await client.query(SQL, [userId]);
    if (response.rows.length === 0) {
      const error = new Error('User not found.');
      error.status = 401;
      throw error;
    }
  
    return {
      ...response.rows[0],
    };
  };
  
  module.exports = {
    authenticateUser,
    findUserByToken,
  };