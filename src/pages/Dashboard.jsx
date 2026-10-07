import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { DollarSign, Percent, ShoppingBag, Users } from 'lucide-react';
import StatCard from '../components/StatCard';
import StatusBadge from '../components/StatusBadge';
import { kpis, monthlyRevenue, orders, PRODUCTS, salesByCategory, weeklyVisitors } from '../data/mockData';
import { formatCompact, formatNaira, formatNairaCompact } from '../utils/format';

const COLORS = ['#4f46e5', '#06b6d4', '#f59e0b', '#ec4899', '#10b981'];

export default function Dashboard() {
  const k = kpis();
  const lowStock = PRODUCTS.filter((p) => p.stock < 20);

  return (
    <>
      <div className="page-title">
        <div>
          <h1>Dashboard</h1>
          <p className="muted">Welcome back! Here's how your store is doing this month.</p>
        </div>
      </div>

      <section className="stats">
        <StatCard label="Revenue (Oct)" value={formatNairaCompact(k.revenue.value)} current={k.revenue.value} previous={k.revenue.previous} icon={DollarSign} color="#4f46e5" />
        <StatCard label="Orders" value={formatCompact(k.orders.value)} current={k.orders.value} previous={k.orders.previous} icon={ShoppingBag} color="#06b6d4" />
        <StatCard label="Customers" value={formatCompact(k.customers.value)} current={k.customers.value} previous={k.customers.previous} icon={Users} color="#10b981" />
        <StatCard label="Conversion rate" value={`${k.conversion.value}%`} current={k.conversion.value} previous={k.conversion.previous} icon={Percent} color="#f59e0b" />
      </section>

      <section className="grid-2">
        <div className="card chart-card wide">
          <div className="card-head">
            <h3>Revenue vs expenses</h3>
            <span className="muted">Last 12 months</span>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={monthlyRevenue} margin={{ left: 0, right: 10, top: 10 }}>
              <defs>
                <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4f46e5" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#4f46e5" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="exp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--grid)" vertical={false} />
              <XAxis dataKey="month" stroke="var(--muted)" tickLine={false} axisLine={false} />
              <YAxis stroke="var(--muted)" tickFormatter={formatNairaCompact} tickLine={false} axisLine={false} width={60} />
              <Tooltip formatter={(v) => formatNaira(v)} contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 10 }} />
              <Legend />
              <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#4f46e5" strokeWidth={2.5} fill="url(#rev)" />
              <Area type="monotone" dataKey="expenses" name="Expenses" stroke="#06b6d4" strokeWidth={2} fill="url(#exp)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card chart-card">
          <div className="card-head">
            <h3>Sales by category</h3>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={salesByCategory} dataKey="value" nameKey="name" innerRadius={62} outerRadius={100} paddingAngle={3}>
                {salesByCategory.map((entry, i) => (
                  <Cell key={entry.name} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => formatNaira(v)} contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 10 }} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="grid-2">
        <div className="card chart-card">
          <div className="card-head">
            <h3>Visitors this week</h3>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={weeklyVisitors}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--grid)" vertical={false} />
              <XAxis dataKey="day" stroke="var(--muted)" tickLine={false} axisLine={false} />
              <YAxis stroke="var(--muted)" tickLine={false} axisLine={false} width={48} />
              <Tooltip contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 10 }} />
              <Legend />
              <Bar dataKey="mobile" name="Mobile" fill="#4f46e5" radius={[6, 6, 0, 0]} />
              <Bar dataKey="desktop" name="Desktop" fill="#a5b4fc" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card wide">
          <div className="card-head">
            <h3>Recent orders</h3>
            <a href="#/orders">View all</a>
          </div>
          <table className="compact">
            <thead>
              <tr>
                <th>Order</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 6).map((o) => (
                <tr key={o.id}>
                  <td>{o.id}</td>
                  <td>
                    {o.customer}
                    <div className="muted small">{o.city}</div>
                  </td>
                  <td>{formatNaira(o.amount)}</td>
                  <td>
                    <StatusBadge status={o.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {lowStock.length > 0 && (
            <p className="alert">
              ⚠️ Low stock: {lowStock.map((p) => `${p.name} (${p.stock})`).join(', ')}
            </p>
          )}
        </div>
      </section>
    </>
  );
}
