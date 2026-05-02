// staff/shared/RequestTableDisplay.jsx
// Admin view: searchable table of all requests with ability to
// mark pending requests as active or delete them.
import axios from 'axios'
import { useState } from "react";
import ConfirmModal from "../../components/ConfirmModal";
import { formatTime, formatDate, genId } from "../../utils/helpers";

export default function RequestTableDisplay({
  requests,
  active,
  setRequests,
  setActive,
}) {
  const [search, setSearch]   = useState("");
  const [confirm, setConfirm] = useState(null);

  const filtered = requests
    .filter((r) =>
      `${r.serviceType}${r.customerName}${r.timestamp}`
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

 const doDelete = (r) => {
  axios.delete(`http://localhost:3000/requests/${r.id}`)
    .then(() => {
      setActive(prev => prev.filter(a => a.requestId !== r.id));
      setRequests(prev => prev.filter(x => x.id !== r.id));
      setConfirm(null);
    })
    .catch(err => console.log(err))
};

const makeActive = (r) => {
  if (!active.find((a) => a.requestId === r.id)) {
    axios.post('http://localhost:3000/active', { requestId: r.id })
      .then(res => setActive(prev => [...prev, res.data]))
      .catch(err => console.log(err))
  }
};

  return (
    <>
      {confirm && (
        <ConfirmModal
          title="Delete Request"
          body={`Delete request from "${confirm.customerName}"?`}
          onConfirm={() => doDelete(confirm)}
          onCancel={() => setConfirm(null)}
        />
      )}

      <div className="table-wrap">
        <div className="table-toolbar">
          <span className="table-title">Service Requests</span>
          <input
            className="search-input"
            placeholder="Search requests…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <table>
          <thead>
            <tr>
              <th>Service Type</th>
              <th>Customer Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: 0 }}>
                  <div className="empty-state">
                    <div className="empty-icon">🔍</div>
                    <div className="empty-title">No requests found</div>
                  </div>
                </td>
              </tr>
            ) : (
              filtered.map((r) => {
                const isActive = active.find((a) => a.requestId === r.id);
                return (
                  <tr key={r.requestIndex}>
                    <td>{r.serviceType}</td>
                    <td>{r.customerName}</td>
                    <td className="td-muted">{formatDate(r.timestamp)}</td>
                    <td className="td-muted">{formatTime(r.timestamp)}</td>
                    <td>
                      {isActive ? (
                        <span className="badge badge-active">Active</span>
                      ) : (
                        <span
                          className="badge"
                          style={{ background: "rgba(107,115,148,0.15)", color: "var(--muted)" }}
                        >
                          Pending
                        </span>
                      )}
                    </td>
                    <td style={{ display: "flex", gap: 6 }}>
                      {!isActive && (
                        <button
                          className="btn btn-success-ghost btn-sm"
                          onClick={() => makeActive(r)}
                        >
                          ▶ Set Active
                        </button>
                      )}
                      <button
                        className="btn btn-danger-ghost btn-sm"
                        onClick={() => setConfirm(r)}
                      >
                        🗑
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
