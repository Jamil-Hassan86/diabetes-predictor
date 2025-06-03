import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Register from "./pages/register";
import Login from "./pages/login";
import Predictor from "./pages/predictor";
import Resources from "./pages/Resources";
import './App.css';
import Header from './components/header';
import Footer from './components/Footer';



function App() {
  const [isDark, setIsDark] = useState(
    localStorage.getItem('theme') === 'dark'
  );

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <Router>
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
      <Header isDark={isDark} setIsDark={setIsDark} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/predictor" element={<Predictor />} />
        <Route path="/resources" element={<Resources />} />
      </Routes>
      <Footer/>
    </div>
  </Router>
  );
}

export default App;
