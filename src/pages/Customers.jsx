import DataTable from '../components/DataTable';
import { customers } from '../data/mockData';
import { formatDate, formatNaira } from '../utils/format';

export default function Customers() {
  return (
    <>
      <div className="page-title">
        <div>
          <h1>Customers</h1>
          <p className="muted">{customers.length} customers across Nigeria.</p>
        </div>
      </div>
      <DataTable
        title="Customer list"
        rows={customers}
        searchKeys={['name', 'email', 'city']}
        pageSize={10}
        columns={[
          {
            key: 'name',
            label: 'Name',
            render: (v, row) => (
              <div className="person">
                <span className="avatar sm">{v.split(' ').map((p) => p[0]).join('')}</span>
                <div>
                  {v}
                  <div className="muted small">{row.email}</div>
                </div>
              </div>
            ),
          },
          { key: 'city', label: 'City' },
          { key: 'orders', label: 'Orders' },
          { key: 'spent', label: 'Total spent', render: (v) => formatNaira(v) },
          { key: 'joined', label: 'Joined', render: (v) => formatDate(v) },
        ]}
      />
    </>
  );
}
