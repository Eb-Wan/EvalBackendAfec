import './App.css'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

import Home from "./pages/Home"
import Portfolio from "./pages/Portfolio"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login";
import Register from "./pages/Register"

import { useState, useEffect } from "react";
import apiClient from "./axiosConfig";
import ProtectRoute from '../utils/ProtectRoute'

function App() {
  const [isConnected, setConnected] = useState(false);
  useEffect(() => {
    if (!document.cookie) return;
    setConnected(true);
  }, []);
  return (
    <>
      <Router>
      <Navbar isConnected={isConnected} />
        <Routes>
          <Route path='/' element={ <Home /> } />
          <Route path='/portfolio' element={ <ProtectRoute><Portfolio /></ProtectRoute> } />
          <Route path='/dashboard' element={ <ProtectRoute><Dashboard /></ProtectRoute> } />
          <Route path='/login' element={ <Login /> } />
          <Route path='/register' element={ <Register /> } />
        </Routes>
      <Footer />
      </Router>
    </>
  )
}

export default App
