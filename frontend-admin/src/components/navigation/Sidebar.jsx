import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';
import './Sidebar.css';

const links = [
  { to: '/', label: 'Dashboard', icon: '📊' },
  { to: '/stalls', label: 'Stalls', icon: '🗺️' },
  { to: '/reservations', label: 'Reservations', icon: '📄' },
  { to: '/users', label: 'Users', icon: '👥' },
  { to: '/genres', label: 'Genres', icon: '📚' }
];

export default function Sidebar() {
  const { logout } = useAuth();
  return (
    <aside className="sidebar">
      <div className="sidebar-header">Admin Portal</div>
      <nav className="sidebar-nav">
        {links.map((l) => (
          <NavLink key={l.to} to={l.to} className="nav-link">
            <span className="icon">{l.icon}</span> {l.label}
          </NavLink>
        ))}
      </nav>
      <button onClick={logout} className="logout-btn">
        Logout
      </button>
    </aside>
  );
}