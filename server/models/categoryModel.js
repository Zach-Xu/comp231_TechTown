const mongoose = require('mongoose')
const { Schema } = mongoose

const categorySchema = Schema({
    name: {
        type: String,
        require: true
    }
})

const Category = mongoose.model('Category', categorySchema)
module.exports = Category