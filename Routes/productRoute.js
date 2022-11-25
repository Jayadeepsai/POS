const e = require('express');
const express = require('express');
const Product = require('../Models/product')

const router = new express.Router()

//Posting of Products

router.post('/postProduct', async (req, res) => {
    const product = new Product(req.body
       /* Name: req.body.Name,
        productId: req.body.productId,
        description: req.body.description*/
    )
  
    try {
        await product.save()
       
        res.status(201).json({
            registeredproduct:product
            })
    } catch (error) {
        console.log(error)
        res.status(401).json(error)
    }
    });

//Getting all the Products

    router.get('/AllProducts', async(req, res) => {
        try {
            const product = await Product.find()

            
            res.status(200).json({
                TotalProducts:product.length,product
            })
        } catch (error) {
            res.status(401).send(error)
        }
    });

//Search functionality by UPC, StoreNo ,category

    router.get('/search/:key', async(req, res) => {
        try {
            const product = await Product.find({
               "$or":[
                {UPC:{$regex:req.params.key}},  
                {storeNo:{$regex:req.params.key}},
                {category:{$regex:req.params.key}}
               ]
            })

            var data =product.filter(x=> x.isActive == true)
            res.status(200).json({
                TotalProducts:data.length,
                filtereddata:data
            })
 
          /*  var data =product.filter(x=> x.isActive == false)
             res.status(401).json({
             message: "Product is not Active"
            })*/
        
        } catch (error) {
            res.status(401).json({
                message: "Product not found",
                error
            })
        }
    });


//Get the product by id

    router.get('/product/:id', async(req, res) => {
        try{
            const product = await Product.findOne({_id: req.params.id})
           // console.log(product.Name)
            if(!product) {
                res.status(404).send({error: "Product not found"})
            }
            res.status(200).send(product) 
        } catch (error) {
            res.status(401).send(error)
        }
    })

    //Get the product by UPC
   
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

    //Get the product by StoreNO

    router.get('/productsByStoreNo/:storeNo',async(req,res)=>{
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

    //Delete the product by id

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

    //Delete the product by UPC

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

    //Update the product Data by id

    router.put('/productData/:_id' , async (req,res) => {
        const productid = req.params._id
        const allowedUpdates = ['Name','productId','description','category','categoryId','price','UPC','storeNo','shelfNo','isActive']
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

    //Sorting by price high to low

    router.get('/productByPrice',async(req,res)=>{
        try{
            const product= await Product.find().sort({price:-1}) //using sort in find function 
            if(!product){
                res.status(404).send({error: "No Products Available"})
            }
            res.status(400).json({product})
        }catch(error){
            res.status(401).json({error})
            console.log(error)
        }
    })
    
    module.exports=router