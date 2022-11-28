import React, { Fragment } from 'react'
import NavBar from './components/miscellaneous/NavBar'
import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Home from './pages/Home'
import Chat from './pages/Chat'
import Posts from './pages/Posts'
import Post from './pages/Post'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'

export default function App() {
  return (
    <Fragment>
      <NavBar />
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/chat' element={<Chat />} />
        <Route path='/posts' element={<Posts />} />
        <Route path='/post' element={<Post />} />
        <Route path='*' element={<Home />} />
      </Routes>
      <ToastContainer />
    </Fragment>
  )
}
