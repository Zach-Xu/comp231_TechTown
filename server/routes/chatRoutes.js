const express = require('express')
const router = express.Router()
const { protect } = require('../middlewares/authMiddleware')
const { getChats, createGroupChat, renameGroup } = require('../controllers/chatController')

// @route   GET api/chats[?userId=]
// @desc    Get all chats or a chat with a specific user
// @access  Private
router.get('/', protect, getChats)

// @route   POST api/chats
// @desc    Create a group chat
// @access  Private
router.post('/', protect, createGroupChat)

// @route   PATCH api/chats/:chatId
// @desc    Rename a group
// @access  Private
router.patch('/:chatId', protect, renameGroup)

module.exports = router