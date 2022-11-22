const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const productRoutes =require('./Routes/productRoute')


mongoose.connect('mongodb+srv://Deepu:7700@cluster0.5yjfycv.mongodb.net/POS?retryWrites=true&w=majority')


app.use(bodyParser.urlencoded({extended: false})); // true allows it to parse rich data , false allows you to parse simple data
app.use(bodyParser.json());

app.use('/ProductRoutes',productRoutes)




module.exports =app