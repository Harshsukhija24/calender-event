import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar1 from "../Components/Navbar1";
import Footer from "../Components/Footer";

const Event = () => {
  const [events, setEvents] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEvent, setCurrentEvent] = useState({ id: "", title: "" });
  const navigate = useNavigate();
  const { date } = useParams(); // Get date from URL params

  useEffect(() => {
    console.log("Fetching events for date:", date);
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/events/date/?date=${date}`
        );
        if (!response.ok) {
          console.error("Network response was not ok:", response.statusText);
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("Fetched events:", data);
        setEvents(data);
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };

    fetchEvents();
  }, [date]);

  const handleEdit = (event) => {
    console.log("Editing event:", event);
    setCurrentEvent(event);
    setIsEditing(true);
  };

  const handleDelete = async (eventId) => {
    console.log("Attempting to delete event with ID:", eventId);
    const confirmed = window.confirm(
      "Are you sure you want to delete this event?"
    );
    if (confirmed) {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/events/${eventId}/`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) {
          console.error("Failed to delete event:", response.statusText);
          throw new Error("Failed to delete event");
        }
        setEvents((prevEvents) =>
          prevEvents.filter((event) => event.id !== eventId)
        );
        console.log("Event deleted successfully");
      } catch (err) {
        console.error("Error deleting event:", err);
      }
    } else {
      console.log("Deletion cancelled");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log("Updating event:", currentEvent);
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/events/${currentEvent.id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(currentEvent),
        }
      );
      if (!response.ok) {
        console.error("Failed to update event:", response.statusText);
        throw new Error("Failed to update event");
      }
      const updatedEvent = await response.json();
      console.log("Updated event:", updatedEvent);
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === updatedEvent.id ? updatedEvent : event
        )
      );
      setIsEditing(false);
      setCurrentEvent({ id: "", title: "" });
      console.log("Event updated successfully");
    } catch (err) {
      console.error("Error updating event:", err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar1 />
      <div className="flex-grow p-4 bg-white rounded-lg shadow-md h-96">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-semibold">Your Events</h3>
          <button
            onClick={() => {
              console.log("Navigating to Add New Event");
              navigate("/addevent");
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Add New Event
          </button>
        </div>

        {events.length === 0 ? (
          <p className="text-gray-500">No events available.</p>
        ) : isEditing ? (
          <form onSubmit={handleUpdate} className="mb-4">
            <input
              type="text"
              value={currentEvent.title}
              onChange={(e) => {
                console.log("Updating current event title:", e.target.value);
                setCurrentEvent({ ...currentEvent, title: e.target.value });
              }}
              className="border border-gray-300 rounded-lg p-2 mb-2 w-full"
              placeholder="Event Title"
              required
            />
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Update Event
            </button>
            <button
              type="button"
              onClick={() => {
                console.log("Cancelling edit");
                setIsEditing(false);
              }}
              className="ml-2 px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
          </form>
        ) : (
          <ul className="divide-y divide-gray-200">
            {events.map((event) => (
              <li
                key={event.id}
                className="flex justify-between items-center py-2"
              >
                <span className="text-lg">{event.title}</span>
                <div>
                  <button
                    onClick={() => handleEdit(event)}
                    className="mr-2 px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Event;
