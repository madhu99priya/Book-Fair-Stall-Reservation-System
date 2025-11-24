import React from 'react';
import { useAuth } from '../../hooks/useAuth.js';
import './TopBar.css';

export default function TopBar() {
  const { user } = useAuth();

  return (
    <div className="topbar">
      <div className="topbar-left">
        <h2>Colombo Book Fair Admin</h2>
      </div>
      <div className="topbar-right">
        <div className="user-section">
          <div className="user-chip">
            <span className="user-icon">👤</span>
            <span className="username">{user?.username || 'Admin'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}