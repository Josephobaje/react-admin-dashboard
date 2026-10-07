import { filterRows, paginate, sortRows } from './table';
import { formatNaira, formatNairaCompact, percentChange } from './format';

const rows = [
  { id: 1, name: 'Aisha', city: 'Kano', amount: 300 },
  { id: 2, name: 'Tunde', city: 'Lagos', amount: 100 },
  { id: 3, name: 'chinedu', city: 'Enugu', amount: 200 },
];

describe('table helpers', () => {
  it('filters case-insensitively across keys', () => {
    expect(filterRows(rows, 'LAG', ['name', 'city']).map((r) => r.id)).toEqual([2]);
    expect(filterRows(rows, '  ', ['name'])).toBe(rows);
  });

  it('sorts numbers and strings in both directions without mutating', () => {
    expect(sortRows(rows, 'amount', 'asc').map((r) => r.id)).toEqual([2, 3, 1]);
    expect(sortRows(rows, 'name', 'desc').map((r) => r.id)).toEqual([2, 3, 1]);
    expect(rows[0].id).toBe(1);
  });

  it('paginates and clamps the page', () => {
    expect(paginate(rows, 2, 2)).toEqual({ pages: 2, page: 2, items: [rows[2]] });
    expect(paginate(rows, 99, 2).page).toBe(2);
    expect(paginate([], 1, 5)).toEqual({ pages: 1, page: 1, items: [] });
  });
});

describe('formatters', () => {
  it('formats naira', () => {
    expect(formatNaira(1500000)).toMatch(/₦\s?1,500,000/);
    expect(formatNairaCompact(4_250_000)).toBe('₦4.3M');
  });

  it('computes percentage change', () => {
    expect(percentChange(110, 100)).toBe(10);
    expect(percentChange(90, 100)).toBe(-10);
    expect(percentChange(5, 0)).toBe(0);
  });
});
