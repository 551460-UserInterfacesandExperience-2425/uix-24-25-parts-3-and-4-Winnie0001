import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const navigate = useNavigate();
  const email = localStorage.getItem('userEmail') || '';

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      {/* Left-aligned nav links */}
      <div>
        <NavLink to="/"         end>Home</NavLink>
        <NavLink to="/checkin">Check-In</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/services">Services</NavLink>
        <NavLink to="/login">Login</NavLink>
      </div>

      {/* Spacer pushes the next items to the right */}
      <div className="navbar-spacer" />

      {/* Right-aligned user greeting and logout */}
      {email && <span className="navbar-user">Hi, {email}</span>}
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
    </nav>
  );
}
