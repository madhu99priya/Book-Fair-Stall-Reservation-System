import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '../components/layout/AdminLayout.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import DashboardPage from '../pages/DashboardPage.jsx';
import StallsPage from '../pages/StallsPage.jsx';
import ReservationsPage from '../pages/ReservationsPage.jsx';
import UsersPage from '../pages/UsersPage.jsx';
import GenresPage from '../pages/GenresPage.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import { useAuth } from '../hooks/useAuth.js';

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default function RoutesRoot() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <AdminLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="stalls" element={<StallsPage />} />
        <Route path="reservations" element={<ReservationsPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="genres" element={<GenresPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}