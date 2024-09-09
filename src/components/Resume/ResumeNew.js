import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported

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
    <div className="container mt-5">
      <div className="text-center mt-5">
        
        <h1 className="mb-4 mt-5" style={{ color: "white" }}>
          Book a 1-on-1 Session
        </h1>
        <p className="lead" style={{ color: "white" }}>
          Only 1 slot available per day at 10 PM.
        </p>
      </div>

      <div className="row justify-content-center">
        {availableDates.map((date) => (
          <div key={date} className="col-lg-4 col-md-6 mb-3">
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title">{date}</h5>
                <p className="card-text">10:00 PM</p>
                <button
                  className={`btn ${bookedSlots[date] ? "btn-danger" : "btn-primary"
                    }`}
                  onClick={() => handleBookSlot(date)}
                  disabled={bookedSlots[date]}
                >
                  {bookedSlots[date] ? "Booked" : "Book Slot"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingSystem;
