// src/pages/ServicesPage.jsx
import React, { useState, useEffect } from 'react';
import './ServicesPage.css';

export default function ServicesPage() {
  const [date, setDate]     = useState('');
  const [time, setTime]     = useState('');
  const [purpose, setPurpose] = useState('');
  const [bookings, setBookings] = useState([]);
  const today = new Date().toISOString().slice(0,10);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('wellbeingBookings') || '[]');
    setBookings(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem('wellbeingBookings', JSON.stringify(bookings));
  }, [bookings]);

  const handleSubmit = e => {
    e.preventDefault();
    setBookings([{ id: Date.now(), date, time, purpose }, ...bookings]);
    setDate(''); setTime(''); setPurpose('');
  };

  return (
    <div className="page-panel services">
      <h2>Book a Meeting</h2>
      <form onSubmit={handleSubmit} className="booking-form">
        <label>
          Date:
          <input
            type="date"
            min={today}
            value={date}
            onChange={e => setDate(e.target.value)}
            required
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
            placeholder="e.g. Discuss coursework"
            value={purpose}
            onChange={e => setPurpose(e.target.value)}
            required
          />
        </label>
        <button type="submit">Book Meeting</button>
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
