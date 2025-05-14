import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

import HomePage            from './pages/HomePage';
import StudentCheckIn      from './pages/StudentCheckIn';
import SupervisorDashboard from './pages/SupervisorDashboard';
import ServicesPage        from './pages/ServicesPage';
import LoginPage           from './pages/LoginPage';
 import ProtectedRoute     from './components/ProtectedRoute';

export default function App() {
  return (
    <>
      <Navbar />
      <main style={{ padding: '1rem' }}>
        <Routes>
          <Route path="/"          element={<HomePage />} />
          <Route path="/checkin"   element={<StudentCheckIn />} />
        <Route path="/dashboard" element={<SupervisorDashboard />} />
          <Route
            path="/dashboard"
           element={
              <ProtectedRoute>
               <SupervisorDashboard />
            </ProtectedRoute>
          }
          />
          <Route path="/services"  element={<ServicesPage />} />
          <Route path="/login"     element={<LoginPage />} />
          <Route path="*"          element={<h2>404: Page Not Found</h2>} />
        </Routes>
      </main>
    </>
  );
}
