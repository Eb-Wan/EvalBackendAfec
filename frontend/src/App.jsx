import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

import Home from "./pages/Home"
import Portfolio from "./pages/Portfolio"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Register from "./pages/Register"

import { useState, useEffect } from "react";
import apiClient from "./axiosConfig";
import ProtectRoute from './utils/ProtectRoute'

function App() {
  return (
    <>
      <Router>
      <Navbar />
        <Routes>
          <Route path='/' element={ <Home /> } />
          <Route path='/portfolio' element={ <ProtectRoute><Portfolio /></ProtectRoute> } />
          <Route path='/dashboard' element={ <ProtectRoute><Dashboard /></ProtectRoute> } />
          <Route path='/login' element={ <ProtectRoute reverse={true}><Login /></ProtectRoute> } />
          <Route path='/logout' element={ <ProtectRoute><Logout /></ProtectRoute> } />
          <Route path='/register' element={ <ProtectRoute reverse={true}><Register /></ProtectRoute> } />
        </Routes>
      <Footer />
      </Router>
    </>
  )
}

export default App
