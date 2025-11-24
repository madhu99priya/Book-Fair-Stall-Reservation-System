import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth.js';
import './LoginForm.css';

export default function LoginForm() {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login(form.email, form.password);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="gradient-overlay"></div>
      </div>
      
      <div className="login-content">
        <div className="login-header">
          <div className="logo-section">
            <div className="logo-icon">📚</div>
            <h1 className="app-title">Colombo International Book Fair 2025</h1>
            <p className="app-subtitle">Admin Portal</p>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-header">
            <h2>Admin Login</h2>
            <p>Access the administrative dashboard</p>
          </div>
          
          {error && (
            <div className="error-box">
              <span className="error-icon">⚠️</span>
              {error}
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your admin email"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>
          
          <button 
            disabled={loading} 
            type="submit" 
            className={`login-btn ${loading ? 'loading' : ''}`}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Authenticating...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>
        
        <div className="login-footer">
          <p>&copy; 2025 Colombo International Book Fair. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}