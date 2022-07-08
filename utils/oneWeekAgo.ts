/**
 * Get one week ago date in format YYYY-MM-DD
 */
export function oneWeekAgo(): string {
  const date = new Date();
  date.setDate(date.getDate() - 7);
  return date.toISOString().split("T")[0];
}
