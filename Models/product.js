const mongoose = require('mongoose')
//const ObjectID = mongoose.Schema.Types.ObjectId

const ProductSchema = new mongoose.Schema({
 
    Name:{
        type:String,
        required:true
    },
    productId:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    categoryId:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    UPC:{
        type:String,
        required:true,
        unique:true
    },
    storeNo:{
        type:String,
        required:true
    },
    shelfNO:{
        type:String,
        required:true
    },
    isActive:{
        type:Boolean,
        required:true
    }

})

const Product = mongoose.model('Product',ProductSchema)

module.exports= Product