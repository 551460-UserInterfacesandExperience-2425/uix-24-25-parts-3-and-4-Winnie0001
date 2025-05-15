import React, { useState, useEffect } from 'react';
import { toast }                       from 'react-toastify';
import './ServicesPage.css';

export default function ServicesPage() {
  const [date, setDate]     = useState('');
  const [time, setTime]     = useState('');
  const [purpose, setPurpose] = useState('');
  const [bookings, setBookings] = useState([]);
  const today = new Date().toISOString().split('T')[0];

  // Load existing bookings
  useEffect(() => {
    const stored = localStorage.getItem('wellbeingBookings');
    if (stored) setBookings(JSON.parse(stored));
  }, []);

  // Persist on change
  useEffect(() => {
    localStorage.setItem('wellbeingBookings', JSON.stringify(bookings));
  }, [bookings]);

  const handleSubmit = e => {
    e.preventDefault();
    const newBooking = { id: Date.now(), date, time, purpose };
    setBookings([newBooking, ...bookings]);
    setDate(''); setTime(''); setPurpose('');

    toast.success('✅ Meeting booked!');
  };

  return (
    <div className="page-container services-page">
      <h2>Book a Meeting</h2>
      <form onSubmit={handleSubmit} className="booking-form">
        <label>
          Date:
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            required
            min={today}
          />
        </label>

        <label>
          Time:
          <input
            type="time"
            value={time}
            onChange={e => setTime(e.target.value)}
            required
          />
        </label>

        <label>
          Purpose:
          <input
            type="text"
            value={purpose}
            onChange={e => setPurpose(e.target.value)}
            placeholder="e.g. Discuss coursework"
            required
          />
        </label>

        <button type="submit" className="btn btn-primary">
          Book Meeting
        </button>
      </form>

      <h3>Upcoming Meetings</h3>
      {bookings.length === 0 ? (
        <p>No meetings booked yet.</p>
      ) : (
        <ul className="booking-list">
          {bookings.map(b => (
            <li key={b.id}>
              <strong>{b.date} @ {b.time}</strong> — {b.purpose}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
