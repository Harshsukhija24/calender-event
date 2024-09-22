import React from "react";
import { Link } from "react-router-dom";
import Navbar1 from "../Components/Navbar1";
import Footer from "../Components/Footer";

const Startpage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar1 />
      <div className="flex flex-1 items-center justify-between bg-gray-100 p-8 flex-col md:flex-row">
        <div className="flex flex-col max-w-md text-center md:text-left">
          <h1 className="text-4xl font-bold mb-4">Welcome to Calendar</h1>
          <p className="mb-6">Manage your events and schedules effortlessly.</p>
          <div className="flex flex-col md:flex-row space-x-0 md:space-x-4">
            <button className="mb-2 md:mb-0 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
              <Link to="/register">Register</Link>
            </button>
            <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
              <Link to="/login">Login</Link>
            </button>
          </div>
        </div>
        <img
          src="./calendar.jpg"
          alt="Calendar"
          className="mt-6 md:mt-0 md:w-1/2 lg:w-1/3"
        />
      </div>
      <Footer />
    </div>
  );
};

export default Startpage;
