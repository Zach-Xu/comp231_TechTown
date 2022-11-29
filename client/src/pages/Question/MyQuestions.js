import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { baseURL } from '../../config/env'

export default function MyQuestions() {

    const [questions, setQuestions] = useState([])

    useEffect(() => {
        const getMyQuestions = async () => {
            const { data } = await axios(`${baseURL}/api/posts`)
            setQuestions(data)
        }

        getMyQuestions()
    }, [])

    return (
        <div>{
            questions.length > 0 && questions.map(question => (
                <div key={question._id}>
                    <p>{question.title}</p>
                    <p>{question.content}</p>
                </div>
            ))
        }</div>
    )
}
