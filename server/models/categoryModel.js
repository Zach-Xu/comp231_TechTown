const mongoose = require('mongoose')
const { Schema } = mongoose

const categorySchema = Schema({
    type: {
        type: String,
        enum: ['front-end', 'back-end'],
        default: 'back-end'
    },
    name: {
        type: String,
        require: true
    }
})

const Category = mongoose.model('Category', categorySchema)
module.exports = Category