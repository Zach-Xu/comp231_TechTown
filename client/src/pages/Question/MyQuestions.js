import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { baseURL } from '../../config/env'
import { getAuthConfig } from '../../utils/utlis'
import Box from '@mui/material/Box';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Paper from '@mui/material/Paper';
import moment from 'moment'


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


export default function MyQuestions() {

    const [questions, setQuestions] = useState([])

    useEffect(() => {
        const token = localStorage.getItem('techTownToken')
        const config = getAuthConfig(token)
        const getMyQuestions = async () => {
            const { data } = await axios(`${baseURL}/api/posts/myposts`, config)
            setQuestions(data)
        }
        getMyQuestions()
    }, [])

    const editQuestion = () => {

    }

    const deleteQuestion = () => {

    }

    return (
        <Box sx={{ width: '100%', p: '2rem 6rem' }}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 600 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Title</StyledTableCell>
                            <StyledTableCell align="left">Category</StyledTableCell>
                            <StyledTableCell align="left">Create Date</StyledTableCell>
                            <StyledTableCell align="center">Operations</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {questions.map((question) => (
                            <StyledTableRow key={question._id}>
                                <StyledTableCell component="th" scope="row">
                                    {question.title}
                                </StyledTableCell>
                                <StyledTableCell align="left">{question.category}</StyledTableCell>
                                <StyledTableCell align="left">{moment(question.createdDate).format('YYYY-MM-DD')}</StyledTableCell>
                                <StyledTableCell align="center">
                                    <Button style={{ marginRight: '20px' }} variant="contained" endIcon={<SettingsOutlinedIcon />}
                                        onClick={() => editQuestion(question)}
                                    >
                                        Edit
                                    </Button>
                                    <Button variant="outlined" startIcon={<DeleteIcon />}
                                        onClick={() => deleteQuestion(question)}>
                                        Delete
                                    </Button>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>

    )
}
