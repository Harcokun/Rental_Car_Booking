const express = require('express');
const dotenv = require('dotenv');

//Load env vars
dotenv.config({path:'./config/config.env'});

//Routes files
const cars = require('./routes/cars');

const app = express();

//Mount routers
app.use('/api/v1/cars', cars);

const PORT = process.env.PORT || 4500;
const server = app.listen(PORT, console.log('Server running in', process.env.NODE_ENV, 'mode on port', PORT));