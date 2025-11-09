export function formatDate(iso) {
  if (!iso) return '';
  return new Date(iso).toLocaleString();
}