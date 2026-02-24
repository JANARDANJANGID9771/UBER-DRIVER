const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
// create a variable
const app = express();
const connecToDB = require('./db/db');
const userRoutes = require('./routes/user.routes');
connecToDB();
// enable cors
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// create a route
app.get('/', (req, res) => {
    res.send('Hello World!');
}); 

app.use('/users', userRoutes);


module.exports = app;