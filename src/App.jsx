import { useState } from 'react'
import './App.css'
import HomePage from './pages/user/HomePage/HomePage'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import MasterLayout from './pages/user/Theme/MasterLayout/masterLayout'
import "./style/style.scss";

const NotFound = () => {
  return (
    <div className="page-not-found" role="alert" >
      404. NOT FOUND
    </div>
  )
};

function App() {
  return (
    <Router>
      <MasterLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MasterLayout>
    </Router>
  )
}

export default App
