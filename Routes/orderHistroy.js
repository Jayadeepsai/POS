const express = require('express')
const { removeListener } = require('../Models/orderhistory')
const router = express.Router()
const mongoose = requrie('mongoose')

const OrderHistory = require('../Models/orderhistory')

router.post('/addOrderHistory' , async (req,res) => {

    const orderHistory = new OrderHistory(req.body)

    const OH = await orderHistory.save()
    try{
        res.status(201).json({
           Status: OH.OrderStatus , OH
        })

    }catch(err){
        console.log(err)
        res.status(400).json({Error: err})
    }

})


router.get('/OrderHistory' , async (req,res) => {
             
    const totalOrders = await OrderHistory.find()
    try{
        res.status(201).json({
            TotalOrdersLength : totalOrders.length , totalOrders
        })
    }catch(err){
        console.log(err)
        res.status(401).json({Error:err})
    }

})

// search by StoreNo.(default) , search by date , end and start date. 
router.get('/Order/:key', async (req,res) => {

           const Order = await new OrderHistory.find({
            '$or' : [
                {storeNo:{$regex:req.params.key}},
            
            ]
           })

           res.status(201).json({TotalOrdersLength:Order.length,Order })


})












module.exports = router