import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Signup from '../components/auth/Signup'
import Login from '../components/auth/Login'

export default function Home() {
    return (
        <section className="container">
            <Routes>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </section>
    )
}
