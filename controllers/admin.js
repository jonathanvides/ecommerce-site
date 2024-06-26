const { client } = require('../db.js');
const uuid = require('uuid');
const bcrypt = require('bcrypt');

const createAdmin = async (req, res) => {
    const { username, password, first_name, last_name, permissions } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const SQL = `
      INSERT INTO admins (id, username, password, first_name, last_name, permissions)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const values = [
        uuid.v4(),
        username,
        hashedPassword,
        first_name,
        last_name,
        permissions,
    ];
    try {
        const result = await client.query(SQL, values);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: "Failed to create admin." });
    }
};

const fetchAdmin = async (req, res) => {
    const SQL = `SELECT * FROM admins`;
    try {
        const result = await client.query(SQL);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch admin users" });
    }
};

const updateAdmin = async (id, newAdminData) => {
    const {
        username,
        password,
        first_name,
        last_name,
        permissions,
    } = newUserData;

    let hashedPassword;
    if (password) {
        hashedPassword = await bcrypt.hash(password, 10);
    }

    const SQL = `
        UPDATE admins
        SET 
          username = COALESCE($2, username),
          password = COALESCE($3, password),
          first_name = COALESCE($4, first_name),
          last_name = COALESCE($5, last_name),
          permissions = COALESCE($6, permissions),
          updated_at = CURRENT_TIMESTAMP
        WHERE id = $1
        RETURNING *;
        `;

    const response = await client.query(SQL, [
        id,
        username,
        hashedPassword || password,
        first_name,
        last_name,
        permissions,
    ]);

    return response.rows[0];
};

const deleteAdmin = async (id) => {
    const SQL = `
    DELETE FROM admins WHERE id = $1;
    `;
    await client.query(SQL, [id]);
};

const fetchAdminByUsername = async (id) => {
    const SQL = `
    SELECT * FROM admins WHERE username = $1`;
    const response = await client.query(SQL, [id]);
    return response.rows[0];
};

module.exports = {
    createAdmin,
    fetchAdmin,
    fetchAdminByUsername,
    updateAdmin,
    deleteAdmin,
};