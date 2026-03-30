// ── INBOUND / PROCUREMENT ──────────────────────────────────────────────────
export const inboundShipments = [
  { id: 'PO-2024-0891', supplier: 'LEGO Group', sku: 'LEG-CLASS-42', product: 'LEGO Classic Large Box', expected: 400, received: 340, status: 'partial', date: '2025-03-28', eta: '2025-03-28' },
  { id: 'PO-2024-0892', supplier: 'Mattel Inc.', sku: 'MAT-HOT-007', product: 'Hot Wheels 50-Car Set', expected: 200, received: 200, status: 'complete', date: '2025-03-27', eta: '2025-03-27' },
  { id: 'PO-2024-0893', supplier: 'Spin Master', sku: 'SPM-PAW-001', product: 'PAW Patrol Lookout Tower', expected: 150, received: 0, status: 'pending', date: '2025-03-30', eta: '2025-03-30' },
  { id: 'PO-2024-0894', supplier: 'Hasbro', sku: 'HAS-NERF-12', product: 'Nerf Elite 2.0 Commander', expected: 300, received: 300, status: 'complete', date: '2025-03-26', eta: '2025-03-26' },
  { id: 'PO-2024-0895', supplier: 'Bandai Namco', sku: 'BAN-GUN-55', product: 'Gundam MG RX-78-2', expected: 80, received: 0, status: 'in_transit', date: '2025-04-02', eta: '2025-04-02' },
  { id: 'PO-2024-0896', supplier: 'LEGO Group', sku: 'LEG-CITY-88', product: 'LEGO City Police Station', expected: 120, received: 0, status: 'in_transit', date: '2025-04-03', eta: '2025-04-03' },
];

// ── INVENTORY / WAREHOUSE ─────────────────────────────────────────────────
export const skuInventory = [
  { sku: 'LEG-CLASS-42', product: 'LEGO Classic Large Box', brand: 'LEGO', zone: 'A-01', location: 'A-01-03', stock: 12, reserved: 4, available: 8, reorderPoint: 50, status: 'low' },
  { sku: 'MAT-HOT-007', product: 'Hot Wheels 50-Car Set', brand: 'Mattel', zone: 'B-02', location: 'B-02-07', stock: 248, reserved: 30, available: 218, reorderPoint: 80, status: 'healthy' },
  { sku: 'SPM-PAW-001', product: 'PAW Patrol Lookout Tower', brand: 'Spin Master', zone: 'C-01', location: 'C-01-02', stock: 0, reserved: 0, available: 0, reorderPoint: 40, status: 'out' },
  { sku: 'HAS-NERF-12', product: 'Nerf Elite 2.0 Commander', brand: 'Hasbro', zone: 'B-03', location: 'B-03-11', stock: 310, reserved: 45, available: 265, reorderPoint: 60, status: 'healthy' },
  { sku: 'BAN-GUN-55', product: 'Gundam MG RX-78-2', brand: 'Bandai', zone: 'D-02', location: 'D-02-04', stock: 34, reserved: 10, available: 24, reorderPoint: 30, status: 'healthy' },
  { sku: 'DIS-FRZ-008', product: 'Disney Frozen Elsa Doll', brand: 'Disney', zone: 'A-03', location: 'A-03-06', stock: 88, reserved: 22, available: 66, reorderPoint: 40, status: 'healthy' },
  { sku: 'MAT-BAR-XL1', product: 'Barbie Dreamhouse', brand: 'Mattel', zone: 'E-01', location: 'E-01-01', stock: 27, reserved: 5, available: 22, reorderPoint: 20, status: 'healthy' },
  { sku: 'LEG-CITY-88', product: 'LEGO City Police Station', brand: 'LEGO', zone: 'A-02', location: 'A-02-08', stock: 0, reserved: 0, available: 0, reorderPoint: 35, status: 'out' },
  { sku: 'WME-BAT-003', product: 'Batman Action Figure', brand: 'Warner Media', zone: 'C-03', location: 'C-03-09', stock: 156, reserved: 18, available: 138, reorderPoint: 50, status: 'healthy' },
  { sku: 'SPM-ZOM-22', product: 'Zomlings Series 7 Pack', brand: 'Spin Master', zone: 'D-01', location: 'D-01-05', stock: 42, reserved: 8, available: 34, reorderPoint: 60, status: 'low' },
];

export const warehouseZones = [
  { zone: 'A', description: 'Dolls & Figures', locations: 12, capacity: 85 },
  { zone: 'B', description: 'Vehicles & Sets', locations: 18, capacity: 72 },
  { zone: 'C', description: 'Character Toys', locations: 14, capacity: 91 },
  { zone: 'D', description: 'Collectibles', locations: 10, capacity: 58 },
  { zone: 'E', description: 'Large Format', locations: 8, capacity: 44 },
];

// ── ORDERS ─────────────────────────────────────────────────────────────────
export const orders = [
  { id: 'ORD-7821', channel: 'shopee', customer: 'Online Customer', items: 3, value: 142.50, status: 'dispatched', priority: 'normal', created: '2025-03-28 09:12', assigned: 'Kevin Ong' },
  { id: 'ORD-7822', channel: 'lazada', customer: 'Online Customer', items: 1, value: 48.90, status: 'picking', priority: 'high', created: '2025-03-28 09:45', assigned: 'Kevin Ong' },
  { id: 'ORD-7823', channel: 'partner_store', customer: 'Toys R Us Orchard', items: 120, value: 8400.00, status: 'pending', priority: 'high', created: '2025-03-28 10:00', assigned: null },
  { id: 'ORD-7824', channel: 'own_store', customer: 'Emway Tampines', items: 45, value: 3200.00, status: 'packing', priority: 'normal', created: '2025-03-28 10:15', assigned: 'Kevin Ong' },
  { id: 'ORD-7825', channel: 'shopee', customer: 'Online Customer', items: 2, value: 89.00, status: 'confirmed', priority: 'normal', created: '2025-03-28 10:30', assigned: null },
  { id: 'ORD-7826', channel: 'lazada', customer: 'Online Customer', items: 5, value: 210.00, status: 'confirmed', priority: 'normal', created: '2025-03-28 11:00', assigned: null },
  { id: 'ORD-7827', channel: 'partner_store', customer: 'PopMart Bugis', items: 60, value: 4200.00, status: 'pending', priority: 'normal', created: '2025-03-28 11:20', assigned: null },
  { id: 'ORD-7828', channel: 'own_store', customer: 'Emway Jewel', items: 30, value: 2100.00, status: 'dispatched', priority: 'normal', created: '2025-03-27 14:00', assigned: 'Kevin Ong' },
];

// ── RETURNS ────────────────────────────────────────────────────────────────
export const returns = [
  { id: 'RET-0192', orderId: 'ORD-7750', channel: 'partner_store', customer: 'Toys R Us Orchard', sku: 'LEG-CLASS-42', product: 'LEGO Classic Large Box', qty: 4, reason: 'Damaged packaging', condition: 'damaged', status: 'pending_finance', creditValue: 184.00, created: '2025-03-28 08:00' },
  { id: 'RET-0191', orderId: 'ORD-7731', channel: 'shopee', customer: 'Online Customer', sku: 'MAT-HOT-007', product: 'Hot Wheels 50-Car Set', qty: 1, reason: 'Wrong item sent', condition: 'good', status: 'restocked', creditValue: 28.90, created: '2025-03-27 15:30' },
  { id: 'RET-0190', orderId: 'ORD-7710', channel: 'lazada', customer: 'Online Customer', sku: 'DIS-FRZ-008', product: 'Disney Frozen Elsa Doll', qty: 2, reason: 'Customer changed mind', condition: 'good', status: 'approved', creditValue: 96.00, created: '2025-03-27 11:00' },
  { id: 'RET-0189', orderId: 'ORD-7698', channel: 'own_store', customer: 'Emway Tampines', sku: 'HAS-NERF-12', product: 'Nerf Elite 2.0 Commander', qty: 6, reason: 'Overstocked', condition: 'good', status: 'restocked', creditValue: 210.00, created: '2025-03-26 09:00' },
  { id: 'RET-0188', orderId: 'ORD-7680', channel: 'partner_store', customer: 'PopMart Bugis', sku: 'BAN-GUN-55', product: 'Gundam MG RX-78-2', qty: 2, reason: 'Defective product', condition: 'damaged', status: 'write_off', creditValue: 158.00, created: '2025-03-25 14:00' },
];

// ── DISPATCH / DELIVERY ────────────────────────────────────────────────────
export const deliveryRuns = [
  { id: 'RUN-0041', date: '2025-03-28', driver: 'Ahmad Razali', vehicle: 'SGX 1234A', orders: ['ORD-7821', 'ORD-7828'], status: 'completed', dispatched: '09:00', completed: '13:45' },
  { id: 'RUN-0042', date: '2025-03-28', driver: 'Tan Wei Ming', vehicle: 'SGX 5678B', orders: ['ORD-7824'], status: 'in_progress', dispatched: '11:00', completed: null },
  { id: 'RUN-0043', date: '2025-03-28', driver: 'Ravi Suresh', vehicle: 'SGX 9012C', orders: ['ORD-7823', 'ORD-7827'], status: 'scheduled', dispatched: null, completed: null },
  { id: 'RUN-0044', date: '2025-03-29', driver: null, vehicle: null, orders: ['ORD-7822', 'ORD-7825', 'ORD-7826'], status: 'draft', dispatched: null, completed: null },
];

// ── REPORTING / KPIs ───────────────────────────────────────────────────────
export const kpiData = {
  totalOrdersToday: 8,
  ordersGrowth: 12,
  fulfilmentRate: 94.2,
  fulfilmentGrowth: 2.1,
  totalRevenue: 28450,
  revenueGrowth: 8.4,
  returnRate: 3.8,
  returnGrowth: -0.5,
  lowStockCount: 2,
  outOfStockCount: 2,
  pendingInbound: 3,
  activeDeliveries: 2,
};

export const salesChartData = [
  { month: 'Oct', shopee: 4200, lazada: 2800, partner: 12000, ownStore: 6500 },
  { month: 'Nov', shopee: 5100, lazada: 3200, partner: 14200, ownStore: 7800 },
  { month: 'Dec', shopee: 8200, lazada: 5400, partner: 22000, ownStore: 12000 },
  { month: 'Jan', shopee: 4800, lazada: 3100, partner: 13500, ownStore: 7200 },
  { month: 'Feb', shopee: 5300, lazada: 3600, partner: 15800, ownStore: 8400 },
  { month: 'Mar', shopee: 6100, lazada: 4200, partner: 17200, ownStore: 9500 },
];

export const fulfilmentChartData = [
  { day: 'Mon', rate: 96 }, { day: 'Tue', rate: 94 }, { day: 'Wed', rate: 98 },
  { day: 'Thu', rate: 92 }, { day: 'Fri', rate: 95 }, { day: 'Sat', rate: 91 }, { day: 'Sun', rate: 97 },
];

// ── ADMIN / USERS ─────────────────────────────────────────────────────────
export const systemUsers = [
  { id: 1, name: 'Alex Tan', email: 'admin@emway.sg', role: 'system_admin', status: 'active', lastLogin: '2025-03-28 09:01' },
  { id: 2, name: 'Sarah Lim', email: 'procurement@emway.sg', role: 'procurement_officer', status: 'active', lastLogin: '2025-03-28 08:45' },
  { id: 3, name: 'David Ng', email: 'whmanager@emway.sg', role: 'warehouse_manager', status: 'active', lastLogin: '2025-03-28 07:30' },
  { id: 4, name: 'Kevin Ong', email: 'whstaff@emway.sg', role: 'warehouse_staff', status: 'active', lastLogin: '2025-03-28 07:15' },
  { id: 5, name: 'Priya Kumar', email: 'inventory@emway.sg', role: 'inventory_manager', status: 'active', lastLogin: '2025-03-28 08:00' },
  { id: 6, name: 'James Wong', email: 'sales@emway.sg', role: 'sales_order_manager', status: 'active', lastLogin: '2025-03-28 09:10' },
  { id: 7, name: 'Michelle Lee', email: 'logistics@emway.sg', role: 'logistics_dispatch', status: 'active', lastLogin: '2025-03-28 06:55' },
  { id: 8, name: 'Raymond Chua', email: 'finance@emway.sg', role: 'finance_billing', status: 'active', lastLogin: '2025-03-28 09:20' },
  { id: 9, name: 'Clara Ho', email: 'executive@emway.sg', role: 'management_executive', status: 'active', lastLogin: '2025-03-28 10:00' },
  { id: 10, name: 'Ben Koh', email: 'whstaff2@emway.sg', role: 'warehouse_staff', status: 'inactive', lastLogin: '2025-03-15 14:00' },
];

export const integrationStatus = [
  { name: 'SAP ERP', type: 'ETL Pipeline', status: 'connected', lastSync: '2025-03-28 10:45', records: '1,284 POs synced' },
  { name: 'Shopee Seller API', type: 'E-Commerce', status: 'connected', lastSync: '2025-03-28 10:50', records: '42 orders today' },
  { name: 'Lazada Seller API', type: 'E-Commerce', status: 'warning', lastSync: '2025-03-28 09:15', records: 'Retry pending' },
  { name: 'Data Lake', type: 'Storage Layer', status: 'connected', lastSync: '2025-03-28 10:51', records: '98.4GB used' },
];

export const auditLogs = [
  { id: 1, user: 'Kevin Ong', action: 'Stock received', detail: 'PO-2024-0891 — 340 units scanned in', time: '2025-03-28 10:30' },
  { id: 2, user: 'James Wong', action: 'Order confirmed', detail: 'ORD-7823 — 120 units for Toys R Us', time: '2025-03-28 10:00' },
  { id: 3, user: 'Michelle Lee', action: 'Run dispatched', detail: 'RUN-0042 — 1 order assigned to Tan Wei Ming', time: '2025-03-28 11:00' },
  { id: 4, user: 'Raymond Chua', action: 'Credit note approved', detail: 'RET-0190 — SGD 96.00 synced to SAP', time: '2025-03-28 09:45' },
  { id: 5, user: 'Alex Tan', action: 'User deactivated', detail: 'Ben Koh (whstaff2@emway.sg)', time: '2025-03-27 17:00' },
];
