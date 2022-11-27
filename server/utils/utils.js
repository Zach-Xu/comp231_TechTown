const jwt = require('jsonwebtoken')
const { sessionSecret, expiresIn } = require('../config/env/development')

const generateToken = (userId) => {
    return jwt.sign({ userId }, sessionSecret, {
        expiresIn
    })
}

module.exports = { generateToken }