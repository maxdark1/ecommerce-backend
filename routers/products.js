const express = require('express');
const { Category } = require('../models/category');
const router = express.Router();

//Models
const { Product } = require('../models/products');

//GET Products List
router.get(`/`, async (req,res) => {
    const productList = await Product.find();
    if(!productList) {
        res.status(500),json({success: false});
    }
    res.send(productList);
});

//POST Save new Product
router.post(`/`, async (req,res) => {
    try{
        const category = await Category.findById(req.body.category);

        if(!category){
            res.status(400).json({
                error: "Invalid Category",
                success: false
            });
        }

        let product = new Product({
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image: req.body.image,
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured,
        });

        product = await product.save();
        if(!product){
            res.status(500).json({
                error: err,
                success: false
            });
        }
        res.status(201).json(product);    
    }
    catch(err){
        res.status(500).json({success: false, error: err.message});
    }
});

module.exports = router;