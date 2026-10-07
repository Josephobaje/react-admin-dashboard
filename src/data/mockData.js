// Deterministic mock data so the dashboard looks the same on every load.
function mulberry32(seed) {
  return function rand() {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = mulberry32(2026);
const pick = (arr) => arr[Math.floor(rand() * arr.length)];
const between = (min, max) => Math.round(min + rand() * (max - min));

const FIRST = ['Chinedu', 'Aisha', 'Tunde', 'Ngozi', 'Emeka', 'Fatima', 'Ojonugwa', 'Amina', 'Ifeanyi', 'Zainab', 'Kelechi', 'Bola', 'Halima', 'Segun', 'Adaeze', 'Musa'];
const LAST = ['Okafor', 'Bello', 'Adebayo', 'Eze', 'Obaje', 'Musa', 'Okoro', 'Abubakar', 'Adeyemi', 'Idoko', 'Nwosu', 'Yusuf', 'Balogun', 'Ibrahim'];
const CITIES = ['Lagos', 'Abuja', 'Port Harcourt', 'Kano', 'Ibadan', 'Enugu', 'Kaduna', 'Benin City', 'Jos', 'Lokoja'];

export const PRODUCTS = [
  { id: 'P-101', name: 'Wireless Earbuds Pro', category: 'Electronics', price: 38500, stock: 64 },
  { id: 'P-102', name: 'Ankara Print Dress', category: 'Fashion', price: 24000, stock: 120 },
  { id: 'P-103', name: 'Smart Watch S2', category: 'Electronics', price: 72000, stock: 18 },
  { id: 'P-104', name: 'Shea Butter Set', category: 'Beauty', price: 9500, stock: 210 },
  { id: 'P-105', name: 'Non-stick Pot Set', category: 'Home', price: 45000, stock: 7 },
  { id: 'P-106', name: 'Leather Sandals', category: 'Fashion', price: 18500, stock: 75 },
  { id: 'P-107', name: 'Power Bank 20,000mAh', category: 'Electronics', price: 21000, stock: 4 },
  { id: 'P-108', name: 'Standing Fan 18"', category: 'Home', price: 52000, stock: 33 },
  { id: 'P-109', name: 'Hair Growth Oil', category: 'Beauty', price: 7000, stock: 150 },
  { id: 'P-110', name: 'Kids Backpack', category: 'Kids', price: 12500, stock: 58 },
];

const STATUSES = ['Delivered', 'Delivered', 'Delivered', 'Shipped', 'Processing', 'Pending', 'Cancelled'];
const CHANNELS = ['Card', 'Bank transfer', 'USSD', 'Pay on delivery'];

export const customers = Array.from({ length: 48 }, (_, i) => {
  const first = pick(FIRST);
  const last = pick(LAST);
  return {
    id: `C-${1001 + i}`,
    name: `${first} ${last}`,
    email: `${first}.${last}${i}@example.com`.toLowerCase(),
    city: pick(CITIES),
    orders: between(1, 24),
    spent: between(15, 900) * 1000,
    joined: new Date(2025, between(0, 11), between(1, 28)).toISOString(),
  };
});

export const orders = Array.from({ length: 86 }, (_, i) => {
  const product = pick(PRODUCTS);
  const qty = between(1, 4);
  const customer = pick(customers);
  return {
    id: `#ORD-${(5420 - i).toString()}`,
    customer: customer.name,
    city: customer.city,
    product: product.name,
    category: product.category,
    amount: product.price * qty,
    status: pick(STATUSES),
    channel: pick(CHANNELS),
    date: new Date(2026, 9, 7 - Math.floor(i / 3), between(8, 20), between(0, 59)).toISOString(),
  };
});

const MONTHS = ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
export const monthlyRevenue = MONTHS.map((month, i) => {
  const base = 4_200_000 + i * 380_000;
  return {
    month,
    revenue: base + between(-600_000, 900_000),
    expenses: Math.round(base * 0.58) + between(-300_000, 300_000),
    orders: 180 + i * 14 + between(-25, 30),
  };
});

export const weeklyVisitors = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => ({
  day,
  desktop: between(900, 2200),
  mobile: between(2000, 4800),
}));

export const salesByCategory = ['Electronics', 'Fashion', 'Home', 'Beauty', 'Kids'].map((name) => ({
  name,
  value: orders.filter((o) => o.category === name).reduce((sum, o) => sum + o.amount, 0),
}));

export function kpis() {
  const last = monthlyRevenue.at(-1);
  const prev = monthlyRevenue.at(-2);
  return {
    revenue: { value: last.revenue, previous: prev.revenue },
    orders: { value: last.orders, previous: prev.orders },
    customers: { value: customers.length * 31, previous: customers.length * 29 },
    conversion: { value: 3.8, previous: 3.4 },
  };
}
