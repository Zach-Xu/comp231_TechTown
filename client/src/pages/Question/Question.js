import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { GlobalState } from '../../context/GlobalProvider'
import QuestionEditor from '../../components/question/QuestionEditor';


const steps = ['Basic Info', 'Question Content', 'Post Question'];

export default function Question() {

    const { user } = GlobalState()

    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
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
            <Box component="form" sx={{ display: activeStep === 0 ? 'flex' : 'none', flexDirection: 'column' }} >
                <TextField
                    type='text'
                    required
                    label="Title"
                    sx={{ m: '2rem 0.5rem 0' }}
                    value={question.title}
                    onChange={e => { setQuestion({ ...question, title: e.target.value }) }}
                />
                <TextField
                    type='text'
                    required
                    label="Catogry"
                    sx={{ m: '2rem 0.5rem 0' }}
                    value={question.category}
                    onChange={e => { setQuestion({ ...question, category: e.target.value }) }}
                />
            </Box>

            {/* Step 2 */}
            <Box sx={{ mt: '2rem', display: activeStep === 1 ? 'flex' : 'none', flexDirection: 'column' }}>
                <QuestionEditor setContent={setContent} />
            </Box>

            <React.Fragment>
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
            </React.Fragment>

        </Box>
    );
}
