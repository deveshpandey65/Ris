import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import emailjs from 'emailjs-com';
import barimg from '../../Assets/OQ-Code-Payments.webp';
import { Modal, Button } from "react-bootstrap";  // Import Bootstrap modal

const BookingSystem = () => {
  const availableDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date.toDateString();
  });

  const timeSlots = ["10:00 PM", "10:40 PM", "11:20 PM"]; // Time slots available for each day

  const getInitialBookedSlots = () => {
    const savedSlots = localStorage.getItem("bookedSlots");
    return savedSlots ? JSON.parse(savedSlots) : {};
  };

  const getUsedTransactionIds = () => {
    const savedTransactionIds = localStorage.getItem("usedTransactionIds");
    return savedTransactionIds ? JSON.parse(savedTransactionIds) : [];
  };

  const [bookedSlots, setBookedSlots] = useState(getInitialBookedSlots); // Track booked slots for each date and time
  const [usedTransactionIds, setUsedTransactionIds] = useState(getUsedTransactionIds); // Track used transaction IDs
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null); // State for selected time
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    transactionId: '',
    purpose: '',  // Add purpose field in form data
  });

  React.useEffect(() => {
    localStorage.setItem("bookedSlots", JSON.stringify(bookedSlots));
    localStorage.setItem("usedTransactionIds", JSON.stringify(usedTransactionIds));
  }, [bookedSlots, usedTransactionIds]);

  const handleBookSlot = (date) => {
    setSelectedDate(date);
    setSelectedTime(null); // Reset time selection when a new date is chosen
    setShowForm(true);  // Show the modal
  };

  const handleTimeSelect = (time) => {
    const bookingKey = `${selectedDate}_${time}`; // Create a unique key for each date and time slot

    // Check if the selected time slot on the selected date is already booked
    if (bookedSlots[bookingKey]) {
      alert(`The slot for ${time} on ${selectedDate} is already booked.`);
      return;
    }

    setSelectedTime(time);
  };

  const handleClose = () => {
    setShowForm(false);
    setSelectedTime(null); // Reset the modal when closed
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const bookingKey = `${selectedDate}_${selectedTime}`; // Unique key for date and time slot

    // Check if the transaction ID has already been used
    if (usedTransactionIds.includes(formData.transactionId)) {
      alert("This transaction ID has already been used. Please use a new one.");
      return;
    }

    // Send email with EmailJS
    emailjs.send('service_rn0izr9', 'template_31p501d', {
      name: formData.name,
      email: formData.email,
      date: `${selectedDate} at ${selectedTime}`,
      duration: "30 minutes",  // Include duration in the email content
      purpose: formData.purpose, // Include the purpose in the email content
    }, 'p1MTU5aXBBqIo1qlV') // Replace with your actual EmailJS User ID (public key)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        alert(`Booking confirmed for ${selectedDate} at ${selectedTime}. Confirmation email sent!`);

        // If email is successful, mark the slot as booked and store the transaction ID
        setBookedSlots((prev) => ({ ...prev, [bookingKey]: true }));
        setUsedTransactionIds((prev) => [...prev, formData.transactionId]); // Save used transaction ID
        setShowForm(false);  // Close the modal after submission
      }, (error) => {
        console.log('FAILED...', error);
        alert('Failed to send email. Please try again.');
        // Do NOT mark the slot as booked if the email fails
      });
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
          You can book up to 3 slots per day.
        </p>
      </div>

      <div className="row justify-content-center">
        {availableDates.map((date) => (
          <div key={date} className="col-lg-4 col-md-6 mb-3">
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title">{date}</h5>
                <button
                  className="btn btn-primary"
                  onClick={() => handleBookSlot(date)}
                >
                  Book Slot
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bootstrap Modal for Time Slot Selection and Form */}
      <Modal show={showForm} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedTime ? "Complete Your Booking" : `Select a Time Slot for ${selectedDate}`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!selectedTime ? (
            // Time slot selection screen
            <div className="text-center">
              <p>Please select a time slot for {selectedDate}:</p>
              {timeSlots.map((time) => (
                <Button
                  key={time}
                  variant={bookedSlots[`${selectedDate}_${time}`] ? "danger" : "outline-primary"}
                  className="m-2"
                  onClick={() => handleTimeSelect(time)}
                  disabled={bookedSlots[`${selectedDate}_${time}`]} // Disable if the time slot is already booked
                >
                  {bookedSlots[`${selectedDate}_${time}`] ? `${time} (Booked)` : time}
                </Button>
              ))}
            </div>
          ) : (
            // Booking form after time selection
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name:</label>
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
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Purpose of the 1-on-1 session:</label>
                <textarea
                  name="purpose"
                  className="form-control"
                  value={formData.purpose}
                  onChange={handleInputChange}
                  placeholder="Explain the purpose of the session..."
                  required
                />
              </div>
              <div className="form-group mt-3 p-3" style={{ backgroundColor: "#ffffff", borderRadius: "8px" }}>
                <img src={barimg} alt="Payment Methods" className="img-fluid mb-2" />
                <h1 className="text-center">500 Rs</h1>
              </div>
              <div className="form-group mt-3">
                <label>Transaction Id:</label>
                <input
                  type="text"
                  name="transactionId"
                  className="form-control"
                  value={formData.transactionId}
                  onChange={handleInputChange}
                  placeholder="Enter your payment transaction ID"
                  required
                />
              </div>

              {/* Display the session duration message */}
              <div className="alert alert-info mt-3">
                The meeting will last for <strong>30 minutes</strong>.
              </div>

              <button type="submit" className="btn btn-success mt-3">
                Confirm Booking
              </button>
            </form>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default BookingSystem;
