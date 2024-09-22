import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar1 from "../Components/Navbar1";
import Footer from "../Components/Footer";
import SmallCalendar from "../Components/SmallCalender";
import TodayEvent from "../Components/TodayEvent";
import {
  FaChevronLeft,
  FaChevronRight,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
} from "react-icons/fa";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const generateMonth = (date) => {
  const startDate = new Date(date.getFullYear(), date.getMonth(), 1);
  const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const monthDays = [];

  const emptyDays = startDate.getDay();
  for (let i = 0; i < emptyDays; i++) {
    monthDays.push(null);
  }

  for (let i = 1; i <= endDate.getDate(); i++) {
    monthDays.push(new Date(date.getFullYear(), date.getMonth(), i)); // Ensure a new Date instance
  }

  return monthDays;
};

const generateWeek = (date) => {
  const startOfWeek = new Date(date);
  startOfWeek.setDate(date.getDate() - date.getDay());
  const weekDays = [];

  for (let i = 0; i < 7; i++) {
    weekDays.push(new Date(startOfWeek)); // Ensure a new Date instance
    startOfWeek.setDate(startOfWeek.getDate() + 1);
  }

  return weekDays;
};

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState("month");
  const navigate = useNavigate();

  const monthDays = generateMonth(selectedDate);
  const weekDays = generateWeek(selectedDate);

  const handleDateClick = (date) => {
    if (date) {
      // Create a new Date instance based on the clicked date
      const clickedDate = new Date(date);
      const formattedDate = clickedDate.toISOString().split("T")[0]; // Format to YYYY-MM-DD
      navigate(`/events/date/${formattedDate}`);
    }
  };

  const handlePrevMonth = () => {
    setSelectedDate(
      new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setSelectedDate(
      new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1)
    );
  };

  const handlePrevYear = () => {
    setSelectedDate(
      new Date(selectedDate.getFullYear() - 1, selectedDate.getMonth(), 1)
    );
  };

  const handleNextYear = () => {
    setSelectedDate(
      new Date(selectedDate.getFullYear() + 1, selectedDate.getMonth(), 1)
    );
  };

  const monthYear = selectedDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <Navbar1 />
      <div className="flex flex-col md:flex-row h-[90vh]">
        <div className="md:w-1/4 flex flex-col justify-between p-4">
          <div className="h-1/2">
            <SmallCalendar />
          </div>
          <div className="h-1/2">
            <TodayEvent />
          </div>
        </div>

        <div className="md:w-3/4 p-4">
          <div className="bg-white rounded-lg p-4 border border-gray-300">
            <div className="flex justify-between mb-2">
              <button
                onClick={handlePrevYear}
                className="px-2 py-1 text-sm bg-gray-200 rounded flex items-center"
              >
                <FaAngleDoubleLeft className="mr-1" />
              </button>
              <button
                onClick={handlePrevMonth}
                className="px-2 py-1 text-sm bg-gray-200 rounded flex items-center"
              >
                <FaChevronLeft className="mr-1" />
              </button>
              <span className="text-lg font-semibold">{monthYear}</span>
              <button
                onClick={handleNextMonth}
                className="px-2 py-1 text-sm bg-gray-200 rounded flex items-center"
              >
                <FaChevronRight className="ml-1" />
              </button>
              <button
                onClick={handleNextYear}
                className="px-2 py-1 text-sm bg-gray-200 rounded flex items-center"
              >
                <FaAngleDoubleRight className="ml-1" />
              </button>
            </div>

            <div className="flex justify-start mb-2">
              <button
                onClick={() => setView("month")}
                className={`px-4 py-1 text-sm font-medium rounded ${
                  view === "month"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                Month View
              </button>
              <button
                onClick={() => setView("week")}
                className={`ml-2 px-4 py-1 text-sm font-medium rounded ${
                  view === "week"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                Week View
              </button>
            </div>

            <div className="min-h-[300px] overflow-auto h-full">
              {view === "month" ? (
                <div className="grid grid-cols-7 gap-1">
                  {daysOfWeek.map((day) => (
                    <div
                      key={day}
                      className="font-bold text-center border-b border-gray-300 p-1"
                    >
                      {day}
                    </div>
                  ))}
                  {monthDays.map((date, index) => (
                    <div
                      key={index}
                      onClick={() => handleDateClick(date)}
                      className={`flex items-center justify-center h-[40px] w-[60px] cursor-pointer transition-transform duration-200 ease-in-out transform hover:scale-105 border ${
                        date ? "border-gray-300" : "bg-transparent"
                      }`}
                    >
                      {date ? (
                        <span className="relative z-10 text-sm">
                          {date.getDate()}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-7 gap-2">
                  {weekDays.map((date) => (
                    <div
                      key={date.toString()}
                      onClick={() => handleDateClick(date)}
                      className={`flex items-center justify-center h-[40px] w-[60px] cursor-pointer transition-transform duration-200 ease-in-out transform hover:scale-105 border ${
                        date.toDateString() === selectedDate.toDateString()
                          ? "bg-blue-200"
                          : "bg-white"
                      }`}
                    >
                      <span className="relative">{date.getDate()}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CalendarPage;
