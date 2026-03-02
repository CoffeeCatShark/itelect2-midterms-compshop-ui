// staff/admin/ServiceManagement.jsx
// Admin can add, edit, and delete services offered to customers.

import { useState } from "react";
import ConfirmModal from "../../components/ConfirmModal";
import { genId } from "../../utils/helpers";

export default function ServiceManagement({ services, setServices }) {
  const [confirm, setConfirm] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing]   = useState(null);
  const [form, setForm]         = useState({ serviceId: "", serviceType: "" });
  const [alert, setAlert]       = useState(null);

  const openAdd = () => {
    setForm({ serviceId: "", serviceType: "" });
    setEditing(null);
    setFormOpen(true);
  };

  const openEdit = (s) => {
    setForm({ serviceId: String(s.serviceId), serviceType: s.serviceType });
    setEditing(s);
    setFormOpen(true);
  };

  const save = () => {
    if (!form.serviceId || !form.serviceType) return;
    if (editing) {
      setServices((prev) =>
        prev.map((s) =>
          s.serviceIndex === editing.serviceIndex
            ? { ...s, serviceId: parseInt(form.serviceId), serviceType: form.serviceType }
            : s
        )
      );
      setAlert({ type: "success", msg: "Service updated." });
    } else {
      setServices((prev) => [
        ...prev,
        { serviceIndex: genId(), serviceId: parseInt(form.serviceId), serviceType: form.serviceType },
      ]);
      setAlert({ type: "success", msg: "Service added." });
    }
    setFormOpen(false);
  };

  const doDelete = (s) => {
    setServices((prev) => prev.filter((x) => x.serviceIndex !== s.serviceIndex));
    setAlert({ type: "success", msg: `Service "${s.serviceType}" deleted.` });
    setConfirm(null);
  };

  return (
    <>
      {confirm && (
        <ConfirmModal
          title="Delete Service"
          body={`Delete "${confirm.serviceType}"? This may affect existing requests.`}
          onConfirm={() => doDelete(confirm)}
          onCancel={() => setConfirm(null)}
        />
      )}

      {alert && (
        <div className={`alert alert-${alert.type}`}>
          {alert.msg}
          <button
            style={{ float: "right", background: "none", border: "none", cursor: "pointer", color: "inherit" }}
            onClick={() => setAlert(null)}
          >
            ✕
          </button>
        </div>
      )}

      {/* Add / Edit form */}
      {formOpen && (
        <div className="form-card" style={{ marginBottom: 24 }}>
          <div className="table-title" style={{ marginBottom: 20 }}>
            {editing ? "✏️ Edit Service" : "➕ Add New Service"}
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Service ID</label>
              <input
                className="form-input"
                type="number"
                placeholder="e.g. 105"
                value={form.serviceId}
                onChange={(e) => setForm((p) => ({ ...p, serviceId: e.target.value }))}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Service Type</label>
              <input
                className="form-input"
                placeholder="e.g. Printing"
                value={form.serviceType}
                onChange={(e) => setForm((p) => ({ ...p, serviceType: e.target.value }))}
              />
            </div>
          </div>
          <div className="form-actions">
            <button className="btn btn-primary" onClick={save}>💾 Save</button>
            <button className="btn btn-ghost" onClick={() => setFormOpen(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="table-wrap">
        <div className="table-toolbar">
          <span className="table-title">Services</span>
          <button className="btn btn-primary btn-sm" onClick={openAdd}>➕ Add Service</button>
        </div>

        <table>
          <thead>
            <tr><th>Service ID</th><th>Service Type</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {services.length === 0 ? (
              <tr>
                <td colSpan={3} style={{ padding: 0 }}>
                  <div className="empty-state">
                    <div className="empty-icon">⚙️</div>
                    <div className="empty-title">No services yet</div>
                  </div>
                </td>
              </tr>
            ) : (
              services.map((s) => (
                <tr key={s.serviceIndex}>
                  <td className="td-muted">{s.serviceId}</td>
                  <td>{s.serviceType}</td>
                  <td style={{ display: "flex", gap: 6 }}>
                    <button className="btn btn-ghost btn-sm" onClick={() => openEdit(s)}>✏️ Edit</button>
                    <button className="btn btn-danger-ghost btn-sm" onClick={() => setConfirm(s)}>🗑 Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
