// components/LiveTime.jsx
// Shows a continuously-updated clock in the staff dashboard header.

import { useState, useEffect } from "react";

export default function LiveTime() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <span className="live-time">
      {time.toLocaleDateString("en-US", {
        weekday: "long", year: "numeric", month: "long", day: "numeric",
      })}
      {" · "}
      {time.toLocaleTimeString("en-US", {
        hour: "2-digit", minute: "2-digit", second: "2-digit",
      })}
    </span>
  );
}
