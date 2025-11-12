import React from 'react';
import { useQuery } from '@tanstack/react-query';
import reservationsService from '../services/reservationsService.js';
import stallsService from '../services/stallsService.js';
import usersService from '../services/usersService.js';
import { SkeletonCard } from '../components/common/Skeleton.jsx';

export default function DashboardPage() {
  const resQ = useQuery({
    queryKey: ['reservations', { limit: 5 }],
    queryFn: () => reservationsService.list({ limit: 5 })
  });
  const stallsQ = useQuery({
    queryKey: ['stalls-summary'],
    queryFn: () => stallsService.list()
  });
  const usersQ = useQuery({
    queryKey: ['users-summary'],
    queryFn: () => usersService.list({ limit: 5 })
  });

  const isLoading = resQ.isLoading || stallsQ.isLoading || usersQ.isLoading;

  const totalStalls = stallsQ.data?.length || 0;
  const reservedCount = stallsQ.data?.filter((s) => s.booked).length || 0;

  const availableStalls = totalStalls - reservedCount;
  const occupancyRate = totalStalls > 0 ? Math.round((reservedCount / totalStalls) * 100) : 0;

  return (
    <div>
      <h1>Dashboard</h1>
      {isLoading ? (
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
        <Stat 
          title="Total Stalls" 
          value={totalStalls} 
          icon="🏪"
          color="#3b82f6"
        />
        <Stat 
          title="Reserved" 
          value={reservedCount} 
          icon="✓"
          color="#10b981"
          trend={5}
        />
        <Stat 
          title="Available" 
          value={availableStalls} 
          icon="○"
          color="#f59e0b"
        />
        <Stat 
          title="Occupancy" 
          value={`${occupancyRate}%`} 
          icon="📊"
          color="#8b5cf6"
          trend={occupancyRate > 50 ? 12 : -3}
        />
        <Stat 
          title="Active Reservations" 
          value={resQ.data?.length || 0} 
          icon="📋"
          color="#ec4899"
        />
        <Stat 
          title="Users" 
          value={usersQ.data?.length || 0} 
          icon="👥"
          color="#06b6d4"
          trend={8}
        />
        </div>
      )}
      {!isLoading && (
      <section>
        <h2 style={{ marginTop: '1.5rem' }}>Recent Reservations</h2>
        <ul style={{ background: '#fff', padding: '1rem', borderRadius: 8 }}>
          {resQ.data?.map((r) => (
            <li key={r.id}>
              #{r.id} - {r.businessName} ({r.stalls?.map((s) => s.name).join(', ')})
            </li>
          ))}
        </ul>
      </section>
      )}
    </div>
  );
}

function Stat({ title, value, icon, color = '#3b82f6', trend }) {
  return (
    <div
      style={{
        background: '#fff',
        padding: '1.5rem',
        borderRadius: 12,
        minWidth: 180,
        border: '1px solid #e2e8f0',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        cursor: 'pointer'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)';
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', fontWeight: '600', letterSpacing: '0.5px' }}>
          {title}
        </div>
        {icon && (
          <div style={{ 
            width: '40px', 
            height: '40px', 
            borderRadius: '10px', 
            background: `${color}15`, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            fontSize: '1.25rem'
          }}>
            {icon}
          </div>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
        <div style={{ fontSize: '2rem', fontWeight: 700, color: '#1e293b' }}>{value}</div>
        {trend && (
          <div style={{ 
            fontSize: '0.75rem', 
            fontWeight: '600',
            color: trend > 0 ? '#10b981' : '#ef4444',
            display: 'flex',
            alignItems: 'center'
          }}>
            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
          </div>
        )}
      </div>
    </div>
  );
}
