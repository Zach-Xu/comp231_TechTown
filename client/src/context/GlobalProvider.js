import axios from 'axios'
import React, { useState, createContext, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAuthConfig } from '../utils/utlis'
import { baseURL } from '../config/env'

const GlobalContext = createContext()


export default function GlobalProvider({ children }) {

    const token = localStorage.getItem('techTownToken')
    const [user, setUser] = useState()
    const [friends, setFriends] = useState([])

    const navigate = useNavigate()

    const getUser = async (token) => {
        const config = getAuthConfig(token)
        try {
            const { data } = await axios.get(`${baseURL}/api/users/tokenuser`, config)
            setUser(data)

        } catch (error) {
            setUser()
            navigate('/')
        }
    }

    const getFriends = async (token) => {
        const config = getAuthConfig(token)
        try {
            const { data } = await axios.get(`${baseURL}/api/chats/oneonone`, config)
            console.log('frends', data);
            setFriends(data)
        } catch (error) {
            setFriends([])
        }
    }

    useEffect(() => {
        if (token) {
            getUser(token)
            getFriends(token)
        }
    }, [token])

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
