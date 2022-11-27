const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const { generateToken } = require('../utils/utils')


const getAllUsers = asyncHandler(async (req, res) => {
    // exclude password
    const users = await User.find({}).select('-password')
    res.send(users)
})

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password, avatar } = req.body
    if (!username || !email || !password) {
        res.status(400)
        throw new Error('Please enter all the fields')
    }

    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error('Email already been registered')
    }

    let user = await User.create({
        username,
        email,
        password,
        avatar
    })

    user = user.toObject()

    let token = generateToken(user._id)

    user.token = token

    if (user) {
        delete user.password
        return res.status(201).json(user)
    }
    res.status(400)
    throw new Error('Fail to create the user')
})


const authUser = asyncHandler(async (req, res) => {
    const { email, password } = body

    const userExists = await User.findOne({ email })

    if (userExists && userExists.matchPassword(password)) {

        const user = userExists.toObject()

        let token = generateToken(user._id)
        user.token = token

        delete user.password
        return res.json(user)
    }

    res.status(401)
    throw new Error('Invalid email or password')
})

module.exports = { getAllUsers, registerUser, authUser }