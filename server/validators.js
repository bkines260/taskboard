const DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;

// Accepts a calendar date as 'YYYY-MM-DD' and rejects impossible dates like 2026-02-30.
function isValidDueDate(value) {
  if (typeof value !== 'string') {
    return false;
  }
  const match = DATE_PATTERN.exec(value);
  if (!match) {
    return false;
  }
  const [, year, month, day] = match.map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

module.exports = { isValidDueDate };
