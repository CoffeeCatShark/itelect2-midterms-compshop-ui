// staff/shared/DashboardLayout.jsx
// Sidebar + main-content shell used by both Admin and Employee dashboards.

import LiveTime from "../../components/LiveTime";

export default function DashboardLayout({
  currentUser,
  onLogout,
  nav,
  activeNav,
  setActiveNav,
  children,
}) {
  return (
    <div className="app-layout">
      {/* ── Sidebar ── */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-name">Lanz Computer Shop</div>
          <div className="brand-sub">Management System</div>
        </div>

        <div className="sidebar-user">
          <div className="user-avatar">{currentUser.username[0].toUpperCase()}</div>
          <div className="user-info">
            <div className="user-name">{currentUser.username}</div>
            <div className="user-role">{currentUser.role}</div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section">Navigation</div>
          {nav.map((n) => (
            <button
              key={n.key}
              className={`nav-item${activeNav === n.key ? " active" : ""}`}
              onClick={() => setActiveNav(n.key)}
            >
              <span className="nav-icon">{n.icon}</span>
              {n.label}
            </button>
          ))}
        </nav>

        <div className="nav-logout">
          <button className="btn-logout" onClick={onLogout}>
            <span>🚪</span> Logout
          </button>
        </div>
      </aside>

      {/* ── Main content ── */}
      <main className="main">
        <div className="page-header">
          <div className="page-title">
            {nav.find((n) => n.key === activeNav)?.label ?? ""}
          </div>
          <LiveTime />
        </div>
        <div className="page-body">{children}</div>
      </main>
    </div>
  );
}
