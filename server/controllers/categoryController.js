const asyncHandler = require('express-async-handler')
const Category = require('../models/categoryModel')

const createCategory = asyncHandler(async (req, res) => {
    const { name } = req.body
    if (!name) {
        res.status(400)
        throw new Error('Please provide the name of the category')
    }

    const categoryExists = await Category.findOne({ name })

    console.log('categoryExists', categoryExists);

    if (categoryExists) {
        throw new Error('Category with such name already exists')
    }

    const category = await Category.create({
        name
    })

    if (category) {
        return res.status(201).json(category)
    }
    res.status(400)
    throw new Error('Fail to create the post')
})

const getAllCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find().sort('name')
    res.json(categories)
})

module.exports = { getAllCategories, createCategory }