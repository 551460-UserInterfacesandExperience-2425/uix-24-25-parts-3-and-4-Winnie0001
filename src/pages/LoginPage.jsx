// src/pages/LoginPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const USER_ROLES = {
  'student@example.com': 'student',
  'supervisor@example.com': 'supervisor',
  'tutor@example.com': 'senior-tutor',
};

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('rememberedEmail');
    if (saved) {
      setEmail(saved);
      setRemember(true);
      if (USER_ROLES[saved]) {
        setRole(USER_ROLES[saved]);
      }
    }
  }, []);

  const handleEmailChange = (value) => {
    setEmail(value);
    setError('');
    if (USER_ROLES[value]) {
      setRole(USER_ROLES[value]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }

    // Save login state
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userRole', role);

    if (remember) {
      localStorage.setItem('rememberedEmail', email);
    } else {
      localStorage.removeItem('rememberedEmail');
    }

    // ✅ Redirect all users to the unified home page
    navigate('/home');
  };

  return (
    <div className="login-page">
      <h2>Login</h2>

      <div style={{
        fontSize: '0.9rem',
        marginBottom: '1rem',
        background: '#fff3cd',
        padding: '0.75rem',
        borderRadius: '6px',
        color: '#856404',
        border: '1px solid #ffeeba'
      }}>
        <strong>Test Login Credentials:</strong><br />
        Student → <code>student@example.com</code> / <code>stud123</code><br />
        Supervisor → <code>supervisor@example.com</code> / <code>sup123</code><br />
        Senior Tutor → <code>tutor@example.com</code> / <code>tutor123</code>
      </div>

      {error && <div className="error">{error}</div>}

      <form onSubmit={handleSubmit} className="login-form">
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={e => handleEmailChange(e.target.value)}
            required
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={e => { setPassword(e.target.value); setError(''); }}
            required
          />
        </label>

        <label>
          Role:
          <select
            value={role}
            onChange={e => setRole(e.target.value)}
            required
          >
            <option value="student">Student</option>
            <option value="supervisor">Personal Supervisor</option>
            <option value="senior-tutor">Senior Tutor</option>
          </select>
        </label>

        <label className="remember-me">
          <input
            type="checkbox"
            checked={remember}
            onChange={e => setRemember(e.target.checked)}
          />
          Remember Me
        </label>

        <button type="submit" className="btn-primary">
          Sign In
        </button>
      </form>
    </div>
  );
}
