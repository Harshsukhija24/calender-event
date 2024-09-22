import React, { useState } from "react";
import Navbar1 from "../Components/Navbar1";
import Footer from "../Components/Footer";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      const response = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Login successful:", result);
        localStorage.setItem("user_id", result.userId);
        localStorage.setItem("access_token", result.token);
        setIsLoggedIn(true);
        navigate("/Home");
      } else {
        setErrorMessage("Invalid username or password");
      }
    } catch (error) {
      console.error("Network error:", error);
      setErrorMessage("Network error occurred");
    }
  };

  return (
    <>
      <Navbar1 />
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col md:flex-row w-10/12">
          {/* Left side - Image */}
          <div className="w-full md:w-1/2">
            <img
              src="./calendar.jpg"
              alt="calendar"
              className="object-cover w-full h-auto"
            />
          </div>

          {/* Right side - Form */}
          <div className="w-full md:w-1/2 p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center md:text-left">
              Login
            </h2>
            {isLoggedIn ? (
              <p className="text-green-500 text-center mb-4">
                Login successful!
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="w-full">
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Username
                  </label>
                  <input
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    type="text"
                    placeholder="Enter your username"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Password
                  </label>
                  <input
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    type="password"
                    placeholder="Enter your password"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                {errorMessage && (
                  <p className="text-red-500 text-center mb-4">
                    {errorMessage}
                  </p>
                )}
                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Login
                  </button>
                </div>

                <div className="mt-4 text-center">
                  <Link
                    to="/register"
                    className="text-blue-500 hover:underline"
                  >
                    Don't have an account? Register here.
                  </Link>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
