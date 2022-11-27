import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { baseURL } from '../../config/env'

export default function Login() {

    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const login = async (e) => {
        e.preventDefault()
        e.preventDefault()
        const { data } = await axios.post(`${baseURL}/api/users/login`, user)
        console.log(data);
    }

    return (
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column' }} onSubmit={login}>

            <TextField
                type='email'
                required
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
            <Button type="submit" variant="contained" sx={{ mt: '10px', fontSize: '18px' }}>Log In</Button>
        </Box>
    )
}
