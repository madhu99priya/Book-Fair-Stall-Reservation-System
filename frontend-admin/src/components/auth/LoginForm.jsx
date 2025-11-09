import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth.js';

export default function LoginForm() {
  const { login } = useAuth();
  const [form, setForm] = useState({ username: '', password: '' });
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
      await login(form.username, form.password);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h1>Admin Login</h1>
      {error && <div className="error-box">{error}</div>}
      <label>
        Username
        <input
          name="username"
            autoComplete="username"
          value={form.username}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Password
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          value={form.password}
          onChange={handleChange}
          required
        />
      </label>
      <button disabled={loading} type="submit">
        {loading ? 'Authenticating...' : 'Login'}
      </button>
    </form>
  );
}