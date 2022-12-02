const mongoose = require('mongoose')
const { Schema } = mongoose

const chatSchema = Schema({
    chatName: {
        type: String,
        require: true
    },
    isGroupChat: {
        type: Boolean,
        default: false
    },
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {
    timeStamps: true
})

const Chat = mongoose.model('Chat', chatSchema)

module.exports = Chat

