import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../navigation/Sidebar.jsx';
import TopBar from '../navigation/TopBar.jsx';
import './AdminLayout.css';

export default function AdminLayout() {
  return (
    <div className="layout-root">
      <Sidebar />
      <div className="layout-content">
        <TopBar />
        <main className="layout-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}