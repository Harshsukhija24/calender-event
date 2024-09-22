import React, { useState } from "react";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const generateMonth = (date) => {
  const startDate = new Date(date.getFullYear(), date.getMonth(), 1);
  const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const monthDays = [];

  // Fill with empty days at the start of the month
  const emptyDays = startDate.getDay();
  for (let i = 0; i < emptyDays; i++) {
    monthDays.push(null);
  }

  // Fill with days of the month
  for (let i = 1; i <= endDate.getDate(); i++) {
    monthDays.push(new Date(date.getFullYear(), date.getMonth(), i));
  }

  return monthDays;
};

const SmallCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const monthDays = generateMonth(currentDate);

  return (
    <div className="bg-white rounded-lg border border-gray-300 p-2 w-64">
      <h3 className="text-lg font-semibold text-center">
        {currentDate.toLocaleString("default", {
          month: "long",
          year: "numeric",
        })}
      </h3>
      <div className="grid grid-cols-7 gap-1">
        {daysOfWeek.map((day) => (
          <div key={day} className="font-bold text-center">
            {day}
          </div>
        ))}
        {monthDays.map((date, index) => (
          <div
            key={index}
            className={`flex items-center justify-center h-8 w-8 cursor-pointer ${
              date ? "bg-white border border-gray-200" : "bg-transparent"
            }`}
          >
            {date ? <span className="text-sm">{date.getDate()}</span> : ""}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SmallCalendar;
