const mongoose = require('mongoose')
const Product = require('../Models/product')
const ObjectID = mongoose.Schema.Types.ObjectId
//subschema
var itemSchema = new mongoose.Schema({
    itemName :{type:String },
    itemId : {type:String },
    itemPrice:{type:String}
    
    });
   
    
//mainschema
const orderSchema = new mongoose.Schema({
 
    OrderId:{
        type:String,
        required:true
    },
    OrderTime:{
        type:String,
        required:true
    },
    OrderType:{
        type:String,
        required:true
    },
    StoreNo:{
        type:Number,
        required:true
    },
    EmployeeId:{
        type:String,
        required:true,
        unique:true
    },
    PaymentType:{
        type:String,
        required:true
    },
    CustomerName:{
        type:String,
        required:true
    },
    CustomerId:{
        type:String,
        required:true
    },

    OrderItems:[itemSchema]

})

const order = mongoose.model('order',orderSchema)

module.exports= order




































































