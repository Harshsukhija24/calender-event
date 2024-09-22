import React, { useEffect, useState } from "react";

const TodayEvent = () => {
  const [events, setEvents] = useState([]);
  const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/events/date/?date=${today}`
        ); // Use template literals for the date
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = await response.json();
        setEvents(data); // Assuming the API returns an array of events
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [today]); // Added today as a dependency

  return (
    <div className="relative p-2 border rounded-lg w-full sm:w-64 mt-5 ml-1 h-52">
      <div className="flex items-center mb-2">
        <h3 className="text-xl font-semibold">Today's Events</h3>
      </div>
      <div className="max-h-48 overflow-y-auto">
        {events.length > 0 ? (
          events.map((event) => (
            <div key={event.id} className="p-2 border-b">
              <h4 className="font-semibold">{event.title}</h4>
            </div>
          ))
        ) : (
          <p className="text-center">No events for today.</p>
        )}
      </div>
    </div>
  );
};

export default TodayEvent;
