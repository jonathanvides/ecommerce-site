const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { createTables, client } = require("./db");
const { seedDatabase } = require('./seedDatabase.js');

const app = express();
const port = process.env.PORT || 3000;

const products = require('./routes/productRoute.js');
const admins = require('./routes/adminRoute.js');
const users = require('./routes/userRoute.js');

app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true,
    })
);

app.use(morgan("dev"));
app.use(express.json());

app.use('/api/products', products);
app.use('/api/admins', admins);
app.use('/api/users', users);

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
