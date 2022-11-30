const express = require('express')
const router = express.Router()
const { getAllMessages, sendMessage } = require('../controllers/messageController')
const { protect } = require('../middlewares/authMiddleware')

// @route   GET api/messages/:chatId
// @desc    Get all messages for a chat
// @access  Private
router.get('/:chatId', protect, getAllMessages)

// @route   POST api/chats
// @desc    Create new message
// @access  Private
router.post('/', protect, sendMessage)

module.exports = router
