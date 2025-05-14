import React, { useEffect, useState } from 'react';
import './SupervisorDashboard.css';

export default function SupervisorDashboard() {
  const [entries, setEntries] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    setEntries(JSON.parse(localStorage.getItem('wellbeingHistory') || '[]'));
    setBookings(JSON.parse(localStorage.getItem('wellbeingBookings') || '[]'));
  }, []);

  return (
    <div className="dashboard page-container">
      <h2>Supervisor Dashboard</h2>

      <section>
        <h3>Student Check-Ins</h3>
        {entries.length === 0 ? (
          <p>No check-ins yet.</p>
        ) : (
          <table>
            <thead>
              <tr><th>Date</th><th>Mood</th><th>Notes</th></tr>
            </thead>
            <tbody>
              {entries.map((e, i) => (
                <tr key={i}>
                  <td>{e.date}</td>
                  <td>{e.mood}</td>
                  <td>{e.notes || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h3>Upcoming Meetings</h3>
        {bookings.length === 0 ? (
          <p>No meetings booked yet.</p>
        ) : (
          <table>
            <thead>
              <tr><th>Date</th><th>Time</th><th>Purpose</th></tr>
            </thead>
            <tbody>
              {bookings.map(b => (
                <tr key={b.id}>
                  <td>{b.date}</td>
                  <td>{b.time}</td>
                  <td>{b.purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}
