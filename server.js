// Imprt the depandencies
require('dotenv').config()
const express = require("express");
const app = express();

// Import the local depandencies
const mongoConnect = require('./configs/mongoDB');

// Express Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Connect to MongoDB atlas
mongoConnect()

// Routes


// Running the server on port 3000
app.listen(3000 || process.env.PORT, () => {
    console.log(`Server is running on port 3000 or ${process.env.PORT}`);
})