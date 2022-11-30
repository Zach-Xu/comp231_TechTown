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
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import MyAvatar from '../../components/miscellaneous/MyAvatar';
import { getFriend } from '../../utils/utlis';

import { Typography } from '@mui/material';
import { GlobalState } from '../../context/GlobalProvider';


export default function AddFriend() {

    const [keyword, setKeyword] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const { friends, setFriends, user } = GlobalState()

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

    const addToFriend = async (userId) => {
        console.log('user', user);
        // if already is a friend
        if (friends.find(friend => getFriend(user, friend.users)._id === userId)) {
            toast.error('This user is already your friend', {
                position: toast.POSITION.BOTTOM_CENTER
            })
            return
        }

        const token = localStorage.getItem('techTownToken')
        const config = getAuthConfig(token)
        try {
            const { data } = await axios.get(`${baseURL}/api/chats/oneonone?userId=${userId}`, config)
            setFriends([...friends, data])
        } catch (error) {
            toast.error('Fail to add friend, try again', {
                position: toast.POSITION.BOTTOM_CENTER
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
            <Box sx={{ w: '100%', display: 'flex', flexWrap: 'wrap', mt: '20px' }}>
                {
                    searchResult.length > 0 ? searchResult.map(result => (
                        <Card sx={{ m: '0 10px 10px' }} key={result._id}>
                            <CardHeader
                                avatar={
                                    <MyAvatar username={result.username} />
                                }
                                action={
                                    <Button variant='contained' color='success' aria-label="settings"
                                        sx={{ ml: '0.6rem' }} onClick={() => addToFriend(result._id)}>
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
