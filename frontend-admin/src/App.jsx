import React from 'react';
import RoutesRoot from './routes/index.jsx';
import { useAuth } from './hooks/useAuth.js';

export default function App() {
  const { isInitializing } = useAuth();
  if (isInitializing) return <div style={{ padding: 40 }}>Loading app...</div>;
  return <RoutesRoot />;
}