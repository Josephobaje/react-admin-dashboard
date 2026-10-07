import { useMemo, useState } from 'react';
import DataTable from '../components/DataTable';
import StatusBadge from '../components/StatusBadge';
import { orders } from '../data/mockData';
import { formatDate, formatNaira } from '../utils/format';

const STATUSES = ['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

function toCsv(rows) {
  const header = ['id', 'customer', 'city', 'product', 'amount', 'status', 'channel', 'date'];
  const esc = (v) => `"${String(v).replace(/"/g, '""')}"`;
  return [header.join(','), ...rows.map((r) => header.map((h) => esc(r[h])).join(','))].join('\n');
}

export default function Orders() {
  const [status, setStatus] = useState('All');
  const rows = useMemo(() => (status === 'All' ? orders : orders.filter((o) => o.status === status)), [status]);

  const exportCsv = () => {
    const url = URL.createObjectURL(new Blob([toCsv(rows)], { type: 'text/csv' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = 'orders.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className="page-title">
        <div>
          <h1>Orders</h1>
          <p className="muted">Track, filter and export every order.</p>
        </div>
      </div>
      <div className="chips" role="tablist">
        {STATUSES.map((s) => (
          <button key={s} role="tab" aria-selected={status === s} className={status === s ? 'chip active' : 'chip'} onClick={() => setStatus(s)}>
            {s}
          </button>
        ))}
      </div>
      <DataTable
        title="All orders"
        rows={rows}
        searchKeys={['id', 'customer', 'product', 'city']}
        pageSize={10}
        actions={<button className="btn" onClick={exportCsv}>Export CSV</button>}
        columns={[
          { key: 'id', label: 'Order' },
          { key: 'customer', label: 'Customer' },
          { key: 'product', label: 'Product' },
          { key: 'amount', label: 'Amount', render: (v) => formatNaira(v) },
          { key: 'channel', label: 'Payment' },
          { key: 'status', label: 'Status', render: (v) => <StatusBadge status={v} /> },
          { key: 'date', label: 'Date', render: (v) => formatDate(v) },
        ]}
      />
    </>
  );
}
