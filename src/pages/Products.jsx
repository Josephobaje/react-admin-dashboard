import DataTable from '../components/DataTable';
import { PRODUCTS } from '../data/mockData';
import { formatNaira } from '../utils/format';

export default function Products() {
  return (
    <>
      <div className="page-title">
        <div>
          <h1>Products</h1>
          <p className="muted">Inventory with low-stock highlighting.</p>
        </div>
      </div>
      <DataTable
        title="Inventory"
        rows={PRODUCTS}
        searchKeys={['id', 'name', 'category']}
        columns={[
          { key: 'id', label: 'SKU' },
          { key: 'name', label: 'Product' },
          { key: 'category', label: 'Category' },
          { key: 'price', label: 'Price', render: (v) => formatNaira(v) },
          {
            key: 'stock',
            label: 'Stock',
            render: (v) => <span className={v < 20 ? 'badge badge-cancelled' : 'badge badge-delivered'}>{v < 20 ? `Low · ${v}` : v}</span>,
          },
        ]}
      />
    </>
  );
}
