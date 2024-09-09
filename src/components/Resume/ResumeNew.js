import React, { useState } from "react";

const BookingSystem = () => {
  // Available dates (e.g., next 7 days)
  const availableDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date.toDateString();
  });

  // State to track booked slots
  const [bookedSlots, setBookedSlots] = useState({});

  // Handle booking slot for a date
  const handleBookSlot = (date) => {
    if (bookedSlots[date]) {
      alert("This slot is already booked.");
      return;
    }
    setBookedSlots((prev) => ({ ...prev, [date]: true }));
    alert(`You have successfully booked 1-on-1 session at 10 PM on ${date}`);
  };

  return (
    <div className="App">
      <h1>Book a 1-on-1 Session</h1>
      <p>Only 1 slot available per day at 10 PM.</p>

      <div className="slots">
        {availableDates.map((date) => (
          <div key={date} className="slot">
            <p>{date} - 10:00 PM</p>
            <button
              onClick={() => handleBookSlot(date)}
              disabled={bookedSlots[date]}
            >
              {bookedSlots[date] ? "Booked" : "Book Slot"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingSystem;
