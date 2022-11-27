const express = require('express')
const router = express.Router()
const { getAllUsers, registerUser, authUser } = require('../controllers/userController')

router.get('/', getAllUsers)
router.post('/', registerUser)
router.post('/login', authUser)

module.exports = router