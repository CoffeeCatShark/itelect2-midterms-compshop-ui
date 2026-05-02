// staff/admin/ManageRoles.jsx
// Lists all employee accounts and allows an admin to promote
// any of them to the "admin" role.
import axios from 'axios'
import { useState } from "react";
import ConfirmModal from "../../components/ConfirmModal";
import { formatDate } from "../../utils/helpers";

export default function ManageRoles({ users, setUsers }) {
  const [confirm, setConfirm] = useState(null);
  const [alert, setAlert]     = useState(null);

  const employees = users.filter((u) => u.role === "employee");

 const promote = (u) => {
  axios.put(`http://localhost:3000/users/${u.id}`, { ...u, role: "admin" })
    .then(res => {
      setUsers(prev => prev.map(x => x.id === res.data.id ? res.data : x));
      setAlert({ type: "success", msg: `${u.username} has been promoted to Admin.` });
      setConfirm(null);
    })
    .catch(err => console.log(err))
};

  return (
    <>
      {confirm && (
        <ConfirmModal
          title="Promote to Admin"
          body={`Promote "${confirm.username}" to Administrator? This grants full system access.`}
          onConfirm={() => promote(confirm)}
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

      <div className="table-wrap">
        <div className="table-toolbar">
          <span className="table-title">Employee Accounts</span>
          <span style={{ fontSize: 12, color: "var(--muted)" }}>{employees.length} employees</span>
        </div>

        <table>
          <thead>
            <tr>
              <th>ID</th><th>Username</th><th>Email</th><th>Created</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: 0 }}>
                  <div className="empty-state">
                    <div className="empty-icon">👤</div>
                    <div className="empty-title">No employee accounts</div>
                    <div className="empty-sub">All registered users are already admins</div>
                  </div>
                </td>
              </tr>
            ) : (
              employees.map((u) => (
                <tr key={u.id}>
                  <td className="td-muted">#{u.id}</td>
                  <td>{u.username}</td>
                  <td className="td-muted">{u.email}</td>
                  <td className="td-muted">{formatDate(u.createdAt)}</td>
                  <td>
                    <button
                      className="btn btn-success-ghost btn-sm"
                      onClick={() => setConfirm(u)}
                    >
                      ⬆ Promote to Admin
                    </button>
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
