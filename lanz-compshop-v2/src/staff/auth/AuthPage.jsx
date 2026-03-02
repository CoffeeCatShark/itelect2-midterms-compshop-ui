// staff/auth/AuthPage.jsx
// Login and registration page for admin / employee staff accounts.
// First registrant automatically becomes an admin.

import { useState } from "react";
import { genId } from "../../utils/helpers";

export default function AuthPage({ users, setUsers, onLogin }) {
  const [mode, setMode]   = useState("login"); // "login" | "register"
  const [form, setForm]   = useState({ username: "", email: "", password: "", retypePassword: "" });
  const [error, setError] = useState("");

  const upd = (key) => (e) => setForm((p) => ({ ...p, [key]: e.target.value }));

  const handleLogin = () => {
    setError("");
    const user = users.find(
      (u) => u.username === form.username && u.password === form.password
    );
    if (!user) { setError("Invalid username or password."); return; }
    onLogin(user);
  };

  const handleRegister = () => {
    setError("");
    if (form.password.length < 8)           { setError("Password must be at least 8 characters."); return; }
    if (form.password !== form.retypePassword) { setError("Passwords do not match."); return; }
    if (users.find((u) => u.username === form.username)) { setError("Username already taken."); return; }
    if (users.find((u) => u.email === form.email))       { setError("Email already registered."); return; }

    const newUser = {
      id: genId(),
      username: form.username,
      email: form.email,
      password: form.password,
      role: users.length === 0 ? "admin" : "employee", // first user becomes admin
      createdAt: new Date().toISOString(),
    };

    setUsers((prev) => [...prev, newUser]);
    onLogin(newUser);
  };

  const switchMode = (next) => { setMode(next); setError(""); };

  return (
    <div className="auth-wrap">
      <div className="auth-bg-pattern" />

      <div className="auth-card">
        <div className="auth-logo">💻 LanzShop</div>
        <div className="auth-tagline">Computer Shop Management System</div>

        {/* Demo hint */}
        <div className="demo-note">
          <strong>Demo credentials:</strong><br />
          Admin: <code>firstadmin</code> / <code>admin123</code><br />
          Employee: <code>VictorBatongBakal</code> / <code>emp123</code>
        </div>

        {mode === "login" ? (
          <>
            <div className="auth-title">Sign In</div>
            {error && <div className="alert alert-error">{error}</div>}

            <div className="form-group">
              <label className="form-label">Username</label>
              <input
                className="form-input"
                value={form.username}
                onChange={upd("username")}
                placeholder="Enter username"
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                className="form-input"
                type="password"
                value={form.password}
                onChange={upd("password")}
                placeholder="Enter password"
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              />
            </div>

            <button
              className="btn btn-primary"
              style={{ width: "100%", justifyContent: "center", padding: "11px" }}
              onClick={handleLogin}
            >
              Sign In →
            </button>

            <div className="auth-switch">
              Don't have an account?{" "}
              <span className="auth-link" onClick={() => switchMode("register")}>
                Register
              </span>
            </div>
          </>
        ) : (
          <>
            <div className="auth-title">Create Account</div>
            {error && <div className="alert alert-error">{error}</div>}

            <div className="form-group">
              <label className="form-label">Username</label>
              <input className="form-input" value={form.username} onChange={upd("username")} placeholder="Choose a username" />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input className="form-input" type="email" value={form.email} onChange={upd("email")} placeholder="your@email.com" />
            </div>
            <div className="form-group">
              <label className="form-label">Password (min 8 chars)</label>
              <input className="form-input" type="password" value={form.password} onChange={upd("password")} placeholder="Create a password" />
            </div>
            <div className="form-group">
              <label className="form-label">Retype Password</label>
              <input className="form-input" type="password" value={form.retypePassword} onChange={upd("retypePassword")} placeholder="Repeat password" />
            </div>

            <button
              className="btn btn-primary"
              style={{ width: "100%", justifyContent: "center", padding: "11px" }}
              onClick={handleRegister}
            >
              Register →
            </button>

            <div className="auth-switch">
              Already have an account?{" "}
              <span className="auth-link" onClick={() => switchMode("login")}>
                Sign In
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
