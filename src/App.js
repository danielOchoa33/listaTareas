// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Registro from './pages/Registro';
import ListaTareas from './pages/ListaTareas';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './Context/AuthContext';

const App = () => {
  return (
    <Router>
      <ToastContainer/>
      <Routes>
        <Route path="/" element={<AuthProvider><Login /></AuthProvider>} />
        <Route path="/registro" element={ <Registro />} />
        <Route path="/listaTareas" element={<AuthProvider><ListaTareas /></AuthProvider>} />
      </Routes>
    </Router>
  );
};

export default App;
