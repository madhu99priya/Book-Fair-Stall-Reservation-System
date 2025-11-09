import React from 'react';
import { useQuery } from '@tanstack/react-query';
import reservationsService from '../services/reservationsService.js';
import stallsService from '../services/stallsService.js';
import usersService from '../services/usersService.js';
import Spinner from '../components/common/Spinner.jsx';

export default function DashboardPage() {
  // TanStack Query v5 requires object form:
  const resQ = useQuery({
    queryKey: ['reservations', { limit: 5 }],
    queryFn: () => reservationsService.list({ limit: 5 }),
  });

  const stallsQ = useQuery({
    queryKey: ['stalls-summary'],
    queryFn: () => stallsService.list(),
  });

  const usersQ = useQuery({
    queryKey: ['users-summary'],
    queryFn: () => usersService.list({ limit: 5 }),
  });

  if (resQ.isLoading || stallsQ.isLoading || usersQ.isLoading) return <Spinner />;

  if (resQ.isError || stallsQ.isError || usersQ.isError) {
    const msg =
      resQ.error?.message ||
      stallsQ.error?.message ||
      usersQ.error?.message ||
      'Failed to load dashboard data';
    return <div style={{ color: 'crimson' }}>Error: {msg}</div>;
  }

  const totalStalls = stallsQ.data?.length || 0;
  const reservedCount = stallsQ.data?.filter((s) => s.status === 'RESERVED').length || 0;

  return (
    <div>
      <h1>Dashboard</h1>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem' }}>
        <Stat title="Total Stalls" value={totalStalls} />
        <Stat title="Reserved Stalls" value={reservedCount} />
        <Stat title="Active Reservations" value={resQ.data?.length || 0} />
        <Stat title="Users" value={usersQ.data?.length || 0} />
      </div>
      <section>
        <h2 style={{ marginTop: '1.5rem' }}>Recent Reservations</h2>
        <ul style={{ background: '#fff', padding: '1rem', borderRadius: 8 }}>
          {resQ.data?.map((r) => {
            // Backend returns stalls as a list; they might be strings or objects.
            const stallsText = Array.isArray(r.stalls)
              ? r.stalls.map((s) => (typeof s === 'string' ? s : s?.name)).join(', ')
              : '';
            return (
              <li key={r.id}>
                #{r.id} - {r.businessName} ({stallsText})
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

function Stat({ title, value }) {
  return (
    <div
      style={{
        background: '#fff',
        padding: '0.9rem 1rem',
        borderRadius: 8,
        minWidth: 140,
        border: '1px solid #e2e8f0',
      }}
    >
      <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase' }}>
        {title}
      </div>
      <div style={{ fontSize: '1.3rem', fontWeight: 600 }}>{value}</div>
    </div>
  );
}