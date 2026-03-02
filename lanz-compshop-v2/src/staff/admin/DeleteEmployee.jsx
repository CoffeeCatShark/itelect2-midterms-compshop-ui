// staff/admin/DeleteEmployee.jsx
// Allows an admin to permanently delete employee accounts.
// Admins cannot delete other admins or their own account.

import { useState } from "react";
import ConfirmModal from "../../components/ConfirmModal";
import { formatDate } from "../../utils/helpers";

export default function DeleteEmployee({ users, setUsers, currentUser }) {
  const [confirm, setConfirm] = useState(null);
  const [alert, setAlert]     = useState(null);

  const employees = users.filter((u) => u.role === "employee");

  const deleteUser = (u) => {
    if (u.id === currentUser.id) {
      setAlert({ type: "error", msg: "You cannot delete your own account!" });
      setConfirm(null);
      return;
    }
    setUsers((prev) => prev.filter((x) => x.id !== u.id));
    setAlert({ type: "success", msg: `Employee "${u.username}" has been deleted.` });
    setConfirm(null);
  };

  return (
    <>
      {confirm && (
        <ConfirmModal
          title="Delete Employee"
          body={`Permanently delete "${confirm.username}"? This cannot be undone.`}
          onConfirm={() => deleteUser(confirm)}
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
                    <div className="empty-icon">🗑️</div>
                    <div className="empty-title">No employees to delete</div>
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
                      className="btn btn-danger-ghost btn-sm"
                      onClick={() => setConfirm(u)}
                    >
                      🗑 Delete
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
