import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar1 from "../Components/Navbar1";
import Footer from "../Components/Footer";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

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

    console.log("Submitting registration with:", formData);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Registration successful:", result);
        setIsRegistered(true);
        navigate("/login");
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Registration failed. Try again.");
        console.log("Registration failed:", errorData);
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
              alt="register"
              className="object-cover w-full h-auto"
            />
          </div>

          {/* Right side - Form */}
          <div className="w-full md:w-1/2 p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-700 flex items-center justify-center md:justify-start">
              Register
            </h2>
            {isRegistered ? (
              <p className="text-green-500 text-center mb-4">
                Registration successful! Please check your email for
                verification.
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
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Email
                  </label>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="Enter your email"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-4">
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
                    Register
                  </button>
                </div>
                <div className="mt-4 text-center">
                  <p className="text-gray-600">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-500 hover:underline">
                      Login here
                    </Link>
                  </p>
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

export default Register;
