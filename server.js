const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');

//Load env vars
dotenv.config({path:'./config/config.env'});

//Connect to database
connectDB();

//Routes files
const carproviders = require('./routes/carproviders');
const auth = require('./routes/auth');

const app = express();

//Body parser
app.use(express.json());

//Cookie parser
app.use(cookieParser());

//Mount routers
app.use('/api/v1/carproviders', carproviders);
app.use('/api/v1/auth', auth);

const PORT = process.env.PORT || 4500;
const server = app.listen(PORT, console.log('Server running in', process.env.NODE_ENV, 'mode on port', PORT));

//Handle unhandled promise rejections
process.on('unhandkedRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    //Close server & exit process
    server.close(() => process.exit(1));
});