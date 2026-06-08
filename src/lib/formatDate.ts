/**
 * Format an ISO date string for display.
 * Example: formatDate("2025-01-15T10:00:00Z") → "15 Jan 2025"
 */
export function formatDate(iso: string, locale = "en-GB"): string {
  return new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(iso));
}
