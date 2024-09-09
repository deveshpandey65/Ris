import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import emailjs from 'emailjs-com';
import barimg from '../../Assets/OQ-Code-Payments.webp';

const BookingSystem = () => {
  const availableDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date.toDateString();
  });

  const getInitialBookedSlots = () => {
    const savedSlots = localStorage.getItem("bookedSlots");
    return savedSlots ? JSON.parse(savedSlots) : {};
  };

  const [bookedSlots, setBookedSlots] = useState(getInitialBookedSlots);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  React.useEffect(() => {
    localStorage.setItem("bookedSlots", JSON.stringify(bookedSlots));
  }, [bookedSlots]);

  const handleBookSlot = (date) => {
    if (bookedSlots[date]) {
      alert("This slot is already booked.");
      return;
    }
    setSelectedDate(date);
    setShowForm(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    emailjs.send('service_rn0izr9', 'template_31p501d', {
      name: formData.name,
      email: formData.email,
      date: selectedDate,
    }, 'p1MTU5aXBBqIo1qlV') // Replace with your actual EmailJS User ID (public key)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        alert(`Booking confirmed for ${selectedDate}. Confirmation email sent!`);
      }, (error) => {
        console.log('FAILED...', error);
        alert('Failed to send email. Please try again.');
      });

    setBookedSlots((prev) => ({ ...prev, [selectedDate]: true }));
    setShowForm(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container mt-5">
      <div className="text-center">
        <h1 className="mb-4" style={{ color: "white" }}>
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
                  className={`btn ${bookedSlots[date] ? "btn-danger" : "btn-primary"}`}
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

      {showForm && (
        <div className="mt-5">
          <h3 className="text-white">Complete Your Booking</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="text-white">Name:</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="text-white">Email:</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group mt-3 p-3" style={{ backgroundColor: "#ffffff", borderRadius: "8px" }}>
              <img src={barimg} alt="Payment Methods" className="img-fluid mb-2" />
              <h1 className="text-center">500 Rs</h1>
            </div>
            <div className="form-group mt-3">
              <label className="text-white">Payment Id:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Payment Info (e.g., Card)"
                required
              />
            </div>
            <button type="submit" className="btn btn-success mt-3">
              Confirm Booking
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default BookingSystem;
