const express = require("express");
const app = express();
app.use(express.json());

const cors = require("cors");
const path = require('path');
const morgan = require("morgan");
const { createTables, client } = require("./db");
const { seedDatabase } = require('./seedDatabase.js');

const port = process.env.PORT || 3000;

const products = require('./routes/productRoute.js');
const admins = require('./routes/adminRoute.js');
const users = require('./routes/userRoute.js');
const carts = require('./routes/cartRoute.js');
const orders = require('./routes/orderRoute.js');
const categories = require('./routes/categoryRoute.js');

app.use(
    cors({
        origin: 'https://ecommerce-site-frontend.onrender.com',
        credentials: true,
    })
);

app.use(morgan("dev"));

app.use('/api/products', products);
app.use('/api/admins', admins);
app.use('/api/users', users);
app.use('/api/carts', carts);
app.use('/api', orders);
app.use('/api', categories);

app.use(express.static(path.join(__dirname, 'frontend/dist')));
app.get('/store/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/dist/index.html'));
});

const init = async () => {
    try {
        console.log("connecting to database...");
        await client.connect();
        console.log("connected to the database");

        await createTables();
        await seedDatabase();
        
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (error) {
        console.error('Error with server', error);
    }
};

init();
