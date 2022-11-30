const asyncHandler = require('express-async-handler')
const Message = require('../models/messageModel')
const User = require('../models/userModel')
const Chat = require('../models/chatModel')

const getAllMessages = asyncHandler(async (req, res) => {
    const { chatId } = req.params
    //  
    const chat = await Chat.findById(chatId).populate('users', '-password')

    if (!chat.users.find(user => user._id.equals(req.user._id))) {
        throw new Error('Not the participants of the chat')
    }

    const messages = await Message.find({ chat: chatId })
        .populate('sender', '-password')
        .populate('receiver', '-password')
        .populate('chat')

    if (!messages) {
        throw new Error('Chat not found')
    }
    res.status(200).json(messages)
})

const sendMessage = asyncHandler(async (req, res) => {
    const { content, chatId } = req.body

    if (!content || !chatId) {
        throw new Error('Please provide necessary info to send a message')
    }

    let newMessage = {
        sender: req.user._id,
        content,
        chat: chatId
    }

    newMessage = await Message.create(newMessage)
    //get full message info
    newMessage = await Message.findById(newMessage._id).
        populate('sender', '-password')
        .populate('receiver', '-password')
        .populate('chat')

    res.status(201).json(newMessage)
})

module.exports = { getAllMessages, sendMessage }