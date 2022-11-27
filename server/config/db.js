const mongoose = require('mongoose')

const { connectionString } = require('./env/development')

const connectDB = async () => {
    try {
        await mongoose.connect(connectionString)
        console.log('MongoDB connected');
    } catch (error) {
        console.error(error)
        // Stop application if fail to connect MongoDB
        process.exit(1)
    }
}

module.exports = connectDB