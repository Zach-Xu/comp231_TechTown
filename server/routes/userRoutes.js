const express = require('express')
const router = express.Router()
const { getAllUsers, registerUser, authUser, getTokenUser } = require('../controllers/userController')
const { protect } = require('../middlewares/authMiddleware')

// @route   GET api/users
// @desc    Get all users
// @access  Public
router.get('/', getAllUsers)

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post('/', registerUser)

// @route   POST api/users/login
// @desc    Login
// @access  Public
router.post('/login', authUser)

// @route   GET api/users/token
// @desc    return the user corresponding to the token
// @access  Private
router.get('/tokenuser', protect, getTokenUser)

module.exports = router