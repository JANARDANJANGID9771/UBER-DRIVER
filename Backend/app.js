const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
// create a variable
const app = express();
const cookieParser  = require('cookie-parser');
const connecToDB = require('./db/db');
const userRoutes = require('./routes/user.routes');
const captainRoutes = require('./routes/captain.routes');


connecToDB();
// enable cors
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



// create a route
app.get('/', (req, res) => {
    res.send('Hello World!');
}); 

app.use('/users', userRoutes);
app.use('/captains', captainRoutes);


module.exports = app;