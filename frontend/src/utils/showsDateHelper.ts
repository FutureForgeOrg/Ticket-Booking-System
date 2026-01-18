
// local day key like "2026-01-17"
export function toLocalDayKey(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

// create a local Date from dayKey (00:00 local)
export function fromLocalDayKey(dayKey: string) {
  const [y, m, d] = dayKey.split("-").map(Number);
  return new Date(y, m - 1, d, 0, 0, 0, 0); // local midnight
}

// convert local dayKey to ISO range (send to backend)
export function localDayKeyToIsoRange(dayKey: string) {
  const start = fromLocalDayKey(dayKey);
  const end = new Date(start);
  end.setHours(23, 59, 59, 999);

  return {
    startISO: start.toISOString(),
    endISO: end.toISOString(),
  };
}

// UI formatting (local time)
export function formatLocalTime(iso: string) {
  return new Intl.DateTimeFormat("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

// UI formatting for tabs
export function makeNextDaysTabs(count: number) {
  const base = new Date();
  base.setHours(0, 0, 0, 0);

  return Array.from({ length: count }, (_, i) => {
    const d = new Date(base);
    d.setDate(base.getDate() + i);

    const parts = new Intl.DateTimeFormat("en-IN", {
      weekday: "short",
      month: "short",
      day: "2-digit",
    }).formatToParts(d);

    return {
      key: toLocalDayKey(d),
      date: d,
      dow: (parts.find(p => p.type === "weekday")?.value ?? "").toUpperCase(),
      day: parts.find(p => p.type === "day")?.value ?? "",
      mon: (parts.find(p => p.type === "month")?.value ?? "").toUpperCase(),
    };
  });
}
