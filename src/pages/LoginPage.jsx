// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email,     setEmail]     = useState('');
  const [password,  setPassword]  = useState('');
  const [remember,  setRemember]  = useState(false);
  const [error,     setError]     = useState('');

  // ← your “user DB”: add as many as you like
  const users = [
    { email: 'alice@example.com',   password: 'alice123'   },
    { email: 'bob@example.com',     password: 'letmein'     },
    { email: 'charlie@example.com', password: 'qwerty'      },
    // …or load this list from localStorage or an API…
  ];

  const handleSubmit = e => {
    e.preventDefault();
    const found = users.find(u => u.email === email && u.password === password);

    if (found) {
      // successful login
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', email);
      remember
        ? localStorage.setItem('rememberMe', 'true')
        : localStorage.removeItem('rememberMe');
      navigate('/dashboard');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      {error && <div className="error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
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

        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}
