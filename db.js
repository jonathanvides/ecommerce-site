const pg = require('pg');
const uuid = require('uuid');
const dotenv = require('dotenv').config();

// const client = new pg.Client(process.env.DATABASE_URL || 'postgres://localhost/ecommerce_db');

const production = process.env.NODE_ENV === 'production'; //Needs to be a production environment instead of development
const connectionOptions = {
  connectionString: process.env.DATABASE_URL,
  ssl: production ? { rejectUnauthorized: false } : false,
};

const client = new pg.Client(connectionOptions);

const createTables = async () => {
    const SQL = `
  DROP TABLE IF EXISTS users CASCADE;
  DROP TABLE IF EXISTS admins CASCADE;
  DROP TABLE IF EXISTS categories CASCADE;
  DROP TABLE IF EXISTS products CASCADE;
  DROP TABLE IF EXISTS orders CASCADE;
  DROP TABLE IF EXISTS order_status CASCADE;
  DROP TABLE IF EXISTS order_details CASCADE;
  DROP TABLE IF EXISTS user_addresses CASCADE;
  DROP TABLE IF EXISTS cart_items CASCADE;
  DROP TABLE IF EXISTS carts CASCADE;

    CREATE TABLE users (
        id UUID PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        phone_number VARCHAR(15),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE admins (
        id UUID PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        permissions TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE categories (
        id UUID PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE products (
        id UUID PRIMARY KEY,
        category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
        name VARCHAR(255) NOT NULL,
        description VARCHAR(255),
        quantity INTEGER NOT NULL,
        price DECIMAL NOT NULL,
        image VARCHAR(255),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE order_status (
        id UUID PRIMARY KEY,
        status VARCHAR(25) NOT NULL
    );

    CREATE TABLE orders (
        id UUID PRIMARY KEY,
        user_id UUID REFERENCES users(id) ON DELETE SET NULL,
        status_id UUID REFERENCES order_status(id) ON DELETE SET NULL,
        total_price DECIMAL NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE order_details (
        id UUID PRIMARY KEY,
        order_id UUID REFERENCES orders(id) ON DELETE SET NULL,
        product_id UUID REFERENCES products(id) ON DELETE SET NULL,
        quantity INTEGER NOT NULL,
        price DECIMAL NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE user_addresses (
        id UUID PRIMARY KEY,
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        address_1 VARCHAR(100) NOT NULL,
        address_2 VARCHAR(100),
        city VARCHAR(50) NOT NULL,
        state VARCHAR(50) NOT NULL,
        postal_code INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE carts (
        id UUID PRIMARY KEY,
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        quantity INTEGER,
        cart_total DECIMAL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE cart_items (
        id UUID PRIMARY KEY,
        cart_id UUID REFERENCES carts(id) ON DELETE CASCADE,
        product_id UUID REFERENCES products(id) ON DELETE CASCADE,
        product_name VARCHAR(255),
        product_description VARCHAR(255),
        product_price DECIMAL,
        product_image DECIMAL,
        quantity INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
    );

  `;

    await client.query(SQL);
};

module.exports = { createTables, client };