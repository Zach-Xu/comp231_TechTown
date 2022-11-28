const mongoose = require('mongoose')
const { Schema } = mongoose

const postSchema = Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: Schema.Types.ObjectId,
        ref: 'Category'
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    tags: [{
        name: {
            type: String
        }
    }],
    comments: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        content: {
            type: String,
            require: true
        },
        date: {
            type: Date,
            default: Date.now
        }
    }]
})

const Post = mongoose.model('Post', postSchema)
module.exports = Post