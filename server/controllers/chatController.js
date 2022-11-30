const asyncHandler = require('express-async-handler')
const Chat = require('../models/chatModel')
const User = require('../models/userModel')


const getChats = asyncHandler(async (req, res) => {
    let chats
    const { userId } = req.query
    // get all chats for a user
    if (!userId) {
        chats = await Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
            .populate('users', '-password')
            .sort({ updatedAt: -1 })
        res.status(200).json(chats)
    } else {
        // get chat with a specific user
        chats = await Chat.find({
            isGroupChat: false,
            $and: [
                {
                    users: { $elemMatch: { $eq: req.user._id } }
                },
                {
                    users: { $elemMatch: { $eq: userId } }
                }
            ]
        }).populate('users', '-password')

        // such chat exists
        if (chats.length > 0) {
            res.status(200).json(chats[0])
        } else {
            // create a chat with this user
            let newChat = {
                chatName: '1 on 1 chat',
                isGroupChat: false,
                users: [req.user._id, userId]
            }
            newChat = await Chat.create(newChat)
            // get full chat info
            newChat = Chat.findById(newChat._id).populate('users', '-password')
            res.status(201).json(newChat)
        }
    }
})

const createGroupChat = asyncHandler(async (req, res) => {
    let { users, name } = req.body
    if (!users || !name) {
        throw new Error('Please provide all the fields')
    }

    users = JSON.parse(users)
    if (users.length < 2) {
        throw new Error('At least 3 users are required to create a group chat')
    }

    users.push(req.user._id)
    let groupChat = {
        chatName: name,
        users,
        isGroupChat: true
    }

    groupChat = await Chat.create(groupChat)
    // get full chat info
    groupChat = await Chat.findById(groupChat._id).populate('users', '-password')
    res.status(201).json(groupChat)
})

const renameGroup = asyncHandler(async (req, res) => {
    const { chatId } = req.params
    const { name } = req.body
    if (!chatId || !name) {
        throw new Error('Please provide all the necessary info to rename the group')
    }
    const groupChat = await Chat.findByIdAndUpdate(chatId, { chatName: name }, { new: true })
        .populate('users', '-password')

    if (!groupChat) {
        throw new Error('Chat not found')
    }
    res.status(200).json(groupChat)
})

module.exports = { getChats, createGroupChat, renameGroup }