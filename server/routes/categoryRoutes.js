const express = require('express')
const router = express.Router()
const { getAllCategories, createCategory } = require('../controllers/categoryController')

// @route   GET api/categories
// @desc    Get all categories
// @access  Public
router.get('/', getAllCategories)

// @route   POST api/categories
// @desc    Create a new category
// @access  Public for now (admin in the future)
router.post('/', createCategory)

module.exports = router