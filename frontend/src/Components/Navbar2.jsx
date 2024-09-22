import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Navbar2 = () => {
  return (
    <div className="bg-gray-900 p-4 shadow-md flex justify-between items-center">
      <h2 className="text-white text-2xl font-bold">Calendar</h2>
      <Link to="/Home">
        {" "}
        {/* Use Link for navigation */}
        <button className="bg-white text-blue-600 font-semibold py-1 px-3 rounded hover:bg-blue-200 transition duration-200">
          Calendar View
        </button>
      </Link>
    </div>
  );
};

export default Navbar2;
