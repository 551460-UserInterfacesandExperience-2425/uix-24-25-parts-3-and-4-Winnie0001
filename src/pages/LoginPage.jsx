// src/pages/LoginPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const USERS = [
  { email: 'student@example.com',    password: 'stud123',  role: 'student' },
  { email: 'supervisor@example.com', password: 'sup123',    role: 'supervisor' },
  { email: 'tutor@example.com',      password: 'tutor123',  role: 'senior-tutor' },
];

export default function LoginPage() {
  const navigate = useNavigate();
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error,    setError]    = useState('');

  // on mount, load remembered email
  useEffect(() => {
    const saved = localStorage.getItem('rememberedEmail');
    if (saved) {
      setEmail(saved);
      setRemember(true);
    }
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    const user = USERS.find(u => u.email === email && u.password === password);

    if (!user) {
      setError('Invalid email or password');
      return;
    }

    // save login state
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail',   user.email);
    localStorage.setItem('userRole',    user.role);

    // remember or forget the email
    if (remember) {
      localStorage.setItem('rememberedEmail', user.email);
    } else {
      localStorage.removeItem('rememberedEmail');
    }

    // redirect based on role
    if (user.role === 'student') {
      navigate('/checkin');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      {error && <div className="error">{error}</div>}

      <form onSubmit={handleSubmit} className="login-form">
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={e => { setEmail(e.target.value); setError(''); }}
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
