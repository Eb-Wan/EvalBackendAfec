import './App.css'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

import Home from "./pages/Home"
import Portfolio from "./pages/Portfolio"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login";
import Register from "./pages/Register"

function App() {
  return (
    <>
      <Navbar />
      <Router>
        <Routes>
          <Route path='/' component={ <Home /> } />
          <Route path='/portfolio' component={ <Portfolio /> } />
          <Route path='/dashboard' component={ <Dashboard /> } />
          <Route path='/login' component={ <Login /> } />
          <Route path='/register' component={ <Register /> } />
        </Routes>
      </Router>
      <Footer />
    </>
  )
}

export default App
