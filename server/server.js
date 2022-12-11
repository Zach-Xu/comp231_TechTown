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
const chatRouter = require('./routes/chatRoutes')
const messageRouter = require('./routes/messageRoutes')

app.use('/api/users', userRouter)
app.use('/api/posts', postRouter)
app.use('/api/categories', categoryRouter)
app.use('/api/chats', chatRouter)
app.use('/api/messages', messageRouter)

const PORT = process.env.PORT || 5000

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})

const io = require('socket.io')(server, {
    pingTimeout: 60000,
    cors: {
        origin: "*"
    }
})

io.on('connection', socket => {
    socket.on('join own room', (userId) => {
        socket.join(userId)
        console.log(`User joined room ${userId}`);
        socket.emit('connected')
    })

    socket.on('join chat', (chatId) => {
        socket.join(chatId)
        // console.log(`User joined room ${chatId}`);
    })

    socket.on('send message', (message) => {
        const { chat } = message
        if (!chat) {
            return console.log('Invalid message data');
        }
        // send message to everyone except the sender
        chat.users.forEach(user => {
            if (user == message.sender._id) return
            socket.in(user).emit('receive message', message)
        });
    })
})
