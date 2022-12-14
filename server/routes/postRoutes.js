const express = require('express')
const router = express.Router()
const { getAllPosts, getPostById, createPost, answerPost, getPostsForUser, updateContentAndCategory, deletePost } = require('../controllers/postController')
const { protect } = require('../middlewares/authMiddleware')

// @route   GET api/posts
// @desc    Get all posts
// @access  Public
router.get('/', getAllPosts)

// @route   GET api/posts/:postId
// @desc    Get a specific post
// @access  Public
router.get('/post/:postId', getPostById)

// @route   GET api/posts/myposts
// @desc    Get user's posts
// @access  Private
router.get('/myposts', protect, getPostsForUser)

// @route   POST api/posts
// @desc    Create a post
// @access  Private
router.post('/', protect, createPost)

// @route   POST api/posts/answer/:postId
// @desc    Create an answer
// @access  Private
router.post('/answer/:postId', protect, answerPost)

// @route   Patch api/posts/:postId
// @desc    Partially update a post
// @access  Private
router.patch('/:postId', protect, updateContentAndCategory)

// @route   DELETE api/posts/:postId
// @desc    Delete a post
// @access  Private
router.delete('/:postId', protect, deletePost)

module.exports = router