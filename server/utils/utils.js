const jwt = require('jsonwebtoken')
const { tokenSecret, expiresIn } = require('../config/env/development')

const generateToken = (userId) => {
    return jwt.sign({ userId }, tokenSecret, {
        expiresIn
    })
}

module.exports = { generateToken }