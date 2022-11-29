import React, { useState, useEffect, Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { GlobalState } from '../../context/GlobalProvider'
import QuestionEditor from '../../components/question/QuestionEditor';
import axios from 'axios';
import { baseURL } from '../../config/env'
import { getAuthConfig } from '../../utils/utlis'

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { toast } from 'react-toastify';


const steps = ['Basic Info', 'Question Content', 'Post Question'];

export default function Question() {

    const { user } = GlobalState()

    const [categories, setCategories] = useState([])

    useEffect(() => {
        const getAllCategories = async () => {
            const { data } = await axios(`${baseURL}/api/categories`)
            setCategories(data)
        }
        getAllCategories()
    }, [])

    const [activeStep, setActiveStep] = useState(0);

    const navigate = useNavigate()

    const handleNext = async () => {
        if (activeStep < steps.length - 1) {
            // first step 
            if (activeStep === 0 && (!question.title.trim() || !question.category)) {
                toast.error('Title and Cateogry can not be empty!', {
                    position: toast.POSITION.BOTTOM_CENTER
                })
                return
            }
            // second step
            if (activeStep === 1 && (question.content.trim() === '<p></p>')) {
                toast.error('Content can not be empty!', {
                    position: toast.POSITION.BOTTOM_CENTER,
                })
                return
            }
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        } else {
            // submit create question request
            const token = localStorage.getItem('techTownToken')
            const config = getAuthConfig(token)
            try {
                const { data } = await axios.post(`${baseURL}/api/posts`, question, config)
                toast.success('Question posted', {
                    position: toast.POSITION.TOP_CENTER,
                })
                navigate('/myquestions')
            } catch (error) {
                toast.error('Fail to post the question, try again', {
                    position: toast.POSITION.BOTTOM_CENTER,
                })
            }

        }

    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const setContent = (content) => {
        setQuestion({
            ...question,
            content
        })
    }

    const [question, setQuestion] = useState({
        user: user?._id,
        title: '',
        content: '',
        category: ''
    })


    return (
        <Box sx={{ width: '100%', p: '2rem 10rem' }}>
            <Typography variant="h4" sx={{ m: '1rem 0.5rem', mb: '1.4rem' }}>Ask the question</Typography>
            <Stepper activeStep={activeStep}>
                {steps.map((label) => {
                    const stepProps = {};
                    const labelProps = {};
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>

            {/* Step 1 */}
            <Box component={"form"} sx={{ display: activeStep === 0 ? 'flex' : 'none', flexDirection: 'column' }} >
                <TextField
                    type='text'
                    label="Title"
                    sx={{ m: '2rem 0.5rem 0' }}
                    value={question.title}
                    onChange={e => { setQuestion({ ...question, title: e.target.value }) }}
                />
                <FormControl sx={{ m: '2rem 0.5rem 0', minWidth: 120 }}>
                    <InputLabel id="category">Category</InputLabel>
                    <Select
                        labelId="category"
                        id="demo-simple-select-helper"
                        value={question.category}
                        label="Category"
                        onChange={e => { setQuestion({ ...question, category: e.target.value }) }}
                    >
                        {categories.length > 0 && categories.map(cat => (
                            <MenuItem key={cat._id} value={cat.name}>{cat.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            {/* Step 2 */}
            <Box sx={{ mt: '2rem', display: activeStep === 1 ? 'flex' : 'none', flexDirection: 'column' }}>
                <QuestionEditor setContent={setContent} />
            </Box>

            <Fragment>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    pt: 2,
                    mt: activeStep === steps.length - 1 ? '20px' : '0'
                }}>
                    <Button
                        color="inherit"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                    >
                        Back
                    </Button>

                    <Button onClick={handleNext}>
                        {activeStep === steps.length - 1 ? 'Post' : 'Next'}
                    </Button>
                </Box>
            </Fragment>
        </Box>
    );
}
