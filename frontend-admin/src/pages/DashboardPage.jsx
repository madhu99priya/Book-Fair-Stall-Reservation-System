import React from "react";
import { useQuery } from "@tanstack/react-query";
import reservationsService from "../services/reservationsService.js";
import stallsService from "../services/stallsService.js";
import usersService from "../services/usersService.js";
import { SkeletonCard } from "../components/common/Skeleton.jsx";
import "./DashboardPage.css";

export default function DashboardPage() {
  const resQ = useQuery({
    queryKey: ["reservations", { limit: 5 }],
    queryFn: () => reservationsService.list({ limit: 5 }),
  });
  const stallsQ = useQuery({
    queryKey: ["stalls-summary"],
    queryFn: () => stallsService.list(),
  });
  const usersQ = useQuery({
    queryKey: ["users-summary"],
    queryFn: () => usersService.list({ limit: 5 }),
  });

  const isLoading = resQ.isLoading || stallsQ.isLoading || usersQ.isLoading;

  const totalStalls = stallsQ.data?.length || 0;
  const reservedCount = stallsQ.data?.filter((s) => s.booked).length || 0;

  const availableStalls = totalStalls - reservedCount;
  const occupancyRate =
    totalStalls > 0 ? Math.round((reservedCount / totalStalls) * 100) : 0;

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard Overview</h1>

      {isLoading ? (
        <div className="stats-grid">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <div className="stats-grid">
          <StatCard
            title="Total Stalls"
            value={totalStalls}
            icon="🏪"
            color="#0ea5e9"
          />
          <StatCard
            title="Reserved"
            value={reservedCount}
            icon="✓"
            color="#10b981"
            trend={5}
          />
          <StatCard
            title="Available"
            value={availableStalls}
            icon="○"
            color="#f59e0b"
          />
          <StatCard
            title="Occupancy"
            value={`${occupancyRate}%`}
            icon="📊"
            color="#a855f7"
            trend={occupancyRate > 50 ? 12 : -3}
          />
          <StatCard
            title="Active Reservations"
            value={resQ.data?.length || 0}
            icon="📋"
            color="#ec4899"
          />
          <StatCard
            title="Users"
            value={usersQ.data?.length || 0}
            icon="👥"
            color="#06b6d4"
            trend={8}
          />
        </div>
      )}

      {!isLoading && resQ.data && resQ.data.length > 0 && (
        <section className="recent-section">
          <h2 className="section-title">Recent Reservations</h2>
          <ul className="reservations-list">
            {resQ.data.map((r) => (
              <li key={r.id} className="reservation-item">
                <strong>#{r.id}</strong> - {r.businessName}
                {r.stalls && r.stalls.length > 0 && (
                  <span style={{ color: "#94a3b8", marginLeft: "0.5rem" }}>
                    ({r.stalls.map((s) => s.name).join(", ")})
                  </span>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

function StatCard({ title, value, icon, color = "#0ea5e9", trend }) {
  const iconBg = `${color}26`; // 15% opacity
  const iconBorder = `${color}4D`; // 30% opacity

  return (
    <div className="stat-card" style={{ "--card-color": color }}>
      <div className="stat-header">
        <div className="stat-title">{title}</div>
        <div
          className="stat-icon"
          style={{
            "--icon-bg": iconBg,
            "--icon-border": iconBorder,
            background: iconBg,
            border: `1px solid ${iconBorder}`,
          }}
        >
          {icon}
        </div>
      </div>
      <div className="stat-content">
        <div className="stat-value">{value}</div>
        {trend !== undefined && (
          <div className={`stat-trend ${trend > 0 ? "positive" : "negative"}`}>
            {trend > 0 ? "↑" : "↓"} {Math.abs(trend)}%
          </div>
        )}
      </div>
    </div>
  );
}
