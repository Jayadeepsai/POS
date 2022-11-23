const mongoose = require('mongoose')
const ObjectID = mongoose.Schema.Types.ObjectId


const orderhistorySchema = new mongoose.Schema({

   OrderId:{
    type: ObjectID,
    ref : 'Order'
  
   },
   TransactionID:{
    type: String,
    required: true,
    unique:true
   },
   OrderStatus:{
    type: String,
    required: true,
    default: 'Order Placed'
   }







})

module.exports = mongoose.model(OrderHistory , orderhistorySchema)