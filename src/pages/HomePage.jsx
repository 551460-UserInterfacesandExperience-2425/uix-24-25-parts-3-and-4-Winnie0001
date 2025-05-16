import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

export default function HomePage() {
  const navigate = useNavigate();
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const storedRole = localStorage.getItem('userRole');
    const storedEmail = localStorage.getItem('userEmail');
    if (!storedRole) navigate('/');
    setRole(storedRole);
    setEmail(storedEmail);
  }, [navigate]);

  return (
    <div className="home-hero">
      <div className="hero-content">
        <h1>Welcome, {role?.replace('-', ' ')}</h1>
        <p>Logged in as: <strong>{email}</strong></p>

        <div className="stats-cards">
          <div className="card">
            <h3>4</h3>
            <p>Resources</p>
          </div>
          <div className="card">
            <h3>2</h3>
            <p>Meetings</p>
          </div>
          <div className="card">
            <h3>1</h3>
            <p>Check-In</p>
          </div>
        </div>

        <div className="cta-buttons">
          <button className="btn btn-primary" onClick={() => navigate('/chat')}>
            Start Chat
          </button>
          <button className="btn btn-secondary" onClick={() => navigate('/emergency')}>
            Emergency Support
          </button>
          <button className="btn btn-primary" onClick={() => navigate('/services')}>
            Book a Meeting
          </button>

          {role === 'student' && (
            <button className="btn btn-secondary" onClick={() => navigate('/checkin')}>
              Wellbeing Check-In
            </button>
          )}

          {role === 'supervisor' && (
            <button className="btn btn-secondary" onClick={() => navigate('/supervisor-dashboard')}>
              Supervisor Dashboard
            </button>
          )}

          {role === 'senior-tutor' && (
            <button className="btn btn-secondary" onClick={() => navigate('/st-dashboard')}>
              Tutor Dashboard
            </button>
          )}
        </div>
      </div>
      <svg className="wave" viewBox="0 0 1440 320">
        <path fill="#ffffff" fillOpacity="1" d="M0,96L1440,224L1440,0L0,0Z"></path>
      </svg>
    </div>
  );
}
