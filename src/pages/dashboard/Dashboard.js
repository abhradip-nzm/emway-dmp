import React from 'react';
import { useApp, ROLES } from '../../context/AppContext';
import { PageHeader, StatCard, Card, Section, Badge, DataTable, ProgressBar } from '../../components/common/Common';
import {
  ShoppingCart, Package, TrendingUp, RotateCcw, Truck,
  AlertTriangle, PackageOpen, BarChart3, CheckCircle2
} from 'lucide-react';
import { kpiData, orders, inboundShipments, deliveryRuns, skuInventory, salesChartData } from '../../data/mockData';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts';
import './Dashboard.css';

// ── channel badge helper
function ChannelBadge({ channel }) {
  const map = {
    shopee: { label: 'Shopee', type: 'shopee' },
    lazada: { label: 'Lazada', type: 'lazada' },
    partner_store: { label: 'Partner', type: 'partner' },
    own_store: { label: 'Own Store', type: 'own' },
  };
  const c = map[channel] || { label: channel, type: 'default' };
  return <span className={`tag tag-${c.type}`}>{c.label}</span>;
}

function StatusBadge({ status }) {
  const map = {
    pending: ['neutral', 'Pending'],
    confirmed: ['info', 'Confirmed'],
    picking: ['warning', 'Picking'],
    packing: ['warning', 'Packing'],
    dispatched: ['success', 'Dispatched'],
    complete: ['success', 'Complete'],
    partial: ['warning', 'Partial'],
    in_transit: ['info', 'In Transit'],
    completed: ['success', 'Completed'],
    in_progress: ['warning', 'In Progress'],
    scheduled: ['info', 'Scheduled'],
    draft: ['neutral', 'Draft'],
  };
  const [type, label] = map[status] || ['neutral', status];
  return <Badge type={type}>{label}</Badge>;
}

// ── EXECUTIVE / MANAGEMENT DASHBOARD ─────────────────────────────────────
function ExecutiveDashboard() {
  return (
    <>
      <PageHeader title="Executive Overview" subtitle="High-level KPIs across all distribution operations" />
      <div className="grid-4 mb-24">
        <StatCard label="Orders Today" value={kpiData.totalOrdersToday} icon={ShoppingCart} color="primary" trend={kpiData.ordersGrowth} sub="vs yesterday" />
        <StatCard label="Fulfilment Rate" value={`${kpiData.fulfilmentRate}%`} icon={CheckCircle2} color="success" trend={kpiData.fulfilmentGrowth} sub="7-day avg" />
        <StatCard label="Revenue (MTD)" value={`SGD ${kpiData.totalRevenue.toLocaleString()}`} icon={TrendingUp} color="secondary" trend={kpiData.revenueGrowth} sub="vs last month" />
        <StatCard label="Return Rate" value={`${kpiData.returnRate}%`} icon={RotateCcw} color="info" trend={kpiData.returnGrowth} sub="last 30 days" />
      </div>
      <div className="grid-2 mb-24">
        <Card>
          <div className="chart-header"><h3>Sales by Channel (6 months)</h3></div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={salesChartData} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="shopeeG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#e85330" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#e85330" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="lazadaG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#d6146a" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#d6146a" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="partnerG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2b206c" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#2b206c" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f1f8" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip formatter={v => `SGD ${v.toLocaleString()}`} />
              <Area type="monotone" dataKey="partner" stroke="#2b206c" fill="url(#partnerG)" strokeWidth={2} name="Partner Stores" />
              <Area type="monotone" dataKey="ownStore" stroke="#ffa700" fill="none" strokeWidth={2} name="Own Stores" strokeDasharray="4 2" />
              <Area type="monotone" dataKey="shopee" stroke="#e85330" fill="url(#shopeeG)" strokeWidth={2} name="Shopee" />
              <Area type="monotone" dataKey="lazada" stroke="#d6146a" fill="url(#lazadaG)" strokeWidth={2} name="Lazada" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
        <Card>
          <div className="chart-header"><h3>Inventory Health</h3></div>
          <div className="inv-health-grid">
            <div className="inv-health-item healthy">
              <span className="inv-health-count">{skuInventory.filter(s => s.status === 'healthy').length}</span>
              <span className="inv-health-label">Healthy</span>
            </div>
            <div className="inv-health-item low">
              <span className="inv-health-count">{skuInventory.filter(s => s.status === 'low').length}</span>
              <span className="inv-health-label">Low Stock</span>
            </div>
            <div className="inv-health-item out">
              <span className="inv-health-count">{skuInventory.filter(s => s.status === 'out').length}</span>
              <span className="inv-health-label">Out of Stock</span>
            </div>
          </div>
          <div className="top-skus">
            <h4>Critical SKUs</h4>
            {skuInventory.filter(s => s.status !== 'healthy').map(s => (
              <div key={s.sku} className="sku-row">
                <div>
                  <div className="sku-name">{s.product}</div>
                  <div className="sku-code">{s.sku}</div>
                </div>
                <Badge type={s.status === 'out' ? 'danger' : 'warning'}>
                  {s.status === 'out' ? 'Out of Stock' : `${s.stock} left`}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}

// ── WAREHOUSE MANAGER DASHBOARD ───────────────────────────────────────────
function WarehouseManagerDashboard() {
  return (
    <>
      <PageHeader title="Warehouse Operations" subtitle="Today's warehouse activity at a glance" />
      <div className="grid-4 mb-24">
        <StatCard label="Active Orders" value={orders.filter(o => ['picking','packing'].includes(o.status)).length} icon={ShoppingCart} color="primary" />
        <StatCard label="Pending Inbound" value={inboundShipments.filter(s => s.status === 'pending').length} icon={PackageOpen} color="warning" />
        <StatCard label="Low Stock Alerts" value={kpiData.lowStockCount + kpiData.outOfStockCount} icon={AlertTriangle} color="danger" />
        <StatCard label="Deliveries Today" value={deliveryRuns.filter(r => r.date === '2025-03-28').length} icon={Truck} color="info" />
      </div>
      <div className="grid-2 mb-24">
        <Card>
          <Section title="Active Orders">
            {orders.filter(o => ['picking','packing','confirmed'].includes(o.status)).slice(0,5).map(o => (
              <div key={o.id} className="activity-row">
                <div>
                  <span className="activity-id">{o.id}</span>
                  <span className="activity-detail">{o.customer} · {o.items} items</span>
                </div>
                <StatusBadge status={o.status} />
              </div>
            ))}
          </Section>
        </Card>
        <Card>
          <Section title="Inventory Alerts">
            {skuInventory.filter(s => s.status !== 'healthy').map(s => (
              <div key={s.sku} className="activity-row">
                <div>
                  <span className="activity-id">{s.sku}</span>
                  <span className="activity-detail">{s.product}</span>
                </div>
                <Badge type={s.status === 'out' ? 'danger' : 'warning'}>
                  {s.status === 'out' ? 'Out of Stock' : `${s.stock} units`}
                </Badge>
              </div>
            ))}
          </Section>
        </Card>
      </div>
    </>
  );
}

// ── WAREHOUSE STAFF DASHBOARD ─────────────────────────────────────────────
function WarehouseStaffDashboard({ user }) {
  const myOrders = orders.filter(o => o.assigned === user?.name && ['picking','packing'].includes(o.status));
  return (
    <>
      <PageHeader title={`Good morning, ${user?.name?.split(' ')[0]}`} subtitle="Your assigned tasks for today" />
      <div className="grid-3 mb-24">
        <StatCard label="My Assigned Orders" value={myOrders.length} icon={ShoppingCart} color="primary" />
        <StatCard label="Pending Inbound" value={inboundShipments.filter(s => s.status === 'pending').length} icon={PackageOpen} color="warning" />
        <StatCard label="Returns to Process" value={2} icon={RotateCcw} color="info" />
      </div>
      <Card>
        <Section title="My Active Pick & Pack Tasks">
          {myOrders.length === 0 ? (
            <div className="empty-state"><p>No active tasks assigned to you.</p></div>
          ) : myOrders.map(o => (
            <div key={o.id} className="task-card">
              <div className="task-card-left">
                <span className="task-id">{o.id}</span>
                <span className="task-channel"><ChannelBadge channel={o.channel} /></span>
                <span className="task-items">{o.items} items to {o.status === 'picking' ? 'pick' : 'pack'}</span>
              </div>
              <StatusBadge status={o.status} />
            </div>
          ))}
        </Section>
      </Card>
    </>
  );
}

// ── PROCUREMENT DASHBOARD ─────────────────────────────────────────────────
function ProcurementDashboard() {
  return (
    <>
      <PageHeader title="Procurement Overview" subtitle="Inbound shipment status and purchase orders" />
      <div className="grid-4 mb-24">
        <StatCard label="Pending Arrival" value={inboundShipments.filter(s => s.status === 'pending').length} icon={PackageOpen} color="warning" />
        <StatCard label="In Transit" value={inboundShipments.filter(s => s.status === 'in_transit').length} icon={Truck} color="info" />
        <StatCard label="Received Today" value={inboundShipments.filter(s => s.status === 'complete').length} icon={CheckCircle2} color="success" />
        <StatCard label="Partial Receipts" value={inboundShipments.filter(s => s.status === 'partial').length} icon={AlertTriangle} color="danger" />
      </div>
      <Card noPad>
        <DataTable
          columns={[
            { key: 'id', label: 'PO Number' },
            { key: 'supplier', label: 'Supplier' },
            { key: 'product', label: 'Product' },
            { key: 'expected', label: 'Expected' },
            { key: 'received', label: 'Received' },
            { key: 'eta', label: 'ETA' },
            { key: 'status', label: 'Status', render: v => <StatusBadge status={v} /> },
          ]}
          data={inboundShipments}
        />
      </Card>
    </>
  );
}

// ── SALES DASHBOARD ───────────────────────────────────────────────────────
function SalesDashboard() {
  return (
    <>
      <PageHeader title="Order Management Overview" subtitle="Unified order queue across all sales channels" />
      <div className="grid-4 mb-24">
        <StatCard label="Total Orders" value={orders.length} icon={ShoppingCart} color="primary" />
        <StatCard label="Pending" value={orders.filter(o => o.status === 'pending').length} icon={AlertTriangle} color="warning" />
        <StatCard label="In Fulfilment" value={orders.filter(o => ['confirmed','picking','packing'].includes(o.status)).length} icon={Package} color="info" />
        <StatCard label="Dispatched" value={orders.filter(o => o.status === 'dispatched').length} icon={CheckCircle2} color="success" />
      </div>
      <Card noPad>
        <DataTable
          columns={[
            { key: 'id', label: 'Order ID' },
            { key: 'channel', label: 'Channel', render: v => <ChannelBadge channel={v} /> },
            { key: 'customer', label: 'Customer' },
            { key: 'items', label: 'Items' },
            { key: 'value', label: 'Value', render: v => `SGD ${v.toFixed(2)}` },
            { key: 'status', label: 'Status', render: v => <StatusBadge status={v} /> },
          ]}
          data={orders}
        />
      </Card>
    </>
  );
}

// ── LOGISTICS DASHBOARD ───────────────────────────────────────────────────
function LogisticsDashboard() {
  return (
    <>
      <PageHeader title="Dispatch & Delivery" subtitle="Today's delivery run status" />
      <div className="grid-4 mb-24">
        <StatCard label="Total Runs Today" value={deliveryRuns.filter(r => r.date === '2025-03-28').length} icon={Truck} color="primary" />
        <StatCard label="Completed" value={deliveryRuns.filter(r => r.status === 'completed').length} icon={CheckCircle2} color="success" />
        <StatCard label="In Progress" value={deliveryRuns.filter(r => r.status === 'in_progress').length} icon={Truck} color="warning" />
        <StatCard label="Scheduled" value={deliveryRuns.filter(r => r.status === 'scheduled').length} icon={Package} color="info" />
      </div>
      <Card noPad>
        <DataTable
          columns={[
            { key: 'id', label: 'Run ID' },
            { key: 'driver', label: 'Driver', render: v => v || '—' },
            { key: 'vehicle', label: 'Vehicle', render: v => v || '—' },
            { key: 'orders', label: 'Orders', render: v => `${v.length} orders` },
            { key: 'dispatched', label: 'Dispatched', render: v => v || '—' },
            { key: 'status', label: 'Status', render: v => <StatusBadge status={v} /> },
          ]}
          data={deliveryRuns}
        />
      </Card>
    </>
  );
}

// ── FINANCE DASHBOARD ─────────────────────────────────────────────────────
function FinanceDashboard() {
  const { returns } = require('../../data/mockData');
  return (
    <>
      <PageHeader title="Finance & Billing Overview" subtitle="Credit notes and financial reconciliation status" />
      <div className="grid-4 mb-24">
        <StatCard label="Pending Approvals" value={returns.filter(r => r.status === 'pending_finance').length} icon={AlertTriangle} color="warning" />
        <StatCard label="Credit Notes Issued" value={returns.filter(r => r.status === 'approved').length} icon={CheckCircle2} color="success" />
        <StatCard label="Total Returns Value" value={`SGD ${returns.reduce((a, r) => a + r.creditValue, 0).toFixed(2)}`} icon={RotateCcw} color="info" />
        <StatCard label="SAP Sync Status" value="Active" icon={TrendingUp} color="primary" />
      </div>
      <Card noPad>
        <DataTable
          columns={[
            { key: 'id', label: 'Return ID' },
            { key: 'orderId', label: 'Order Ref' },
            { key: 'customer', label: 'Customer' },
            { key: 'product', label: 'Product' },
            { key: 'creditValue', label: 'Credit Value', render: v => `SGD ${v.toFixed(2)}` },
            { key: 'status', label: 'Status', render: v => <StatusBadge status={v} /> },
          ]}
          data={returns}
        />
      </Card>
    </>
  );
}

// ── INVENTORY DASHBOARD ───────────────────────────────────────────────────
function InventoryDashboard() {
  return (
    <>
      <PageHeader title="Inventory Overview" subtitle="Real-time stock levels across all locations" />
      <div className="grid-4 mb-24">
        <StatCard label="Total SKUs" value={skuInventory.length} icon={Package} color="primary" />
        <StatCard label="Healthy" value={skuInventory.filter(s => s.status === 'healthy').length} icon={CheckCircle2} color="success" />
        <StatCard label="Low Stock" value={kpiData.lowStockCount} icon={AlertTriangle} color="warning" />
        <StatCard label="Out of Stock" value={kpiData.outOfStockCount} icon={AlertTriangle} color="danger" />
      </div>
      <Card noPad>
        <DataTable
          columns={[
            { key: 'sku', label: 'SKU' },
            { key: 'product', label: 'Product' },
            { key: 'zone', label: 'Zone' },
            { key: 'stock', label: 'On Hand' },
            { key: 'available', label: 'Available' },
            { key: 'reorderPoint', label: 'Reorder Point' },
            { key: 'status', label: 'Status', render: v => <Badge type={v === 'healthy' ? 'success' : v === 'low' ? 'warning' : 'danger'}>{v === 'out' ? 'Out of Stock' : v === 'low' ? 'Low Stock' : 'Healthy'}</Badge> },
          ]}
          data={skuInventory}
        />
      </Card>
    </>
  );
}

// ── MAIN DASHBOARD ────────────────────────────────────────────────────────
export default function Dashboard() {
  const { user } = useApp();
  const role = user?.role;

  if (role === ROLES.EXECUTIVE) return <ExecutiveDashboard />;
  if (role === ROLES.WH_MANAGER) return <WarehouseManagerDashboard />;
  if (role === ROLES.WH_STAFF) return <WarehouseStaffDashboard user={user} />;
  if (role === ROLES.PROCUREMENT) return <ProcurementDashboard />;
  if (role === ROLES.SALES) return <SalesDashboard />;
  if (role === ROLES.LOGISTICS) return <LogisticsDashboard />;
  if (role === ROLES.FINANCE) return <FinanceDashboard />;
  if (role === ROLES.INVENTORY) return <InventoryDashboard />;
  // Admin and default: show full overview
  return (
    <>
      <PageHeader title="Platform Overview" subtitle="System-wide operational summary — Administrator View" />
      <div className="grid-4 mb-24">
        <StatCard label="Orders Today" value={kpiData.totalOrdersToday} icon={ShoppingCart} color="primary" trend={kpiData.ordersGrowth} />
        <StatCard label="Fulfilment Rate" value={`${kpiData.fulfilmentRate}%`} icon={CheckCircle2} color="success" trend={kpiData.fulfilmentGrowth} />
        <StatCard label="Revenue (MTD)" value={`SGD ${kpiData.totalRevenue.toLocaleString()}`} icon={TrendingUp} color="secondary" trend={kpiData.revenueGrowth} />
        <StatCard label="Return Rate" value={`${kpiData.returnRate}%`} icon={RotateCcw} color="info" trend={kpiData.returnGrowth} />
      </div>
      <div className="grid-2 mb-24">
        <Card>
          <div className="chart-header"><h3>Sales by Channel</h3></div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={salesChartData} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f1f8" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip formatter={v => `SGD ${v.toLocaleString()}`} />
              <Bar dataKey="partner" fill="#2b206c" name="Partner" radius={[2,2,0,0]} />
              <Bar dataKey="shopee" fill="#e85330" name="Shopee" radius={[2,2,0,0]} />
              <Bar dataKey="lazada" fill="#d6146a" name="Lazada" radius={[2,2,0,0]} />
              <Bar dataKey="ownStore" fill="#ffa700" name="Own Store" radius={[2,2,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
        <Card>
          <Section title="Recent Orders">
            {orders.slice(0,5).map(o => (
              <div key={o.id} className="activity-row">
                <div>
                  <span className="activity-id">{o.id}</span>
                  <span className="activity-detail">{o.customer}</span>
                </div>
                <StatusBadge status={o.status} />
              </div>
            ))}
          </Section>
        </Card>
      </div>
    </>
  );
}
