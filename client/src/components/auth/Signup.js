import React, { useState, useEf, useEffectfect } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { baseURL } from '../../config/env'
import { ToastContainer, toast } from 'react-toastify';
import { GlobalState } from '../../context/GlobalProvider'

export default function Signup() {
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: ''
    })


    const signup = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post(`${baseURL}/api/users`, user)
            localStorage.setItem('techTownToken', data.token)
            toast.success('Register successfully', {
                position: toast.POSITION.TOP_CENTER
            })
        } catch (error) {
            toast.error('Fail to sign up', {
                position: toast.POSITION.TOP_CENTER
            })
        }
    }

    return (
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column' }} onSubmit={signup}>
            <TextField
                required
                label="Username"
                sx={{ minWidth: '400px', margin: '10px 0' }}
                value={user.username}
                onChange={e => { setUser({ ...user, username: e.target.value }) }}
            />
            <TextField
                required
                type='email'
                label="Email"
                sx={{ minWidth: '400px', margin: '10px 0' }}
                value={user.email}
                onChange={e => { setUser({ ...user, email: e.target.value }) }}
            />
            <TextField
                required
                type="password"
                label="Password"
                sx={{ minWidth: '400px', margin: '10px 0' }}
                onChange={e => { setUser({ ...user, password: e.target.value }) }}
            />
            <Button type="submit" variant="contained" sx={{ mt: '10px', fontSize: '18px' }}>Sign Up</Button>
            <ToastContainer />
        </Box>
    )
}
