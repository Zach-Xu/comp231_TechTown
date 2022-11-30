import React from 'react'
import Avatar from '@mui/material/Avatar';
import { red, blue, green, cyan, purple, orange } from '@mui/material/colors';

const colors = [red, blue, green, cyan, purple, orange]

export default function MyAvatar({ username, width = '40px', height = '40px' }) {
    return (
        <Avatar sx={{ bgcolor: colors[username.length % (colors.length + 1) - 1][500], width, height }} >
            {username.charAt(0)?.toUpperCase()}
        </Avatar>
    )
}
