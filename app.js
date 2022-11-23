const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const productRoutes =require('./Routes/productRoute')
const orderRoutes = require('./Routes/orderRoute')


mongoose.connect('mongodb+srv://anunyaanu:anunyachow123@cluster0.ipbfqc7.mongodb.net/?retryWrites=true&w=majority')


app.use(bodyParser.urlencoded({extended: false})); // true allows it to parse rich data , false allows you to parse simple data
app.use(bodyParser.json());

app.use('/ProductRoutes',productRoutes)
app.use('/orderRoutes',orderRoutes)




module.exports =app