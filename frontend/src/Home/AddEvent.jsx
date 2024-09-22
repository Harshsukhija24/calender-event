import React, { useState } from "react";
import Footer from "../Components/Footer";
import Navbar2 from "../Components/Navbar2";

const AddEvent = () => {
  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  // Replace with your actual token retrieval logic
  const token = localStorage.getItem("access_token"); // Assuming you saved the token in local storage
  console.log("hello", token);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create datetime strings
    const startDateTime = `${date}T${startTime}`;
    const endDateTime = `${date}T${endTime}`;

    const eventData = {
      title: eventName,
      description,
      date,
      start_time: startDateTime, // Use the combined datetime
      end_time: endDateTime, // Use the combined datetime
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/events/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error("Error creating event:", errorMessage);
        throw new Error("Failed to create event");
      }

      console.log("Event created successfully");
      handleCancel();
    } catch (error) {
      console.error("Error creating event:", error.message);
    }
  };

  const handleCancel = () => {
    setEventName("");
    setDescription("");
    setDate("");
    setStartTime("");
    setEndTime("");
  };

  return (
    <>
      <Navbar2 />
      <div className="max-w-lg mx-auto p-4 bg-slate-100 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-3">Create/Edit Event</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block text-gray-700">Event Name</label>
            <input
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div className="mb-3">
            <label className="block text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-500"
              rows="2"
            />
          </div>
          <div className="mb-3">
            <label className="block text-gray-700">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div className="mb-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">Start Time</label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
                className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700">End Time</label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
                className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between">
            <button
              type="button"
              onClick={handleCancel}
              className="w-full sm:w-auto py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition duration-200 mb-2 sm:mb-0"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Submit Event
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default AddEvent;
