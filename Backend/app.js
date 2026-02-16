const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');

// create a variable
const app = express();

// enable cors
app.use(cors());

// create a route
app.get('/', (req, res) => {
    res.send('Hello World!');
}); 

module.exports = app;