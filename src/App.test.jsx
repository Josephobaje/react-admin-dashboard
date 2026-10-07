import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

beforeEach(() => {
  window.location.hash = '#/';
  localStorage.clear();
});

describe('Admin dashboard', () => {
  it('renders KPI cards and recent orders', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: 'Dashboard' })).toBeInTheDocument();
    expect(screen.getByText('Revenue (Oct)')).toBeInTheDocument();
    expect(screen.getByText('Recent orders')).toBeInTheDocument();
  });

  it('toggles dark mode and remembers it', async () => {
    render(<App />);
    const before = document.documentElement.dataset.theme;
    await userEvent.click(screen.getByRole('button', { name: /switch to/i }));
    const after = document.documentElement.dataset.theme;
    expect(after).not.toBe(before);
    expect(localStorage.getItem('jo-dashboard-theme')).toBe(after);
  });

  it('navigates to orders, filters by status and searches', async () => {
    render(<App />);
    await userEvent.click(screen.getByRole('link', { name: /orders/i }));
    expect(screen.getByRole('heading', { name: 'Orders' })).toBeInTheDocument();

    await userEvent.click(screen.getByRole('tab', { name: 'Cancelled' }));
    const table = screen.getByRole('table');
    const statuses = within(table).getAllByText(/Delivered|Shipped|Processing|Pending|Cancelled/).map((el) => el.textContent);
    expect(statuses.every((s) => s === 'Cancelled')).toBe(true);

    await userEvent.type(screen.getByLabelText('Search All orders'), 'zzz-no-match');
    expect(screen.getByText(/No results for/)).toBeInTheDocument();
  });

  it('sorts customers by total spent', async () => {
    window.location.hash = '#/customers';
    render(<App />);
    await userEvent.click(screen.getByRole('button', { name: /total spent/i }));
    await userEvent.click(screen.getByRole('button', { name: /total spent/i }));
    const cells = screen.getAllByRole('row').slice(1).map((r) => within(r).getAllByRole('cell')[3].textContent);
    const values = cells.map((c) => Number(c.replace(/[^\d]/g, '')));
    expect(values).toEqual([...values].sort((a, b) => b - a));
  });
});
