import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { baseURL } from '../config/env'
import { getAuthConfig } from '../utils/utlis'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { TextField, Button } from '@mui/material/';
import { styled } from '@mui/material/styles';
import { toast } from 'react-toastify'

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function Chat() {

    const { chatId } = useParams()
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')

    useEffect(() => {
        console.log('chatId', chatId);
        getMessages()
    }, [chatId])

    const getMessages = async () => {
        const token = localStorage.getItem('techTownToken')
        const config = getAuthConfig(token)
        try {
            const { data } = await axios.get(`${baseURL}/api/messages/${chatId}`, config)
            setMessages(data)
        } catch (error) {
            toast.error('Fail to fetch messages, try again!', {
                position: toast.POSITION.BOTTOM_CENTER
            })
        }
    }

    const typingHandler = (e) => {
        setMessage(e.target.value)

        // typing indicator logic
    }

    const sendMessage = (e) => {

    }


    return (
        <Box sx={{ width: '100%', p: '2rem 10rem' }}>
            <Box component="form" sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                height: '82vh',
                bgcolor: '#efeae2',
                borderRadius: '10px'
            }}
                onKeyDown={e => sendMessage(e)}
            >
                <Box sx={{ width: '100%', p: '1rem', display: 'flex', alignItems: 'center' }}>
                    <TextField
                        id="outlined-multiline-flexible"
                        label="Enter a message.."
                        multiline
                        maxRows={4}
                        value={message}
                        onChange={typingHandler}
                        sx={{ flexGrow: 1 }}
                    />
                    <Button variant="contained" disabled={message === '' ? true : false} sx={{ width: '50px', height: '50px', ml: '0.4rem' }}>Send</Button>
                </Box>


            </Box>
        </Box>
    )
}
