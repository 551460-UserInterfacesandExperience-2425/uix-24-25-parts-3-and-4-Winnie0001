// src/pages/SupervisorDashboard.jsx
import React, { useEffect, useState }                    from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip }       from 'recharts';
import './SupervisorDashboard.css';

export default function SupervisorDashboard() {
  const [entries, setEntries]     = useState([]);
  const [bookings, setBookings]   = useState([]);

  useEffect(() => {
    const hist = JSON.parse(localStorage.getItem('wellbeingHistory') || '[]');
    setEntries(hist);
    const bk = JSON.parse(localStorage.getItem('wellbeingBookings') || '[]');
    setBookings(bk);
  }, []);

  // Prepare chart data: last 7 entries, map mood to a score
  const chartData = entries.slice(0, 7).map(e => ({
    date: new Date(e.date).toLocaleDateString(),
    mood:
      e.mood === 'Great' ? 3 :
      e.mood === 'Okay'  ? 2 : 1
  })).reverse();

  return (
    <div className="dashboard page-container">
      <h2>Supervisor Dashboard</h2>

      {/* Mood Over Time Chart */}
      {chartData.length > 0 && (
        <div className="chart-wrapper">
          <h3>Mood Over Time</h3>
          <LineChart width={500} height={200} data={chartData}>
            <XAxis dataKey="date" />
            <YAxis domain={[1,3]} ticks={[1,2,3]} />
            <Tooltip formatter={value =>
              value === 3 ? 'Great' :
              value === 2 ? 'Okay' : 'Not well'}
            />
            <Line type="monotone" dataKey="mood" stroke="#1e88e5" strokeWidth={2} />
          </LineChart>
        </div>
      )}

      {/* Existing Check-Ins Table */}
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
                  <td>{new Date(e.date).toLocaleString()}</td>
                  <td>{e.mood}</td>
                  <td>{e.notes || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* Existing Bookings Table */}
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
