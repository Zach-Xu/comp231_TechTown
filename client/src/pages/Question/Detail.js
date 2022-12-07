import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { baseURL } from '../../config/env'
import { Box, Typography, IconButton, Grid } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import moment from 'moment'
import { styled } from '@mui/material/styles';
import { padding } from '@mui/system'

const Item = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


export default function Detail() {

    const { questionId } = useParams()
    const [question, setQuestion] = useState()
    useEffect(() => {
        const fetchQuestion = async () => {
            const { data } = await axios.get(`${baseURL}/api/posts/post/${questionId}`)
            setQuestion(data)
            console.log('data', data);
        }
        try {
            fetchQuestion()
        }
        catch (error) {
            toast.error('Failed to fecth question', {
                position: toast.POSITION.BOTTOM_CENTER
            })
        }

    }, [questionId])

    const navigate = useNavigate()
    const goBack = () => {
        navigate('/questions')
    }

    return (
        question &&
        <Box sx={{ width: '100%', p: '2rem 4rem' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <IconButton aria-label="back" onClick={goBack} sx={{ ml: '1rem' }}>
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h4" sx={{ m: '1rem 0.5rem', mb: '1.4rem', textAlign: 'center', width: '100%' }} >
                    {question.title}
                </Typography>
            </div>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ p: '0 4rem' }}>
                <Grid item xs={4}>
                    <Item>
                        Author: <strong>{question.user.username}</strong>
                    </Item>
                </Grid>
                <Grid item xs={4}>
                    <Item>Category: <strong>{question.category}</strong></Item>
                </Grid>
                <Grid item xs={4}>
                    <Item> Created Date: <strong>{moment(question.createdDate).format('YYYY-MM-DD')}</strong></Item>
                </Grid>
            </Grid>
            <div
                dangerouslySetInnerHTML={{
                    __html: question.content
                }}
                style={{
                    margin: "0 24px",
                    border: "1px solid gray",
                    padding: '1rem 2rem'
                }}
            ></div>

        </Box>
    )
}
