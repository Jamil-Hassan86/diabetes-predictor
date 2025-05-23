import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const sanitizeInput = (input) => {
  return input.trim().replace(/[<>]/g, ""); // This example removes < and > to prevent XSS
};

const Register = () => {
  // State for form data and errors
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    ethnicity: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    ethnicity: "",
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
    if (!formData.username || formData.username < 5) formErrors.username = "Username is required and to be at least 5 characters long";
    if (!formData.email) formErrors.email = "Email is required";
    if (!formData.password) formErrors.password = "Password is required";
    if (!formData.ethnicity) formErrors.ethnicity = "Ethnicity is required";

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    // Send data to the backend
    try {
      const response = await fetch("http://127.0.0.1:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      alert("Registration successful!");
      navigate("/")
    } catch (error) {
      console.error("Error sending data to backend:", error);
      alert("Registration failed!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <h1 className="text-3xl sm:text-4xl font-bold text-blue-600 mb-6 text-center">
        Register
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl"
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="ethnicity">
            Ethnicity
          </label>
          <select
            id="ethnicity"
            name="ethnicity"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.ethnicity}
            onChange={handleChange}
          >
            <option value="" disabled selected className="text-gray-400">
              Select your ethnicity
            </option>
            <option value="south-asian">South Asian</option>
            <option value="african">African</option>
            <option value="eastern-pacific">Eastern Pacific</option>
          </select>
          {errors.ethnicity && <p className="text-red-500 text-sm">{errors.ethnicity}</p>}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;