import { useState } from 'react'
import './App.css'
import { CartProvider } from './context/CartContext';
import MasterLayout from './pages/user/Theme/MasterLayout/masterLayout'
import "./style/style.scss";
import RouterComponent from './routes/router';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <CartProvider>
      <Router>
        <MasterLayout>
          <RouterComponent />
        </MasterLayout>
      </Router>
    </CartProvider>
  )
}

export default App
