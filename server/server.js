const express = require('express')
const bodyParser = require("body-parser");
const app = express()

const connectDB = require('./config/db')
connectDB()


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Methods", "DELETE, PUT, PATCH");
    next();
});

app.get('/', (req, res) => {
    res.send('API running')
})

//import routes

const userRouter = require('./routes/userRoutes')
const postRouter = require('./routes/postRoutes')
const categoryRouter = require('./routes/categoryRoutes')
app.use('/api/users', userRouter)
app.use('/api/posts', postRouter)
app.use('/api/categories', categoryRouter)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
