import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Predictor = () => {
  const location = useLocation();
  const ethnicityFromLocation = location.state?.ethnicity;
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    weight: "",
    height: "",
  });

  const [predictionResult, setPredictionResult] = useState(null);
  const [ethnicity, setEthnicity] = useState(ethnicityFromLocation || ""); 
  const navigate = useNavigate();

  useEffect(() => {
    if (!ethnicityFromLocation) {
      const userEthnicity = localStorage.getItem("ethnicity");
      if (userEthnicity) {
        setEthnicity(userEthnicity); 
      } else {
        
        navigate("/"); 
      }
    }
  }, [ethnicityFromLocation, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          ethnicity: ethnicity,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

    
    if (data.prediction) {
      setPredictionResult(data.prediction);
    } else {
      setPredictionResult("Prediction failed. Please try again.");
    }
    } catch (error) {
      console.error("Error making prediction:", error);
      setPredictionResult("Error occurred. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <h1 className="text-3xl sm:text-4xl font-bold text-blue-600 mb-6 text-center">
        Diabetes Risk Predictor
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl"
      >
        
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="age">
            Age
          </label>
          <input
            type="number"
            id="age"
            name="age"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your age"
            value={formData.age}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="gender">
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="height">
            Height (cm)
          </label>
          <input
            type="number"
            id="height"
            name="height"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your height in cm"
            value={formData.height}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="weight">
            Weight (kg)
          </label>
          <input
            type="number"
            id="weight"
            name="weight"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your weight in kg"
            value={formData.weight}
            onChange={handleChange}
          />
        </div>

        
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="ethnicity">
            Ethnicity
          </label>
          <input
            type="text"
            id="ethnicity"
            name="ethnicity"
            className="w-full px-4 py-2 border rounded-lg bg-gray-200 cursor-not-allowed"
            value={ethnicity}
            readOnly
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Get Prediction
        </button>
      </form>

      
      {predictionResult && (
        <div className="mt-6 text-lg font-semibold text-center">
          <p>Prediction: {predictionResult}</p>
        </div>
      )}
    </div>
  );
};

export default Predictor;