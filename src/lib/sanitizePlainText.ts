export function sanitizePlainText(value: string): string {
  return value
    .replace(/[\0-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "")
    .replace(/<[^>]*>/g, "")
    .trim();
}
