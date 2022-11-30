const express = require('express')
const router = express.Router()
const { protect } = require('../middlewares/authMiddleware')
const { getOneOnOneChats, getGroupChats, createGroupChat, renameGroup } = require('../controllers/chatController')

// @route   GET api/chats/oneonone[?userId=]
// @desc    Get all one one one chats or chat with a specific user
// @access  Private
router.get('/oneonone', protect, getOneOnOneChats)

// @route   GET api/chats/group
// @desc    Get all group chats
// @access  Private
router.get('/group', protect, getGroupChats)



// @route   POST api/chats
// @desc    Create a group chat
// @access  Private
router.post('/', protect, createGroupChat)

// @route   PATCH api/chats/:chatId
// @desc    Rename a group
// @access  Private
router.patch('/:chatId', protect, renameGroup)

module.exports = router