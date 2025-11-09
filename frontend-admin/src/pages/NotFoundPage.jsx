import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div style={{ padding: '3rem' }}>
      <h1>404 - Not Found</h1>
      <p>The page you were looking for does not exist.</p>
      <Link to="/">Go Home</Link>
    </div>
  );
}