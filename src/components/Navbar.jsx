import React, { useState, useEffect } from "react";
import { NavLink, useNavigate }           from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const email    = localStorage.getItem("userEmail");
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((t) => (t === "light" ? "dark" : "light"));

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <NavLink to="/"       end>Home</NavLink>
        <NavLink to="/checkin">Check-In</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/services">Services</NavLink>
        <NavLink to="/about">About Us</NavLink>
        <NavLink to="/emergency">Emergency</NavLink>
        <NavLink to="/login">Login</NavLink>
      </div>

      <div className="navbar-spacer" />

      <button onClick={toggleTheme} className="btn theme-toggle">
        {theme === "light" ? "🌙 Dark" : "☀️ Light"}
      </button>

      {email && <span className="navbar-user">Hi, {email}</span>}

      {email && (
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      )}
    </nav>
  );
}
