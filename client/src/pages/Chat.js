import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { baseURL } from '../config/env'
import { getAuthConfig } from '../utils/utlis'
import Box from '@mui/material/Box';
import ScrollableChat from '../components/miscellaneous/ScrollableChat'
import { TextField, Button } from '@mui/material/';
import { toast } from 'react-toastify'
import SendIcon from '@mui/icons-material/Send';
import io from 'socket.io-client'
import { GlobalState } from '../context/GlobalProvider'


let socket

export default function Chat() {
    const token = localStorage.getItem('techTownToken')
    const config = getAuthConfig(token)

    const { user } = GlobalState()

    const { chatId } = useParams()
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')

    useEffect(() => {
        socket = io(baseURL)
        if (user) {
            socket.emit('join own room', user._id)
        }
    }, [user])

    useEffect(() => {
        getMessages()
    }, [chatId])


    useEffect(() => {
        const listener = (newMessage) => {

            if (!chatId || chatId !== newMessage.chat._id) {
                // give notification
            } else {
                setMessages(oldMessages => [...oldMessages, newMessage])
            }
        }
        socket.on('receive message', listener)
        return () => socket.removeListener('receive message', listener);
    }, [socket, chatId])

    const getMessages = async () => {
        try {
            const { data } = await axios.get(`${baseURL}/api/messages/${chatId}`, config)
            setMessages(data)

            socket.emit('join chat', chatId)
        } catch (error) {
            toast.error('Fail to fetch messages, try again!', {
                position: toast.POSITION.BOTTOM_CENTER
            })
        }
    }

    const typingHandler = (e) => {
        setMessage(e.target.value)
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && message.trim()) {
            sendMessage()
        }
    }

    const sendMessage = async () => {
        try {
            const { data } = await axios.post(`${baseURL}/api/messages`, {
                content: message,
                chatId
            }, config)

            socket.emit('send message', data)

            setMessage('')
            setMessages([...messages, data])
        } catch (error) {
            toast.error('Fail to send the message, try again', {
                position: toast.POSITION.BOTTOM_CENTER
            })
        }
    }

    return (
        <Box sx={{ width: '100%', p: '2rem 6rem' }}>
            <Box component="form" sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                width: '100%',
                height: '82vh',
                bgcolor: '#efeae2',
                borderRadius: '10px',
                overflowY: 'hidden'
            }}
                onKeyDown={handleKeyDown}
            >
                {
                    messages.length > 0 &&
                    <div className="messages">
                        <ScrollableChat messages={messages} />
                    </div>
                }
                <Box sx={{ width: '100%', p: '1rem', display: 'flex', alignItems: 'center' }}>
                    <TextField
                        id="outlined-multiline-flexible"
                        label="Enter a message..."
                        multiline
                        maxRows={4}
                        value={message}
                        onChange={typingHandler}
                        sx={{ flexGrow: 1 }}
                    />
                    <Button variant="contained"
                        disabled={message === '' ? true : false}
                        sx={{ width: '50px', height: '50px', ml: '0.4rem' }}
                        onClick={sendMessage}>
                        <SendIcon />
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}
