
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login';
import Home from './pages/Home';
import ProtectedRoutes from './utils/ProtectedRoutes';

const App = () => {
  return (

    <Router>
      <ToastContainer />
      <Routes>
        <Route element={<ProtectedRoutes />} >

          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>

  )
}

export default App