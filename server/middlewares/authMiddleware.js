const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')
const { tokenSecret } = require('../config/env/development')

const protect = asyncHandler(async (req, res, next) => {
    const { authorization } = req.headers
    let token

    // Bearer token required
    if (authorization && authorization.startsWith('Bearer')) {
        try {
            // Bearer abcddsfasfew(token)
            token = authorization.split(' ')[1]

            // decode token
            const decoded = jwt.verify(token, tokenSecret)

            req.user = await User.findById(decoded.userId).select('-password')
            next()
        } catch (error) {
            res.status(401);
            throw new Error("Invalid token");
        }
    }

    if (!token) {
        res.status(401);
        throw new Error("No token provided");
    }
})

module.exports = { protect }