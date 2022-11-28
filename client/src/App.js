import React, { Fragment } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'

export default function App() {
  return (
    <Fragment>
      <Home />
      <ToastContainer />
    </Fragment>
  )
}
