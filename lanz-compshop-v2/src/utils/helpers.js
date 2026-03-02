// ─── SHARED UTILITY HELPERS ───────────────────────────────────────────────────

let nextId = 100;
export const genId = () => ++nextId;

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
