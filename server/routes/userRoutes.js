const express = require('express')
const router = express.Router()
const { getAllUsers, registerUser, authUser } = require('../controllers/userController')

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

module.exports = router