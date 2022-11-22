const express = require('express');
const Product = require('../Models/product')

const router = new express.Router()



router.post('/postProduct', async (req, res) => {
    const product = new Product(req.body)
    try {
        await product.save()
       
        res.status(201).json({
            registeredproduct:product
            })
    } catch (error) {
        res.status(401).json(error)
    }
    });


    router.get('/AllProducts', async(req, res) => {
        try {
            const product = await Product.find({})
            res.status(200).json({
                TotalProducts:product.length,product
            })
        } catch (error) {
            res.status(401).send(error)
        }
    });


    router.get('/product/:id', async(req, res) => {
        try{
            const product = await Product.findOne({_id: req.params.id})
            if(!product) {
                res.status(404).send({error: "Product not found"})
            }
            res.status(200).send(product) 
        } catch (error) {
            res.status(401).send(error)
        }
    })

   
    router.get('/productByUPC/:UPC',async(req,res)=>{
        try{
            const product= await Product.find({UPC:req.params.UPC})
            if(!product){
                res.status(404).send({error: "Product not found"})
            }
            res.status(400).json({product})
        }catch(error){
            res.status(401).json({error})
            console.log(error)
        }
    })


    router.get('/productByStoreNo/:storeNo',async(req,res)=>{
        try{
            const product= await Product.find({storeNo:req.params.storeNo})
            if(!product){
                res.status(404).send({error: "Product not found"})
            }
            res.status(400).json({
                TotalProductsInTheStore:product.length,
                product})
        }catch(error){
            res.status(401).json({error})
            console.log(error)
        }
    })

    router.delete('/product/:id', async(req, res) => {
        try {
            const deletedProduct = await Product.findOneAndDelete( {_id: req.params.id} )
            if(!deletedProduct) {
                res.status(404).json({error: "Product not found"})
            }
            res.status(400).json({message:'Product Deleted',
            deletedProduct})
        } catch (error) {
            res.status(400).json(error)
        }
    })

    router.delete('/product/:UPC', async(req, res) => {
        try {
            const deletedProduct = await Product.findOneAndDelete( {UPC: req.params.UPC} )
            if(!deletedProduct) {
                res.status(404).json({error: "Product not found"})
            }
            res.status(400).json({message:'Product Deleted',
            deletedProduct})
        } catch (error) {
            res.status(400).json(error)
        }
    })

    router.put('/productData/:_id' , async (req,res) => {
        const productid = req.params._id
        const allowedUpdates = ['Name','description','category','price','UPC','storeNo']
        const updates = Object.keys(req.body)
        const updatesOps = {}
    
        updates.forEach(arr => {
            if(!allowedUpdates.includes(arr)){
                res.status(400).json({
                    message: "Invalid Update Request",
                })
                return
            }
              updatesOps[arr] = req.body[arr]
        })
      try{
          const ProductInfo = await Product.updateOne({id: productid} , {$set : updatesOps})
          res.status(201).json({ 
              message: "Product data has been updated successfully" ,
              ProductInfo
          })
      }catch(err){
          console.log(err)
          res.status(400).json({err})
      } 
    })

    module.exports=router