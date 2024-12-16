export function isNotANumber(value: unknown): value is 'NaN' {
  return Number.isNaN(Number(value));
}
