import React, { useState } from 'react'
import Box from '@mui/material/Box';
import { toast } from 'react-toastify'
import TextField from '@mui/material/TextField';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import Button from '@mui/material/Button';
import axios from 'axios';
import { baseURL } from '../../config/env'
import { getAuthConfig } from '../../utils/utlis'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

import { red, blue, green, cyan, purple, orange } from '@mui/material/colors';
import { Typography } from '@mui/material';

const colors = [red, blue, green, cyan, purple, orange]

export default function AddFriend() {

    const [keyword, setKeyword] = useState('')
    const [searchResult, setSearchResult] = useState([])

    const searchUser = async () => {
        if (!keyword.trim()) return
        const token = localStorage.getItem('techTownToken')
        const config = getAuthConfig(token)
        try {
            const { data } = await axios.get(`${baseURL}/api/users?search=${keyword.trim()}`, config)
            setSearchResult(data)
        } catch (error) {
            toast.error('Fail to find users, try again', {
                position: toast.POSITION.TOP_CENTER
            })
        }

    }

    return (
        <Box sx={{ width: '100%', p: '2rem 10rem' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <PersonSearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField label="Search User" variant="standard" sx={{ minWidth: '14rem' }}
                    value={keyword} onChange={e => setKeyword(e.target.value)} />
                <Button variant="contained" sx={{ ml: '10px' }} onClick={searchUser}>Go</Button>
            </Box>
            <Box sx={{ w: '90%', display: 'flex', flexWrap: 'wrap', mt: '20px' }}>
                {
                    searchResult.length > 0 ? searchResult.map(result => (
                        <Card sx={{ m: '0 10px 10px' }} key={result._id}>
                            <CardHeader
                                avatar={
                                    <Avatar sx={{ bgcolor: colors[result.username.length % (colors.length + 1) - 1][500] }} >
                                        {result.username.charAt(0)?.toUpperCase()}
                                    </Avatar>
                                }
                                action={
                                    <Button variant='contained' color='success' aria-label="settings" sx={{ ml: '0.6rem' }} >
                                        <PersonAddAltIcon fontSize='small' />
                                    </Button>
                                }
                                title={result.username}
                                subheader={result.email}
                            />
                        </Card>
                    )) : <Typography>No users matched</Typography>
                }
            </Box>
        </Box>

    )
}
