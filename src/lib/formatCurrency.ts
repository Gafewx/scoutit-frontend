/**
 * Format a number as Thai Baht currency.
 * Example: formatCurrency(1299) → "฿1,299.00"
 */
export function formatCurrency(amount: number, locale = "th-TH"): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "THB",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format a discount percentage.
 * Example: discountPercent(1299, 1599) → 19
 */
export function discountPercent(price: number, comparePrice: number): number {
  if (!comparePrice || comparePrice <= price) return 0;
  return Math.round(((comparePrice - price) / comparePrice) * 100);
}
