require('dotenv').config();

const express = require('express');
const cors = require("cors")
const { PrismaClient } = require('@prisma/client');
// const dotenv = require('dotenv');

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes')


// dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors())

app.use('/users', userRoutes);
app.use ('/products',productRoutes)

const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL;
const JWT_SECRET = process.env.JWT_SECRET;

// Debugging: Check if env variables are loaded
// console.log("PORT from env:", PORT);
// console.log("DATABASE_URL from env:", DATABASE_URL ? "Loaded" : "Not Loaded");
// console.log("JWT_SECRET from env:", JWT_SECRET ? "Loaded" : "Not Loaded");


app.listen(PORT, "0.0.0.0",() => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;