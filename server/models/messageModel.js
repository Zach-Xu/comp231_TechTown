const mongoose = require('mongoose')
const { Schema } = mongoose

const messageSchema = Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String,
        trim: true
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    chat: {
        type: Schema.Types.ObjectId,
        ref: 'Chat'
    }

}, {
    timeStamps: true
})

const Message = mongoose.model('Message', messageSchema)
module.exports = Message