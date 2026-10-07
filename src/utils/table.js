/** Pure helpers for filtering, sorting and paginating table rows (easy to unit test). */

export function filterRows(rows, query, keys) {
  const q = query.trim().toLowerCase();
  if (!q) return rows;
  return rows.filter((row) => keys.some((k) => String(row[k] ?? '').toLowerCase().includes(q)));
}

export function sortRows(rows, key, direction = 'asc') {
  if (!key) return rows;
  const dir = direction === 'asc' ? 1 : -1;
  return [...rows].sort((a, b) => {
    const x = a[key];
    const y = b[key];
    if (typeof x === 'number' && typeof y === 'number') return (x - y) * dir;
    return String(x).localeCompare(String(y)) * dir;
  });
}

export function paginate(rows, page, pageSize) {
  const pages = Math.max(1, Math.ceil(rows.length / pageSize));
  const current = Math.min(Math.max(1, page), pages);
  return { pages, page: current, items: rows.slice((current - 1) * pageSize, current * pageSize) };
}
