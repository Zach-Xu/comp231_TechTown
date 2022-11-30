import axios from 'axios'
import React, { useState, createContext, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAuthConfig } from '../utils/utlis'
import { baseURL } from '../config/env'

const GlobalContext = createContext()

export default function GlobalProvider({ children }) {
    const [user, setUser] = useState()
    const [friends, setFriends] = useState([])

    const navigate = useNavigate()

    const getUser = async (token) => {
        const config = getAuthConfig(token)
        try {
            const { data } = await axios.get(`${baseURL}/api/users/tokenuser`, config)
            setUser(data)
            navigate('/questions')
        } catch (error) {
            setUser()
        }
    }

    const getFriends = async (token) => {
        const config = getAuthConfig(token)
        try {
            const { data } = await axios.get(`${baseURL}/api/chats/oneonone`, config)
            setFriends(data)
        } catch (error) {
            setFriends([])
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('techTownToken')
        if (token) {
            getUser(token)
            getFriends(token)
        }
    }, [])

    return (
        <GlobalContext.Provider
            value={{ user, setUser, friends, setFriends }}
        >
            {children}
        </GlobalContext.Provider>
    )
}

export const GlobalState = () => {
    return useContext(GlobalContext)
}
