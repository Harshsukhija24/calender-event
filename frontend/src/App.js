import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login/Login";
import Register from "./Register/Register";
import Event from "./Home/Event";
import AddEvent from "./Home/AddEvent";
import Home from "./Home/Home";
import Startpage from "./Home/Startpage";

const App = () => {
  return (
    <Router>
      {/* Main Content Area */}
      <Routes>
        <Route path="/" element={<Startpage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/events/date/:date" element={<Event />} />
        <Route path="/register" element={<Register />} />
        <Route path="/addevent" element={<AddEvent />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
