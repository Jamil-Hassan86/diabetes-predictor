import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Register from "./pages/register";
import Login from "./pages/login";
import Predictor from "./pages/predictor";
import './App.css';
import Header from './components/header';



function App() {
  

  return (
    <div>
    <Router>
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/predictor" element={<Predictor />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
