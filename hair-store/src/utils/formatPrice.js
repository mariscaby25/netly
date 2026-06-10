/**
 * Format a number as GHS currency
 * @param {number} amount
 * @returns {string}
 */
export function formatPrice(amount) {
  if (amount == null) return "";
  return `GH₵ ${Number(amount).toLocaleString("en-GH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

/**
 * Calculate discount percentage
 */
export function discountPercent(original, current) {
  if (!original || original <= current) return 0;
  return Math.round(((original - current) / original) * 100);
}
