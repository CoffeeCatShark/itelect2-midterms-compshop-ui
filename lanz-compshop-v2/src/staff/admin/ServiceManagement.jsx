// staff/admin/ServiceManagement.jsx
import { useState } from "react";
import axios from "axios";                    // ← add this
import ConfirmModal from "../../components/ConfirmModal";

export default function ServiceManagement({ services, setServices }) {
  const [confirm, setConfirm] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing]   = useState(null);
  const [form, setForm]         = useState({ serviceType: "" });
  const [alert, setAlert]       = useState(null);

  const openAdd = () => {
    setForm({ serviceType: "" });
    setEditing(null);
    setFormOpen(true);
  };

  const openEdit = (s) => {
    setForm({ serviceType: s.serviceType });
    setEditing(s);
    setFormOpen(true);
  };

  const save = () => {
    if (!form.serviceType) return;

    if (editing) {
      axios.put(`http://localhost:3000/services/${editing.id}`, {
        serviceType: form.serviceType
      })
      .then(res => {
        setServices(prev => prev.map(s => s.id === res.data.id ? res.data : s));
        setAlert({ type: "success", msg: "Service updated." });
        setFormOpen(false);
      })
      .catch(err => console.log(err))
    } else {
      axios.post('http://localhost:3000/services', {
        serviceType: form.serviceType
      })
      .then(res => {
        setServices(prev => [...prev, res.data]);
        setAlert({ type: "success", msg: "Service added." });
        setFormOpen(false);
      })
      .catch(err => console.log(err))
    }
  };

  const doDelete = (s) => {
    axios.delete(`http://localhost:3000/services/${s.id}`)
      .then(() => {
        setServices(prev => prev.filter(x => x.id !== s.id));
        setAlert({ type: "success", msg: `Service "${s.serviceType}" deleted.` });
        setConfirm(null);
      })
      .catch(err => console.log(err))
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

      {formOpen && (
        <div className="form-card" style={{ marginBottom: 24 }}>
          <div className="table-title" style={{ marginBottom: 20 }}>
            {editing ? "✏️ Edit Service" : "➕ Add New Service"}
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
          <div className="form-actions">
            <button className="btn btn-primary" onClick={save}>💾 Save</button>
            <button className="btn btn-ghost" onClick={() => setFormOpen(false)}>Cancel</button>
          </div>
        </div>
      )}

      <div className="table-wrap">
        <div className="table-toolbar">
          <span className="table-title">Services</span>
          <button className="btn btn-primary btn-sm" onClick={openAdd}>➕ Add Service</button>
        </div>

        <table>
          <thead>
            <tr><th>ID</th><th>Service Type</th><th>Actions</th></tr>
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
                <tr key={s.id}>                          {/* ← s.serviceIndex → s.id */}
                  <td className="td-muted">{s.id}</td>  {/* ← s.serviceId → s.id */}
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