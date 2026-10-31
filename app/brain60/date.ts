/** "2026-10-31" → "31 ตุลาคม 2569" */
export function thaiDate(ymd: string) {
  return new Date(`${ymd}T00:00:00Z`).toLocaleDateString("th-TH", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
