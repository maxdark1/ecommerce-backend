const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');

const api = process.env.API_URL;

//Middleware
app.use(cors());
app.options('*', cors());
app.use(express.json());
//Middleware to log server events like requests.
app.use(morgan('tiny'));

//Routes
const productsRouter = require('./routers/products');
app.use(`${api}/products`, productsRouter);

const categoryRouter = require('./routers/categories');
app.use(`${api}/categories`, categoryRouter);

mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser:true,
    useUnifiedTopology: true,
    dbName: 'eshop-database'
})
.then(() => {
    console.log("Database Connection is ready...");
})
.catch((err) => {
    console.log(err);
})

app.listen(3000, ()=>{
    console.log(api);
    console.log("The server is runnin http://localhost:3000")
});