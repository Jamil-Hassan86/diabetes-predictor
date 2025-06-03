import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

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

  const handleDeleteAccount = async () => {
    const confirmation = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (!confirmation) {
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://127.0.1:5000/delete-account", {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        alert("Account deleted successfully.");
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        setUsername("");
        setEthnicity("");
        navigate("/"); 
      } else {
        alert("Error deleting account: " + data.message);
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("An error occurred while deleting the account.");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral to-accent dark:from-black dark:to-gray-800 flex flex-col items-center justify-center px-4 py-10 transition-colors duration-300">
      
      <section className="w-full max-w-md mx-auto mb-10">
        <Slider {...settings}>
          <div>
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl font-extrabold text-primary dark:text-accent leading-tight">
                Jam+ Diabetes Predictor
              </h1>
              <p className="mt-4 text-lg sm:text-xl text-secondary dark:text-gray-300 max-w-md mx-auto">
                A predictive tool for detecting diabetes, tailored for ethnic communities.
              </p>
            </div>
          </div>
          <div>
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl font-extrabold text-primary dark:text-accent leading-tight">
                Prediction Tool
              </h1>
              <p className="mt-4 text-lg sm:text-xl text-secondary dark:text-gray-300 max-w-md mx-auto">
                Get your diabetes risk prediction based on your health data now!
              </p>
            </div>
          </div>
          <div>
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl font-extrabold text-primary dark:text-accent leading-tight">
                Community Focused
              </h1>
              <p className="mt-4 text-lg sm:text-xl text-secondary dark:text-gray-300 max-w-md mx-auto">
                We provide resources and support tailored to various ethnic communities.
              </p>
            </div>
          </div>
        </Slider>
      </section>

      <nav className="flex flex-wrap justify-center gap-4 max-w-xl">
        {!isLoggedIn ? (
          <>
            <Link
              to="/login"
              className="w-36 text-center px-4 py-2 bg-gradient-to-r from-green-400 to-green-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="w-36 text-center px-4 py-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition"
            >
              Register
            </Link>
          </>
        ) : (
          <>
            <span className="w-full text-center text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
              Welcome, {username}
            </span>

            <Link
              to="/predictor"
              state={{ ethnicity }}
              className="w-44 text-center px-4 py-2 bg-gradient-to-r from-purple-400 to-purple-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition"
            >
              Diabetes Predictor
            </Link>

            <button
              onClick={handleLogout}
              className="w-36 text-center px-4 py-2 bg-gradient-to-r from-red-400 to-red-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition"
            >
              Logout
            </button>

            <button
              onClick={handleDeleteAccount}
              className="w-44 text-center px-4 py-2 bg-yellow-500 text-white font-medium rounded-lg shadow hover:bg-yellow-600 transition"
            >
              Delete Account
            </button>
            {ethnicity && (
              <Link
                to={`/resources?ethnicity=${ethnicity}`}
                className="w-44 text-center px-4 py-2 bg-gray-500 text-white font-medium rounded-lg shadow hover:bg-gray-600 transition"
              >
                {ethnicity} Resources
              </Link>
            )}
          </>
        )}
      </nav>
      <Footer />
    </div>
  );
};

export default Home;
