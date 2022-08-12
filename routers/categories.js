const { Category } = require('../models/category');
const express = require('express');
const router = express.Router();

//GET Category LIST
router.get('/', async (req, res) => {
    const categoryList = await Category.find();

    if (!categoryList) {
        res.status(500).json({ success: false });
    }
    res.status(200).send(categoryList);
});

//GET Category
router.get('/:id', async (req,res) => {
    const category = await Category.findById(req.params.id);

    if(!category){
        res.status(500).json({success: false, message: 'Category not found for the id'});
    }
    res.status(200).send(category);
})

//POST Save Category
router.post('/', async (req, res) => {
    let category = new Category({
        categoryName: req.body.name,
        icon: req.body.icon,
        color: req.body.color
    });


    category = await category.save();

    if (!category)
        res.status(404).send('the category cannot be created!');
    res.send(category);
});

//PUT Update Category
router.put('/:id', async (req,res) => {
    const category = await Category.findByIdAndUpdate(req.params.id,{
        categoryName : req.body.name,
        icon : req.body.icon,
        color : req.body.color
    },{new: true});

    if(!category){
        res.status(500).json({success: false, message: 'Category not found for the id'});
    }
    res.status(200).send(category);

});

//DELETE Category
router.delete('/:id', async (req, res) => {
    try {
        let category = await Category.findByIdAndRemove(req.params.id);
        if (category) {
            return res.status(200).json({ success: true, message: "Category is deleted" });
        } else {
            return res.status(404).json({ success: false, message: "Category not found" });
        }
    }
    catch(ex){
        return res.status(400).json({success: false, error: ex.message});
    }

});

module.exports = router;