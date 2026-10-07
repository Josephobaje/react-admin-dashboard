import { TrendingDown, TrendingUp } from 'lucide-react';
import { percentChange } from '../utils/format';

export default function StatCard({ label, value, current, previous, icon: Icon, color }) {
  const change = percentChange(current, previous);
  const up = change >= 0;
  return (
    <div className="card stat">
      <div className="stat-icon" style={{ background: `${color}22`, color }}>
        <Icon size={22} />
      </div>
      <div>
        <p className="muted">{label}</p>
        <h3>{value}</h3>
        <span className={`trend ${up ? 'up' : 'down'}`}>
          {up ? <TrendingUp size={14} /> : <TrendingDown size={14} />} {up ? '+' : ''}
          {change}% <span className="muted">vs last month</span>
        </span>
      </div>
    </div>
  );
}
