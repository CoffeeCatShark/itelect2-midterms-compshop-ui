// ─── GLOBAL STYLES ────────────────────────────────────────────────────────────
// Injected once via <style> in App.jsx

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #0d0f14;
    --surface: #161a24;
    --surface2: #1e2333;
    --border: #2a3045;
    --accent: #4f8ef7;
    --accent2: #f7c04f;
    --danger: #f74f6a;
    --success: #4ff7a0;
    --text: #e8eaf2;
    --muted: #6b7394;
    --sidebar-w: 260px;
  }

  html, body, #root { height: 100%; }

  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--bg);
    color: var(--text);
    font-size: 14px;
    line-height: 1.6;
  }

  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: var(--surface); }
  ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }

  /* ── LAYOUT ── */
  .app-layout { display: flex; height: 100vh; overflow: hidden; }

  /* ── SIDEBAR ── */
  .sidebar {
    width: var(--sidebar-w);
    background: var(--surface);
    border-right: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    overflow-y: auto;
  }
  .sidebar-brand { padding: 28px 24px 20px; border-bottom: 1px solid var(--border); }
  .sidebar-brand .brand-name {
    font-family: 'Syne', sans-serif;
    font-size: 17px;
    font-weight: 800;
    color: var(--accent);
    letter-spacing: 0.01em;
    line-height: 1.2;
  }
  .sidebar-brand .brand-sub {
    font-size: 11px;
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: 0.12em;
    margin-top: 2px;
  }
  .sidebar-user {
    padding: 16px 24px;
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .user-avatar {
    width: 36px; height: 36px; border-radius: 50%;
    background: linear-gradient(135deg, var(--accent), var(--accent2));
    display: flex; align-items: center; justify-content: center;
    font-family: 'Syne', sans-serif; font-weight: 700; font-size: 14px;
    color: #fff; flex-shrink: 0;
  }
  .user-info .user-name  { font-weight: 500; font-size: 13px; color: var(--text); }
  .user-info .user-role  { font-size: 11px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.08em; }
  .sidebar-nav { padding: 16px 12px; flex: 1; }
  .nav-section {
    font-size: 10px; font-weight: 600; text-transform: uppercase;
    letter-spacing: 0.15em; color: var(--muted); padding: 8px 12px 6px;
  }
  .nav-item {
    display: flex; align-items: center; gap: 10px;
    padding: 9px 12px; border-radius: 8px; cursor: pointer;
    color: var(--muted); font-size: 13.5px; font-weight: 400;
    transition: all 0.15s; margin-bottom: 2px;
    border: none; background: transparent; width: 100%; text-align: left;
  }
  .nav-item:hover { background: var(--surface2); color: var(--text); }
  .nav-item.active { background: rgba(79,142,247,0.12); color: var(--accent); font-weight: 500; }
  .nav-item .nav-icon { font-size: 16px; flex-shrink: 0; }
  .nav-logout { padding: 16px 12px; border-top: 1px solid var(--border); }
  .btn-logout {
    display: flex; align-items: center; gap: 10px; width: 100%;
    padding: 9px 12px; border-radius: 8px; border: none;
    background: rgba(247,79,106,0.08); color: var(--danger);
    cursor: pointer; font-size: 13.5px; font-family: 'DM Sans', sans-serif;
    transition: all 0.15s;
  }
  .btn-logout:hover { background: rgba(247,79,106,0.18); }

  /* ── MAIN CONTENT ── */
  .main { flex: 1; overflow-y: auto; background: var(--bg); }
  .page-header {
    padding: 32px 36px 0;
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 28px;
  }
  .page-title { font-family: 'Syne', sans-serif; font-size: 26px; font-weight: 700; color: var(--text); }
  .page-body { padding: 0 36px 36px; }

  /* ── STAT CARDS ── */
  .stat-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 16px; margin-bottom: 28px;
  }
  .stat-card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 12px; padding: 20px;
    position: relative; overflow: hidden;
  }
  .stat-card::before {
    content: ''; position: absolute; top: 0; left: 0;
    width: 3px; height: 100%; background: var(--accent);
  }
  .stat-card.orange::before { background: var(--accent2); }
  .stat-card.green::before  { background: var(--success); }
  .stat-card.red::before    { background: var(--danger); }
  .stat-icon { font-size: 22px; margin-bottom: 8px; }
  .stat-value { font-family: 'Syne', sans-serif; font-size: 32px; font-weight: 700; color: var(--text); }
  .stat-label { font-size: 12px; color: var(--muted); margin-top: 2px; text-transform: uppercase; letter-spacing: 0.08em; }

  /* ── TABLE ── */
  .table-wrap { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; overflow: hidden; }
  .table-toolbar {
    padding: 16px 20px; border-bottom: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between;
    gap: 12px; flex-wrap: wrap;
  }
  .table-title { font-family: 'Syne', sans-serif; font-size: 15px; font-weight: 700; color: var(--text); }
  table { width: 100%; border-collapse: collapse; }
  thead th {
    padding: 11px 18px; font-size: 11px; font-weight: 600;
    text-transform: uppercase; letter-spacing: 0.1em; color: var(--muted);
    text-align: left; background: var(--surface2); border-bottom: 1px solid var(--border);
  }
  tbody tr { border-bottom: 1px solid var(--border); transition: background 0.1s; }
  tbody tr:last-child { border-bottom: none; }
  tbody tr:hover { background: var(--surface2); }
  tbody td { padding: 12px 18px; font-size: 13.5px; color: var(--text); vertical-align: middle; }
  .td-muted { color: var(--muted); }

  /* ── BADGES ── */
  .badge {
    display: inline-flex; align-items: center; gap: 4px;
    padding: 3px 9px; border-radius: 20px;
    font-size: 11px; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase;
  }
  .badge-admin    { background: rgba(79,142,247,0.15); color: var(--accent); }
  .badge-employee { background: rgba(79,247,160,0.12); color: var(--success); }
  .badge-active   { background: rgba(247,192,79,0.15); color: var(--accent2); }

  /* ── BUTTONS ── */
  .btn {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 7px 14px; border-radius: 7px;
    font-size: 12.5px; font-family: 'DM Sans', sans-serif; font-weight: 500;
    border: none; cursor: pointer; transition: all 0.15s; text-decoration: none;
  }
  .btn-primary { background: var(--accent); color: #fff; }
  .btn-primary:hover { background: #3d7de8; }
  .btn-ghost { background: transparent; border: 1px solid var(--border); color: var(--muted); }
  .btn-ghost:hover { border-color: var(--text); color: var(--text); }
  .btn-danger-ghost { background: transparent; border: 1px solid rgba(247,79,106,0.3); color: var(--danger); }
  .btn-danger-ghost:hover { background: rgba(247,79,106,0.1); }
  .btn-success-ghost { background: transparent; border: 1px solid rgba(79,247,160,0.3); color: var(--success); }
  .btn-success-ghost:hover { background: rgba(79,247,160,0.1); }
  .btn-sm { padding: 5px 10px; font-size: 12px; }

  /* ── FORM ── */
  .form-card { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 28px; max-width: 560px; }
  .form-group { margin-bottom: 18px; }
  .form-label { display: block; font-size: 12px; font-weight: 600; color: var(--muted); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 6px; }
  .form-input, .form-select {
    width: 100%; background: var(--surface2); border: 1px solid var(--border);
    color: var(--text); font-family: 'DM Sans', sans-serif; font-size: 14px;
    padding: 10px 14px; border-radius: 8px; outline: none; transition: border-color 0.15s;
  }
  .form-input:focus, .form-select:focus { border-color: var(--accent); }
  .form-input::placeholder { color: var(--muted); }
  .form-select option { background: var(--surface2); }
  .form-row { display: flex; gap: 14px; }
  .form-row .form-group { flex: 1; }
  .form-actions { display: flex; gap: 10px; margin-top: 24px; }

  /* ── TIME SLOTS ── */
  .time-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 8px; }
  .time-slot-btn {
    padding: 8px; border-radius: 7px; border: 1px solid var(--border);
    background: var(--surface2); color: var(--muted);
    font-family: 'DM Sans', sans-serif; font-size: 12.5px;
    cursor: pointer; transition: all 0.15s; text-align: center;
  }
  .time-slot-btn:hover:not(.reserved) { border-color: var(--accent); color: var(--accent); }
  .time-slot-btn.selected  { background: var(--accent); border-color: var(--accent); color: #fff; }
  .time-slot-btn.reserved  { opacity: 0.35; cursor: not-allowed; text-decoration: line-through; }

  /* ── AUTH ── */
  .auth-wrap {
    min-height: 100vh; background: var(--bg);
    display: flex; align-items: center; justify-content: center;
    padding: 24px; position: relative;
  }
  .auth-bg-pattern {
    position: absolute; inset: 0;
    background-image:
      radial-gradient(circle at 20% 20%, rgba(79,142,247,0.06) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(247,192,79,0.04) 0%, transparent 50%);
    pointer-events: none;
  }
  .auth-card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 16px; padding: 40px; width: 100%; max-width: 420px;
    position: relative; z-index: 1;
  }
  .auth-logo { font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 800; color: var(--accent); margin-bottom: 6px; }
  .auth-tagline { font-size: 13px; color: var(--muted); margin-bottom: 32px; }
  .auth-title { font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 700; margin-bottom: 24px; color: var(--text); }
  .auth-link { color: var(--accent); cursor: pointer; text-decoration: underline; font-size: 13px; }
  .auth-switch { text-align: center; margin-top: 20px; color: var(--muted); font-size: 13px; }

  /* ── CUSTOMER ── */
  .customer-wrap { min-height: 100vh; background: var(--bg); padding: 32px 24px; }
  .customer-header { text-align: center; margin-bottom: 40px; }
  .customer-header h1 { font-family: 'Syne', sans-serif; font-size: 36px; font-weight: 800; color: var(--accent); margin-bottom: 4px; }
  .customer-header h2 { font-size: 16px; color: var(--muted); font-weight: 400; }
  .service-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 20px; max-width: 900px; margin: 0 auto; }
  .service-card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 14px; padding: 28px 20px; text-align: center;
    cursor: pointer; transition: all 0.2s;
  }
  .service-card:hover { border-color: var(--accent); transform: translateY(-4px); box-shadow: 0 12px 32px rgba(79,142,247,0.1); }
  .service-card .svc-icon { font-size: 36px; margin-bottom: 12px; }
  .service-card h3 { font-family: 'Syne', sans-serif; font-size: 16px; font-weight: 700; margin-bottom: 6px; }
  .service-card p { font-size: 12px; color: var(--muted); }
  .reservation-wrap { max-width: 600px; margin: 0 auto; padding: 32px 24px; }
  .reservation-back { display: inline-flex; align-items: center; gap: 6px; color: var(--muted); cursor: pointer; font-size: 13px; margin-bottom: 24px; transition: color 0.15s; }
  .reservation-back:hover { color: var(--text); }
  .reservation-title { font-family: 'Syne', sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 28px; }

  /* ── ALERTS ── */
  .alert { padding: 10px 14px; border-radius: 8px; font-size: 13px; margin-bottom: 16px; }
  .alert-success { background: rgba(79,247,160,0.1); border: 1px solid rgba(79,247,160,0.25); color: var(--success); }
  .alert-error   { background: rgba(247,79,106,0.1); border: 1px solid rgba(247,79,106,0.25); color: var(--danger); }

  /* ── FEATURE CARDS ── */
  .feature-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 28px; }
  .feature-card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 12px; padding: 20px; text-align: center; transition: all 0.2s;
  }
  .feature-card:hover { transform: translateY(-2px); }
  .feature-card .ficon { font-size: 28px; margin-bottom: 10px; }
  .feature-card h3 { font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 700; margin-bottom: 6px; }
  .feature-card p { font-size: 12px; color: var(--muted); line-height: 1.5; }

  /* ── ACTIVITY LIST ── */
  .activity-list { display: flex; flex-direction: column; gap: 0; }
  .activity-item { display: flex; align-items: center; gap: 14px; padding: 14px 20px; border-bottom: 1px solid var(--border); }
  .activity-item:last-child { border-bottom: none; }
  .activity-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--accent); flex-shrink: 0; }
  .activity-text { font-size: 13.5px; color: var(--text); flex: 1; }
  .activity-time { font-size: 12px; color: var(--muted); }

  /* ── SEARCH ── */
  .search-input {
    background: var(--surface2); border: 1px solid var(--border);
    color: var(--text); font-family: 'DM Sans', sans-serif; font-size: 13.5px;
    padding: 8px 14px; border-radius: 8px; outline: none; width: 220px; transition: border-color 0.15s;
  }
  .search-input:focus { border-color: var(--accent); }
  .search-input::placeholder { color: var(--muted); }

  /* ── MODAL ── */
  .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: center; z-index: 999; padding: 24px; }
  .modal { background: var(--surface); border: 1px solid var(--border); border-radius: 14px; padding: 32px; max-width: 480px; width: 100%; }
  .modal-title { font-family: 'Syne', sans-serif; font-size: 18px; font-weight: 700; margin-bottom: 12px; }
  .modal-body { color: var(--muted); font-size: 14px; margin-bottom: 24px; }
  .modal-actions { display: flex; gap: 10px; justify-content: flex-end; }

  /* ── EMPTY STATE ── */
  .empty-state { padding: 48px; text-align: center; color: var(--muted); }
  .empty-icon  { font-size: 40px; margin-bottom: 12px; }
  .empty-title { font-size: 15px; font-weight: 500; margin-bottom: 4px; color: var(--text); }
  .empty-sub   { font-size: 13px; }

  /* ── MISC ── */
  .live-time { font-family: 'Syne', sans-serif; font-size: 13px; color: var(--muted); }
  .demo-note {
    background: rgba(247,192,79,0.08); border: 1px solid rgba(247,192,79,0.2);
    border-radius: 8px; padding: 10px 14px; font-size: 12.5px; color: var(--accent2); margin-bottom: 20px;
  }
`;

export default css;
