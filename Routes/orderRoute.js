const express = require('express');
const order = require('../Models/order');
const Order = require('../Models/order'); // requiring order schema

const router = new express.Router()



router.post('/postorder',(req,res,next)=>{
    const order = new Order(req.body) //we are utilizing schema here
    order.save()                       // saving the schema
    .then(result => {                  // async tasks 
        res.status (201).json({
            message: "order created" ,
            createdorder: order
            
        })
    })
    .catch(error => {                   //catch is for throwing errors
        res.status(400).json({Error: error})
    })

});

    router.get('/orders', async(req, res) => {      
        try {
            const order = await Order.find({})  // get all products
            res.status(200).json({
                Totalorders:order.length,order    // length of the schema we 've taken
            })
        } catch (error) {                          // catch is for throwing errors
            res.status(401).send(error)
        }
    });

    router.get('/order/:id', async(req, res) => { // we are using get method for individual id 
        try{
            const order = await Order.findOne({_id: req.params.id})
            if(!order) {    //if order is empty then it will throw an error as response
                res.status(404).send({error: "order not found"})   
            }
            res.status(200).json({order})         // if there is no error then it will give data of db result
        } catch (error) {
            res.status(401).send(error)
        }
    });


    router.put('/orders/:id',async(req,res) => {     //we are updating based on id
        const updates=Object.keys(req.body)
        const allowedUpdates= ['OrderStatus']         //here i want to update orrder status
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update))  //validoperation should be match with update field
        if(!isValidOperation) {  //if it is empty
            return res.status(400).json({ error : 'invalid updates'})//it will throw error as response
        }
        try{
            const order=await Order.findOne({_id:req.params.id})  //i want to update with document id 
            if(!order){  //if update is empty it will throw error as response
                return res.status(404).json({ message:'Invalid Order'})
            }
                updates.forEach((update) => order [update] =req.body[update])
                        
                await order.save()
                res.send(order)
        } catch (error) {        
            res.status(400).send(error)
        }
    });

   


    router.get('/orderByStoreNo/:StoreNo',async(req,res)=>{      
        try{
            const order= await Order.find({StoreNo:req.params.StoreNo})
            if(!order){
                res.status(404).send({error: "order not found"})
            }
            res.status(400).json({
                TotalordersInTheStore:order.length,
                order})
        }catch(error){
            res.status(401).json({error})
            console.log(error)    //console .log outputs the message to web console
        }
    });

    router.get('/orderByCustomerId/:CustomerId',async(req,res)=>{
        try{
            const order= await Order.find({CustomerId:req.params.CustomerId})
            if(!Order){
                res.status(404).send({error: "order not found"})
            }
            res.status(400).json({order})

        }catch(error){
            res.status(401).json({error})
            console.log(error)
        }
    });


    router.delete('/order/:id', async(req, res) => {
        try {
            const deletedorder = await order.findOneAndDelete( {_id: req.params.id} )
            if(!deletedorder) {
                res.status(404).json({error: "order not found"})
            }
            res.status(400).json({message:'order Deleted',
            deletedorder})
        } catch (error) {
            res.status(400).json(error)
        }
    })





    module.exports=router