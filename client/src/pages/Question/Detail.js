import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { baseURL } from '../../config/env'
import { Box, Typography, IconButton, Grid, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import moment from 'moment'
import { styled } from '@mui/material/styles';
import { getAuthConfig } from '../../utils/utlis'
import { GlobalState } from '../../context/GlobalProvider'

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
    const [answer, setAnswer] = useState('')
    const [answers, setAnswers] = useState([])
    const { user } = GlobalState()
    useEffect(() => {
        const fetchQuestion = async () => {
            const { data } = await axios.get(`${baseURL}/api/posts/post/${questionId}`)
            setQuestion(data)
            console.log('data', data);
            setAnswers(data.answers)
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

    const submitAnswer = async () => {
        try {
            const token = localStorage.getItem('techTownToken')
            const config = getAuthConfig(token)
            const { data } = await axios.post(`${baseURL}/api/posts/answer/${questionId}`, {
                content: answer
            }, config)
            setAnswers(data)
        } catch (error) {
            console.log(error);
        }
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
            {
                user ? user._id !== question.user._id && <div className='answer'>
                    <h3 className='header-comment'>Leave your answer</h3>
                    <form className='form-comment' >
                        <textarea cols="30" rows="5" placeholder="Write down you thoughts here" value={answer} onChange={e => setAnswer(e.target.value)} required></textarea>
                        <Button variant="contained" onClick={submitAnswer}>Submit</Button>
                    </form>
                </div>
                    :
                    <h4 className='answer' style={{ marginTop: '10px' }}>You must login to answer the question</h4>
            }
            <div className="comments answer">
                <h2 className='header-comment'>{question?.answers?.length > 0 ? 'Answers' : 'No one answered yet'}</h2>
                <ul>
                    {answers.map(ans => (
                        <li className='comment' key={ans._id}>
                            <div>
                                <span>Author: <strong>{ans.user.username}</strong></span>
                                <span>Answered {moment(ans.date).format('YYYY-MM-DD')}</span>
                            </div>
                            <p className="content">{ans.content}</p>
                        </li>
                    ))}
                </ul>
            </div>

        </Box>
    )
}
