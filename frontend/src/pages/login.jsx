import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";


const sanitizeInput = (input) => {
  return input.trim().replace(/[<>]/g, ""); 
};

const Login = () => {
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate(); 

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: sanitizeInput(value), 
    });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    let formErrors = {};

    
    if (!formData.email) formErrors.email = "Email is required";
    if (!formData.password) formErrors.password = "Password is required";

    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    
    try {
      const response = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      
        if (response.ok) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("ethnicity", data.ethnicity);
            alert("Login successful!");
            navigate("/"); 
      } else {
            alert("Invalid credentials!");
      }
    } catch (error) {
      
      alert("Login failed! Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 text-black dark:bg-black dark:text-white flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <section className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-blue-600 mb-6 text-center">
          Login
        </h1>
        </section>
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl"
      >
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-black dark:text-white"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-black dark:text-white"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Login
        </button>
      </form>
      <Footer />
    </div>
  );
};

export default Login;
