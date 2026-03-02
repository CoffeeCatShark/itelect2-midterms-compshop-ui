// staff/admin/AdminDashboard.jsx
// Welcome / overview page shown when admin first logs in.
// Displays stat cards, feature highlights, and recent activity.

import { formatTime } from "../../utils/helpers";

export default function AdminDashboard({ users, services, requests, active }) {
  const today       = new Date().toDateString();
  const todayCount  = requests.filter(
    (r) => new Date(r.timestamp).toDateString() === today
  ).length;

  const recentActivity = [...requests]
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, 5)
    .map((r) => ({
      text: `New request — ${r.serviceType} for ${r.customerName}`,
      time: formatTime(r.timestamp),
    }));

  return (
    <div>
      {/* ── Stats ── */}
      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-value">{users.length}</div>
          <div className="stat-label">Total Users</div>
        </div>
        <div className="stat-card orange">
          <div className="stat-icon">📋</div>
          <div className="stat-value">{active.length}</div>
          <div className="stat-label">Active Requests</div>
        </div>
        <div className="stat-card green">
          <div className="stat-icon">✅</div>
          <div className="stat-value">{todayCount}</div>
          <div className="stat-label">Requests Today</div>
        </div>
        <div className="stat-card red">
          <div className="stat-icon">⚙️</div>
          <div className="stat-value">{services.length}</div>
          <div className="stat-label">Services</div>
        </div>
      </div>

      {/* ── Feature highlights ── */}
      <div className="feature-grid">
        {[
          { icon: "🛡️", title: "User Management",    desc: "Manage roles, permissions, and access for all system users" },
          { icon: "📊", title: "Active Requests",    desc: "Monitor all currently active service requests in real-time" },
          { icon: "📝", title: "Request Tracking",   desc: "Track and process all incoming service requests efficiently" },
          { icon: "🔧", title: "Service Management", desc: "Configure and maintain available services and their settings" },
        ].map((f) => (
          <div className="feature-card" key={f.title}>
            <div className="ficon">{f.icon}</div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>

      {/* ── Recent activity ── */}
      <div className="table-wrap">
        <div className="table-toolbar">
          <span className="table-title">Recent Activity</span>
        </div>
        <div className="activity-list">
          {recentActivity.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📭</div>
              <div className="empty-title">No recent activity</div>
            </div>
          ) : (
            recentActivity.map((a, i) => (
              <div className="activity-item" key={i}>
                <div className="activity-dot" />
                <div className="activity-text">{a.text}</div>
                <div className="activity-time">{a.time}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
