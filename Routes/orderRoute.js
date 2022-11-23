const express = require('express');
const Order = require('../Models/order'); // requiring order schema

const router = new express.Router()



router.post('/postorder', async (req, res) => {
    const order = new Order(req.body)   //we are utilizing Schema
    try {
        await order.save()
       
        res.status(201).json({
            registeredorder:order
            })
    } catch (error) {
        res.status(401).json(error)
    }
    });

    router.get('/orders', async(req, res) => {
        try {
            const order = await Order.find({})
            res.status(200).json({
                Totalorders:order.length,order
            })
        } catch (error) {
            res.status(401).send(error)
        }
    });

    router.get('/order/:id', async(req, res) => {
        try{
            const order = await Order.findOne({_id: req.params.id})
            if(!order) {
                res.status(404).send({error: "order not found"})
            }
            res.status(200).json({order}) 
        } catch (error) {
            res.status(401).send(error)
        }
    })


    module.exports=router