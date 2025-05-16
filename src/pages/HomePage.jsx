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

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const stats = [
    { label: 'Resources', count: 4 },
    { label: 'Meetings', count: 2 },
    { label: 'Check-In', count: 1 },
  ];

  return (
    <div className="home-hero">
      <div className="hero-content">
        {/* 🔓 Logout Button */}
        <button
          onClick={handleLogout}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          Logout
        </button>

        <h1>Welcome, {role?.replace('-', ' ')}</h1>
        <p>Logged in as: <strong>{email}</strong></p>

        <div className="stats-cards">
          {stats.map((s, i) => (
            <div className="card" key={i}>
              <h3>{s.count}</h3>
              <p>{s.label}</p>
            </div>
          ))}
        </div>

        <div className="cta-buttons">
          <button className="btn btn-primary" onClick={() => navigate('/chat')}>Start Chat</button>
          <button className="btn btn-secondary" onClick={() => navigate('/emergency')}>Emergency Support</button>
          <button className="btn btn-primary" onClick={() => navigate('/services')}>Book a Meeting</button>

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
    </div>
  );
}
