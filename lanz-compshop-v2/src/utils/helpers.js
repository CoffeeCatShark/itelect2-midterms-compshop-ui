// ─── SHARED UTILITY HELPERS ───────────────────────────────────────────────────

let nextId = 100;
export const genId = () => {
  const current = parseInt(localStorage.getItem("cs_next_id") || "100");
  const next = current + 1;
  localStorage.setItem("cs_next_id", next);
  return next;
};

export const formatTime = (ts) =>
  new Date(ts).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

export const formatDate = (ts) =>
  new Date(ts).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

export const getServiceIcon = (type) => {
  const t = type.toLowerCase();
  if (t.includes("print"))   return "🖨️";
  if (t.includes("typ"))     return "⌨️";
  if (t.includes("passport"))return "🛂";
  if (t.includes("repair"))  return "🔧";
  if (t.includes("clean"))   return "🧹";
  return "💻";
};
