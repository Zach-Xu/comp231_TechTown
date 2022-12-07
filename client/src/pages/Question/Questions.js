import React, { useState, useEffect } from 'react'
import { experimentalStyled as styled } from '@mui/material/styles';
import { Box, Paper, List, ListItem, ListItemText } from '@mui/material';
import Grid from '@mui/material/Grid';
import { baseURL } from '../../config/env'
import axios from 'axios';
import _ from 'lodash'
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function Questions() {

    const [list, setList] = useState([])

    useEffect(() => {
        const fetchAllQuestions = async () => {
            const { data } = await axios.get(`${baseURL}/api/posts`)
            setList(Object.entries(_.groupBy(data, question => question.category)))
        }
        fetchAllQuestions()
    }, [])

    return (
        <Box sx={{ flexGrow: 1, width: '100%', p: '2rem 5rem' }}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {list.length > 0 && list.map((question, index) => (
                    <Grid item xs={2} sm={4} md={4} key={question[0]}>
                        <Item sx={{ height: '300px' }}>
                            <Typography gutterBottom variant="h6" component="div">
                                {question[0]}
                            </Typography>
                            <List>
                                {
                                    question[1].map(q => (
                                        <ListItem disablePadding key={q._id}>
                                            <Link to={`/question/${q._id}`}>
                                                <ListItemText primary={q.title} />
                                            </Link>
                                        </ListItem>
                                    ))
                                }


                            </List>
                        </Item>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}
