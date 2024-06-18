// Error Handling:
// Create an error handling middleware to catch an error and throw an error message with a status.

const { createTables, client, createUser, createProduct, fetchUsers, fetchProducts, deleteProduct, } = require("./db");

const express = require("express");
const app = express();

app.use(express.json());

const init = async () => {
  
    console.log("connecting to database...");
    await client.connect();
    console.log("connected to the database");
    
    await createTables();
      
};