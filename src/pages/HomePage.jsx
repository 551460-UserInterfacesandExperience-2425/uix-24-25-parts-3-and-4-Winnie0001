import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

export default function HomePage() {
  const navigate = useNavigate();

  // Personalize greeting
  const [greeting, setGreeting] = useState('');
  const [name, setName] = useState('');

  // Stats
  const [checkInsCount, setCheckInsCount] = useState(0);
  const [meetingsCount, setMeetingsCount] = useState(0);

  useEffect(() => {
    // Name from login
    const email = localStorage.getItem('userEmail') || '';
    setName(email.split('@')[0] || 'there');

    // Compute greeting
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');

    // Load stats
    const history = JSON.parse(localStorage.getItem('wellbeingHistory') || '[]');
    setCheckInsCount(history.length);

    const bookings = JSON.parse(localStorage.getItem('wellbeingBookings') || '[]');
    setMeetingsCount(bookings.length);
  }, []);

  return (
    <div className="home-hero">
      {/* SVG wave background */}
      <svg className="wave" viewBox="0 0 1440 320">
        <path
          fill="var(--accent-color)"
          fillOpacity="0.3"
          d="M0,224L48,213.3C96,203,192,181,288,160C384,139,480,117,576,133.3C672,149,768,203,864,208C960,213,1056,171,1152,165.3C1248,160,1344,192,1392,208L1440,224L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        ></path>
      </svg>

      <div className="hero-content">
        <h1>{greeting}, {name}!</h1>
        <p>Welcome back to your Wellbeing Dashboard.</p>

        <div className="stats-cards">
          <div className="card">
            <h3>{checkInsCount}</h3>
            <p>Check-Ins Logged</p>
          </div>
          <div className="card">
            <h3>{meetingsCount}</h3>
            <p>Meetings Booked</p>
          </div>
        </div>

        <div className="cta-buttons">
          <button onClick={() => navigate('/checkin')} className="btn btn-primary">
            New Check-In
          </button>
          <button onClick={() => navigate('/services')} className="btn btn-secondary">
            Book Meeting
          </button>
        </div>
      </div>
    </div>
  );
}
