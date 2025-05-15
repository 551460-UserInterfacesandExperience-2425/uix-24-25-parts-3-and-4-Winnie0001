import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';

import HomePage            from './pages/HomePage.jsx';
import StudentCheckIn      from './pages/StudentCheckIn.jsx';
import SupervisorDashboard from './pages/SupervisorDashboard.jsx';
import ServicesPage        from './pages/ServicesPage.jsx';
import AboutPage           from './pages/AboutPage.jsx';
import EmergencySupport    from './pages/EmergencySupport.jsx';
import LoginPage           from './pages/LoginPage.jsx';

export default function App() {
  return (
    <>
      <Navbar />

      <main style={{ padding: '1rem' }}>
        <Routes>
          <Route path="/"          element={<HomePage />} />
          <Route path="/checkin"   element={<StudentCheckIn />} />
          <Route
            path="/dashboard"
            element={<SupervisorDashboard />}
          />
          <Route path="/services"  element={<ServicesPage />} />
          <Route path="/about"     element={<AboutPage />} />
          <Route path="/emergency" element={<EmergencySupport />} />
          <Route path="/login"     element={<LoginPage />} />
          <Route path="*"          element={<h2>404: Page Not Found</h2>} />
        </Routes>
      </main>
    </>
  );
}
