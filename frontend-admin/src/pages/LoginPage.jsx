import React, { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth.js';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm.jsx';

export default function LoginPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate('/', { replace: true });
  }, [isAuthenticated, navigate]);

  return (
    <div style={{ display: 'grid', placeItems: 'center', minHeight: '100vh', background: '#f1f5f9' }}>
      <div
        style={{
          background: '#fff',
          padding: '2rem',
          borderRadius: '12px',
          width: 'min(400px, 92vw)',
          boxShadow: '0 6px 24px rgba(0,0,0,0.1)'
        }}
      >
        <LoginForm />
      </div>
    </div>
  );
}