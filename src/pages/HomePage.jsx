import React from 'react';
import './HomePage.css';  // only contains layout & typography now

export default function HomePage() {
  const heroStyle = {
    background: "var(--accent-color) url('/banner.jpg') center/cover no-repeat",
    height: '60vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white'
  };

  return (
    <div style={heroStyle}>
      <div className="hero-content">
        <h1>Welcome to the Wellbeing App</h1>
        <p>Your personal space to track how you’re feeling and book support meetings.</p>
        <button onClick={() => window.location = '/checkin'}>
          Start Check-In
        </button>
      </div>
    </div>
  );
}

