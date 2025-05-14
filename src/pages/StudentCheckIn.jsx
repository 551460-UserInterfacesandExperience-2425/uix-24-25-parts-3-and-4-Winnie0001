import React, { useState, useEffect } from 'react';
import './StudentCheckIn.css';

export default function StudentCheckIn() {
  const [mood, setMood] = useState('');
  const [notes, setNotes] = useState('');
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setHistory(JSON.parse(localStorage.getItem('wellbeingHistory') || '[]'));
  }, []);

  const submit = e => {
    e.preventDefault();
    const entry = { date: new Date().toLocaleString(), mood, notes };
    const updated = [entry, ...history];
    setHistory(updated);
    localStorage.setItem('wellbeingHistory', JSON.stringify(updated));
    setMood('');
    setNotes('');
  };

  return (
    <div className="checkin page-container">
      <h2>Wellbeing Check-In</h2>
      <form onSubmit={submit} className="checkin-form">
        <label>
          Mood:
          <select value={mood} onChange={e => setMood(e.target.value)} required>
            <option value="">Select…</option>
            <option>Great</option>
            <option>Okay</option>
            <option>Not well</option>
          </select>
        </label>
        <label>
          Notes:
          <textarea value={notes} onChange={e => setNotes(e.target.value)} />
        </label>
        <button type="submit">Submit</button>
      </form>
      <ul>
        {history.map((e, i) => (
          <li key={i}>
            <strong>{e.date}</strong> — {e.mood}{e.notes ? ` / ${e.notes}` : ''}
          </li>
        ))}
      </ul>
    </div>
  );
}
