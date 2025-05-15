// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === '1';
  const role       = localStorage.getItem('userRole');

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  // Example: only supervisors & senior tutors can see /dashboard
  if (children.type.name === 'SupervisorDashboard' && role === 'student') {
    return <Navigate to="/" />;
  }

  return children;
}
