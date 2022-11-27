const express = require('express')
const router = express.Router()
const { getAllPosts, createPost, updateContentAndCategory, deletePost } = require('../controllers/postController')
const { protect } = require('../middlewares/authMiddleware')

// @route   GET api/posts
// @desc    Get all posts
// @access  Public
router.get('/', getAllPosts)

// @route   POST api/posts
// @desc    Create a post
// @access  Private
router.post('/', protect, createPost)

// @route   Patch api/posts/:postId
// @desc    Partially update a post
// @access  Private
router.patch('/:postId', protect, updateContentAndCategory)

// @route   DELETE api/posts/:postId
// @desc    Delete a post
// @access  Private
router.delete('/:postId', protect, deletePost)

module.exports = router