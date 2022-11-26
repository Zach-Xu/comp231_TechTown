const express = require('express')
const app = express()

app.listen(5000, () => {
    console.log('Server running at http://localhost:5000/');
})

app.get('/', (req, res) => {
    return res.end('get request working')
})