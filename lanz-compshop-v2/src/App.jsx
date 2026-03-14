// App.jsx
// Root component. Owns all shared state and decides which top-level
// view to render: auth login, customer portal, or staff dashboard.
localStorage.setItem("test", "working");
import { useState } from "react";

import { useLocalStorage } from "./utils/useLocalStorage";
import globalCss from "./styles/globalStyles";
import { INITIAL_USERS, INITIAL_SERVICES, INITIAL_REQUESTS, INITIAL_ACTIVE } from "./data/initialData";

import AuthPage    from "./staff/auth/AuthPage";
import AdminApp    from "./staff/admin/AdminApp";
import EmployeeApp from "./staff/employee/EmployeeApp";
import CustomerUI  from "./customer/CustomerUI";

// ─── Mode constants ────────────────────────────────────────────────────────────
const MODE_AUTH     = "auth";
const MODE_CUSTOMER = "customer";
const MODE_APP      = "app";

export default function App() {
  // ── Shared data state (single source of truth) ──────────────────────────
  const [users,    setUsers]    = useLocalStorage("cs_users",    INITIAL_USERS);
  const [services, setServices] = useLocalStorage("cs_services", INITIAL_SERVICES);
  const [requests, setRequests] = useLocalStorage("cs_requests", INITIAL_REQUESTS);
  const [active,   setActive]   = useLocalStorage("cs_active",   INITIAL_ACTIVE);

  // ── Session / routing state ─────────────────────────────────────────────
  const [mode,    setMode]    = useState(MODE_AUTH);
  const [session, setSession] = useState(null); // { user } | null

  // ── Auth handlers ───────────────────────────────────────────────────────
  const handleLogin  = (user) => { setSession({ user }); setMode(MODE_APP); };
  const handleLogout = ()     => { setSession(null);      setMode(MODE_AUTH); };

  // ── Shared data props ───────────────────────────────────────────────────
  const sharedData = { users, setUsers, services, setServices, requests, setRequests, active, setActive };

  return (
    <>
      {/* Inject global CSS once at the root */}
      <style>{globalCss}</style>

      {/* ── Customer portal ── */}
      {mode === MODE_CUSTOMER && (
        <>
          <CustomerUI
            services={services}
            requests={requests}
            setRequests={setRequests}
            active={active}
            setActive={setActive}
          />
          {/* Floating button to return to staff login */}
          <div style={{ position: "fixed", bottom: 20, right: 20, zIndex: 100 }}>
            <button className="btn btn-ghost" onClick={() => setMode(MODE_AUTH)}>
               Staff Login
            </button>
          </div>
        </>
      )}

      {/* ── Staff login / register ── */}
      {mode === MODE_AUTH && (
        <>
          <AuthPage users={users} setUsers={setUsers} onLogin={handleLogin} />
          {/* Floating button to switch to customer portal */}
          <div style={{ position: "fixed", bottom: 20, right: 20, zIndex: 100 }}>
            <button className="btn btn-primary" onClick={() => setMode(MODE_CUSTOMER)}>
               Customer Portal
            </button>
          </div>
        </>
      )}

      {/* ── Staff dashboards (admin or employee) ── */}
      {mode === MODE_APP && session && (
        session.user.role === "admin" ? (
          <AdminApp
            currentUser={session.user}
            onLogout={handleLogout}
            {...sharedData}
          />
        ) : (
          <EmployeeApp
            currentUser={session.user}
            onLogout={handleLogout}
            requests={requests} setRequests={setRequests}
            active={active}     setActive={setActive}
          />
        )
      )}
    </>
  );
}
