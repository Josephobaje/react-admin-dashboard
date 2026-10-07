import { useMemo, useState } from 'react';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import { filterRows, paginate, sortRows } from '../utils/table';

/**
 * Generic table with search, column sorting and pagination.
 * columns: [{ key, label, render?, sortable? }]
 */
export default function DataTable({ title, rows, columns, searchKeys, pageSize = 8, actions }) {
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState({ key: null, dir: 'asc' });
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => filterRows(rows, query, searchKeys), [rows, query, searchKeys]);
  const sorted = useMemo(() => sortRows(filtered, sort.key, sort.dir), [filtered, sort]);
  const view = paginate(sorted, page, pageSize);

  const toggleSort = (key) => {
    setSort((s) => (s.key === key ? { key, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: 'asc' }));
  };

  return (
    <div className="card table-card">
      <div className="table-head">
        <h3>{title}</h3>
        <div className="table-tools">
          {actions}
          <label className="search small">
            <Search size={14} />
            <input
              aria-label={`Search ${title}`}
              placeholder="Search..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
            />
          </label>
        </div>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              {columns.map((c) => (
                <th key={c.key}>
                  {c.sortable === false ? (
                    c.label
                  ) : (
                    <button className="th-btn" onClick={() => toggleSort(c.key)}>
                      {c.label}
                      {sort.key === c.key && (sort.dir === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
                    </button>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {view.items.map((row) => (
              <tr key={row.id}>
                {columns.map((c) => (
                  <td key={c.key}>{c.render ? c.render(row[c.key], row) : row[c.key]}</td>
                ))}
              </tr>
            ))}
            {view.items.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="empty">
                  No results for “{query}”
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="pager">
        <span className="muted">
          {sorted.length} result{sorted.length === 1 ? '' : 's'} · page {view.page} of {view.pages}
        </span>
        <div>
          <button disabled={view.page <= 1} onClick={() => setPage(view.page - 1)}>
            Previous
          </button>
          <button disabled={view.page >= view.pages} onClick={() => setPage(view.page + 1)}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
