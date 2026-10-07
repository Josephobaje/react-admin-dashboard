import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { BarChart3, Bell, LayoutDashboard, Menu, Moon, Package, Search, Settings, ShoppingCart, Sun, Users } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const NAV = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/orders', label: 'Orders', icon: ShoppingCart },
  { to: '/customers', label: 'Customers', icon: Users },
  { to: '/products', label: 'Products', icon: Package },
  { to: '/settings', label: 'Settings', icon: Settings },
];

export default function Layout() {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <div className="app">
      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <div className="brand">
          <BarChart3 size={26} />
          <span>ShopPulse</span>
        </div>
        <nav>
          {NAV.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end} onClick={() => setOpen(false)} className={({ isActive }) => (isActive ? 'active' : '')}>
              <Icon size={18} /> {label}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-card">
          <strong>Need a custom dashboard?</strong>
          <p>Built with React, Vite and Recharts.</p>
        </div>
      </aside>
      {open && <div className="backdrop" onClick={() => setOpen(false)} />}

      <div className="main">
        <header className="topbar">
          <button className="icon-btn menu-btn" aria-label="Open menu" onClick={() => setOpen(true)}>
            <Menu size={20} />
          </button>
          <label className="search">
            <Search size={16} />
            <input placeholder="Search anything..." aria-label="Global search" />
          </label>
          <div className="topbar-actions">
            <button className="icon-btn" aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`} onClick={toggle}>
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button className="icon-btn" aria-label="Notifications">
              <Bell size={18} />
              <span className="dot" />
            </button>
            <div className="avatar" title="Admin">JO</div>
          </div>
        </header>
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
