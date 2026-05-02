// customer/CustomerUI.jsx
import { useState } from "react";
import axios from "axios";                        // ← add this
import { TIME_SLOTS } from "../data/initialData";
import { getServiceIcon } from "../utils/helpers"; // ← remove genId, no longer needed

export default function CustomerUI({ services, requests, setRequests, active, setActive }) {
  const [view, setView]                       = useState("list");
  const [selectedService, setSelectedService] = useState(null);
  const [form, setForm]                       = useState({ name: "", date: "", time: "" });
  const [formError, setFormError]             = useState("");

  const today = new Date().toISOString().split("T")[0];

  // Build reserved slots from active requests
  const reservedSlots = active
    .map((a) => {
      const req = requests.find((r) => r.id === a.requestId); // ← r.requestId → r.id
      return req
        ? { date: req.timestamp.split("T")[0], time: req.timestamp.split("T")[1]?.slice(0, 5) }
        : null;
    })
    .filter(Boolean);

  const isReserved = (date, time) =>
    reservedSlots.some((r) => r.date === date && r.time === time);

  const selectService = (s) => {
    setSelectedService(s);
    setForm({ name: "", date: "", time: "" });
    setFormError("");
    setView("reserve");
  };

  const handleReserve = () => {
    setFormError("");
    if (!form.name.trim()) { setFormError("Please enter your full name."); return; }
    if (!form.date)        { setFormError("Please select a date.");        return; }
    if (!form.time)        { setFormError("Please select a time slot.");   return; }

    const newReq = {
      serviceType:  selectedService.serviceType,
      customerName: form.name.trim(),
      timestamp:    `${form.date}T${form.time}:00`,
      fileUpload:   null,
    };

    axios.post('http://localhost:3000/requests', newReq)
      .then(res => {
        setRequests(prev => [...prev, res.data]);
        return axios.post('http://localhost:3000/active', { requestId: res.data.id });
      })
      .then(res => {
        setActive(prev => [...prev, res.data]);
        setView("confirm");
      })
      .catch(err => console.log(err))
  };

  const resetToList = () => {
    setView("list");
    setForm({ name: "", date: "", time: "" });
    setSelectedService(null);
  };

  // ── Confirmation screen ───────────────────────────────────────────────────
  if (view === "confirm") {
    const slotLabel = TIME_SLOTS.find((t) => t.value === form.time)?.label ?? form.time;
    return (
      <div className="customer-wrap">
        <div style={{ maxWidth: 480, margin: "0 auto", textAlign: "center", paddingTop: 60 }}>
          <div style={{ fontSize: 64, marginBottom: 20 }}>✅</div>
          <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: 26, fontWeight: 700, marginBottom: 10, color: "var(--text)" }}>
            Reservation Confirmed!
          </h2>
          <p style={{ color: "var(--muted)", marginBottom: 8 }}>
            Service: <strong style={{ color: "var(--text)" }}>{selectedService?.serviceType}</strong>
          </p>
          <p style={{ color: "var(--muted)", marginBottom: 8 }}>
            Customer: <strong style={{ color: "var(--text)" }}>{form.name}</strong>
          </p>
          <p style={{ color: "var(--muted)", marginBottom: 28 }}>
            Time: <strong style={{ color: "var(--text)" }}>{form.date} at {slotLabel}</strong>
          </p>
          <button className="btn btn-primary" onClick={resetToList}>
            ← Back to Services
          </button>
        </div>
      </div>
    );
  }

  // ── Reservation form ──────────────────────────────────────────────────────
  if (view === "reserve" && selectedService) {
    return (
      <div className="customer-wrap">
        <div className="reservation-wrap">
          <div className="reservation-back" onClick={() => setView("list")}>
            ← Back to Services
          </div>
          <div className="reservation-title">
            Reserve — {selectedService.serviceType}
          </div>

          {formError && <div className="alert alert-error">{formError}</div>}

          <div className="form-card" style={{ maxWidth: "100%" }}>
            <div className="form-group">
              <label className="form-label">👤 Full Name</label>
              <input
                className="form-input"
                placeholder="Enter your full name"
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              />
            </div>

            <div className="form-group">
              <label className="form-label">📅 Select Date</label>
              <input
                className="form-input"
                type="date"
                min={today}
                value={form.date}
                onChange={(e) => setForm((p) => ({ ...p, date: e.target.value, time: "" }))}
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                🕐 Select Time Slot{" "}
                <span style={{ color: "var(--muted)", fontWeight: 400, textTransform: "none" }}>
                  (12:00 PM – 6:00 PM)
                </span>
              </label>
              <div className="time-grid">
                {TIME_SLOTS.map((t) => {
                  const reserved = form.date && isReserved(form.date, t.value);
                  const selected = form.time === t.value;
                  return (
                    <button
                      key={t.value}
                      className={["time-slot-btn", selected ? "selected" : "", reserved ? "reserved" : ""].join(" ")}
                      onClick={() => !reserved && setForm((p) => ({ ...p, time: t.value }))}
                    >
                      {t.label}
                      {reserved && <div style={{ fontSize: 10, marginTop: 2 }}>Reserved</div>}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">⚙️ Service Type</label>
              <input
                className="form-input"
                value={selectedService.serviceType}
                readOnly
                style={{ opacity: 0.7 }}
              />
            </div>

            <div className="form-actions">
              <button className="btn btn-primary" onClick={handleReserve}>
                ✅ Confirm Reservation
              </button>
              <button className="btn btn-ghost" onClick={() => setView("list")}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Service listing ───────────────────────────────────────────────────────
  return (
    <div className="customer-wrap">
      <div className="customer-header">
        <h1>Lanz Computer Shop</h1>
        <h2>Choose a service to reserve</h2>
      </div>

      {services.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">⚙️</div>
          <div className="empty-title">No services available</div>
        </div>
      ) : (
        <div className="service-grid">
          {services.map((s) => (
            <div className="service-card" key={s.id} onClick={() => selectService(s)}>  {/* ← s.serviceIndex → s.id */}
              <div className="svc-icon">{getServiceIcon(s.serviceType)}</div>
              <h3>{s.serviceType}</h3>
              <p>Service ID: {s.id}</p>                                                  {/* ← s.serviceId → s.id */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}