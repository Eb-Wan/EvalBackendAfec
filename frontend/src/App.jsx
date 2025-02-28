import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

import Home from "./pages/Home"
import Portfolio from "./pages/Portfolio"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import Logout from "./pages/Logout"
import Register from "./pages/Register"

import { useState, useEffect } from "react"
import apiClient from "./axiosConfig"
import ProtectRoute from './utils/ProtectRoute'
import AdminRoute from "./utils/AdminRoute"
import PageNotFound from "./pages/PageNotFound"

function App() {
  return (
    <>
      <Router>
      <Navbar />
        <main style={{minHeight: "calc(100vh - 214px)"}}>
        <Routes>
            <Route path='/' element={ <Home /> } />
            <Route path='/portfolio' element={ <ProtectRoute><Portfolio /></ProtectRoute> } />
            <Route path='/dashboard' element={ <ProtectRoute><AdminRoute><Dashboard /></AdminRoute></ProtectRoute> } />
            <Route path='/login' element={ <ProtectRoute reverse={true}><Login /></ProtectRoute> } />
            <Route path='/logout' element={ <ProtectRoute><Logout /></ProtectRoute> } />
            <Route path='/register' element={ <ProtectRoute reverse={true}><Register /></ProtectRoute> } />
            <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
        </main>
      <Footer />
      </Router>
    </>
  )
}

export default App
