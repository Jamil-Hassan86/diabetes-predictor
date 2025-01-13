import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [ethnicity, setEthnicity] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    
    const checkSession = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await fetch("http://127.0.0.1:5000/check-session", {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${token}`,
            },
          });
          const data = await response.json();
          console.log("Session check response:", data);
          if (data.logged_in) {
            setIsLoggedIn(true);
            setUsername(data.username);
            setEthnicity(data.ethnicity);
          } else {
            setIsLoggedIn(false);
            localStorage.removeItem("token");
          }
        }
      } catch (error) {
        console.log("Error checking session:", error);
      }
    };
    checkSession();
  }, []);

  

  const handleLogout = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/logout", {
        method: "POST",
      });
      if (response.ok) {
        localStorage.removeItem("token"); 
        setIsLoggedIn(false);
        setUsername(""); 
        setEthnicity("");
        navigate("/"); 
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">This is the Jam+ Diabetes Predictor</h1>
        <p className="mt-4 text-lg text-gray-700">
          Tool to detect diabetes tailored for ethnic groups.
        </p>
      </header>

      <nav className="flex space-x-6">
        {!isLoggedIn && (
          <>
            <Link
              to="/login"
              className="px-6 py-3 bg-green-500 text-white font-medium rounded-lg shadow-md hover:bg-green-600 transition duration-300"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-6 py-3 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
            >
              Register
            </Link>
            
          </>
        )}

        {isLoggedIn && (
          <>
            <span className="text-lg font-semibold text-gray-700">
              Welcome, {username}
            </span>
            <button
              onClick={handleLogout}
              className="px-6 py-3 bg-red-500 text-white font-medium rounded-lg shadow-md hover:bg-red-600 transition duration-300"
            >
              Logout
            </button>
            <Link
            to="/predictor"
            state={{ ethnicity }}
            className="px-6 py-3 bg-purple-500 text-white font-medium rounded-lg shadow-md hover:bg-purple-600 transition duration-300"
            >
            Diabetes Predictor
            </Link>
          </>
        )}
      </nav>
    </div>
  );
};

export default Home;