const mongoose = require('mongoose')
const { Schema } = mongoose
const bcrypt = require('bcryptjs')

const userSchema = Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
},
    {
        timeStamps: true
    }
)

userSchema.methods.matchPassword = (password) => {
    return bcrypt.compareSync(password, this.password)
}

userSchema.pre('save', (next) => {
    if (!this.isModified) {
        next()
    }

    const salt = bcrypt.genSaltSync(10)
    this.password = bcrypt.hashSync(this.password, salt)
})

const User = mongoose.model('User', userSchema)

module.exports = User