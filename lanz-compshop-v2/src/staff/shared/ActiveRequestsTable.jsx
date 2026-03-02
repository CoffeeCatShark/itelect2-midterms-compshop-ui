// staff/shared/ActiveRequestsTable.jsx
// Displays requests that are currently marked active.
// Used in both the Admin "Active Table Display" and the Employee dashboard.

import { useState } from "react";
import ConfirmModal from "../../components/ConfirmModal";
import { formatTime, formatDate } from "../../utils/helpers";

export default function ActiveRequestsTable({
  requests,
  active,
  setRequests,
  setActive,
  showDeleteBtn = true,
}) {
  const [confirm, setConfirm] = useState(null);

  const activeRows = active
    .map((a) => {
      const req = requests.find((r) => r.requestId === a.requestId);
      return req ? { ...req, activeIndex: a.activeIndex } : null;
    })
    .filter(Boolean)
    .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

  const doDelete = (row) => {
    setActive((prev) => prev.filter((a) => a.activeIndex !== row.activeIndex));
    setRequests((prev) => prev.filter((r) => r.requestIndex !== row.requestIndex));
    setConfirm(null);
  };

  const colSpan = showDeleteBtn ? 5 : 4;

  return (
    <>
      {confirm && (
        <ConfirmModal
          title="Delete Active Request"
          body={`Remove active request for "${confirm.customerName}" (${confirm.serviceType})?`}
          onConfirm={() => doDelete(confirm)}
          onCancel={() => setConfirm(null)}
        />
      )}

      <div className="table-wrap">
        <div className="table-toolbar">
          <span className="table-title">Active Requests</span>
          <span className="badge badge-active">{activeRows.length} active</span>
        </div>

        <table>
          <thead>
            <tr>
              <th>Service Type</th>
              <th>Customer Name</th>
              <th>Date</th>
              <th>Time</th>
              {showDeleteBtn && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {activeRows.length === 0 ? (
              <tr>
                <td colSpan={colSpan} style={{ padding: 0 }}>
                  <div className="empty-state">
                    <div className="empty-icon">📭</div>
                    <div className="empty-title">No active requests</div>
                    <div className="empty-sub">All clear!</div>
                  </div>
                </td>
              </tr>
            ) : (
              activeRows.map((r) => (
                <tr key={r.activeIndex}>
                  <td>{r.serviceType}</td>
                  <td>{r.customerName}</td>
                  <td className="td-muted">{formatDate(r.timestamp)}</td>
                  <td className="td-muted">{formatTime(r.timestamp)}</td>
                  {showDeleteBtn && (
                    <td>
                      <button
                        className="btn btn-danger-ghost btn-sm"
                        onClick={() => setConfirm(r)}
                      >
                        🗑 Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
