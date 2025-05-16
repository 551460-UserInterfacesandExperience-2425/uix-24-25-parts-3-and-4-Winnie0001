// src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import StudentCheckIn from './pages/StudentCheckIn';
import SupervisorDashboard from './pages/SupervisorDashboard';
import EmergencySupport from './pages/EmergencySupport';
import ChatPage from './pages/ChatPage';
import ServicesPage from './pages/ServicesPage';
import HomePage from './pages/HomePage';
import STDashboard from './pages/STDashboard.jsx';

// Protected route component
const ProtectedRoute = ({ element }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  return isLoggedIn ? element : <Navigate to="/" replace />;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/home" element={<ProtectedRoute element={<HomePage />} />} />
      <Route path="/checkin" element={<ProtectedRoute element={<StudentCheckIn />} />} />
      <Route path="/supervisor-dashboard" element={<ProtectedRoute element={<SupervisorDashboard />} />} />
      <Route path="/emergency" element={<ProtectedRoute element={<EmergencySupport />} />} />
      <Route path="/chat" element={<ProtectedRoute element={<ChatPage />} />} />
      <Route path="/services" element={<ProtectedRoute element={<ServicesPage />} />} />
      <Route path="/st-dashboard" element={<ProtectedRoute element={<STDashboard />} />} />
    </Routes>
  );
}

export default App;