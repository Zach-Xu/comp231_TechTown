const mongoose = require('mongoose')
const { Schema } = mongoose

const categorySchema = Schema({
    usage: {
        type: String,
        enum: ['front-end', 'back-end', 'full-stack'],
        default: 'back-end'
    },
    name: {
        type: String,
        require: true
    }
})

const Category = mongoose.model('Category', categorySchema)
module.exports = Category