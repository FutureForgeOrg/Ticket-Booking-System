export function availabilityMetaBadge(available: number, total: number) {
  if (!total)
    return { label: "N/A", cls: "text-text-muted bg-surface border-border" };

  const pct = (available / total) * 100;

  if (pct <= 20) {
    return {
      label: "Fast filling",
      cls: "text-primary bg-primary-soft border-primary/30",
    };
  }

  return {
    label: "Available",
    cls: "text-secondary-DEFAULT bg-secondary-soft border-secondary/30",
  };
}
