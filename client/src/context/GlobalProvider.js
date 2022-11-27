import axios from 'axios'
import React, { useState, createContext, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAuthConfig } from '../utils/utlis'
import { baseURL } from '../config/env'

const GlobalContext = createContext()

export default function GlobalProvider({ children }) {
    const [user, setUser] = useState()

    const navigate = useNavigate()

    const getUser = async (token) => {
        const config = getAuthConfig(token)
        try {
            const { data } = await axios.get(`${baseURL}/api/users/token`, config)
            setUser(data)
        } catch (error) {
            navigate('/')
        }

    }

    useEffect(() => {
        const token = localStorage.getItem('techTownToken')
        if (token) {
            getUser(token)
        } else {
            navigate('/')
        }
    }, [])

    return (
        <GlobalContext.Provider
            value={{ user, setUser }}
        >
            {children}
        </GlobalContext.Provider>
    )
}

export const GlobalState = () => {
    return useContext(GlobalContext)
}