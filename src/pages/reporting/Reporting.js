import React, { useState } from 'react';
import { PageHeader, Card, StatCard, Section, Badge, ExportBtn, exportCSV } from '../../components/common/Common';
import { kpiData, salesChartData, fulfilmentChartData, skuInventory, returns, orders } from '../../data/mockData';
import { TrendingUp, ShoppingCart, RotateCcw, CheckCircle2, Package, BarChart3 } from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import './Reporting.css';

const CHANNEL_COLORS = { partner: '#2b206c', ownStore: '#ffa700', shopee: '#e85330', lazada: '#d6146a' };

const channelShare = [
  { name: 'Partner Stores', value: 17200, color: '#2b206c' },
  { name: 'Own Stores', value: 9500, color: '#ffa700' },
  { name: 'Shopee', value: 6100, color: '#e85330' },
  { name: 'Lazada', value: 4200, color: '#d6146a' },
];

const returnConditionData = [
  { name: 'Good Stock', value: 2, color: '#16a34a' },
  { name: 'Damaged', value: 2, color: '#dc2626' },
  { name: 'Clearance', value: 1, color: '#d97706' },
];

export default function Reporting() {
  const [dateRange, setDateRange] = useState('30d');

  return (
    <div className="reporting-page fade-in">
      <PageHeader
        title="Reports & Analytics"
        subtitle="Performance visibility across sales, inventory, fulfilment, and returns"
        actions={
          <div className="date-range-tabs">
            {['7d','30d','90d','YTD'].map(r => (
              <button key={r} className={`filter-tab ${dateRange === r ? 'active' : ''}`} onClick={() => setDateRange(r)}>{r}</button>
            ))}
          </div>
        }
      />

      {/* Top KPIs */}
      <div className="grid-4 mb-24">
        <StatCard label="Total Revenue (MTD)" value={`SGD ${kpiData.totalRevenue.toLocaleString()}`} icon={TrendingUp} color="secondary" trend={kpiData.revenueGrowth} sub="vs last month" />
        <StatCard label="Fulfilment Rate" value={`${kpiData.fulfilmentRate}%`} icon={CheckCircle2} color="success" trend={kpiData.fulfilmentGrowth} sub="7-day average" />
        <StatCard label="Return Rate" value={`${kpiData.returnRate}%`} icon={RotateCcw} color="info" trend={kpiData.returnGrowth} sub="last 30 days" />
        <StatCard label="Orders Today" value={kpiData.totalOrdersToday} icon={ShoppingCart} color="primary" trend={kpiData.ordersGrowth} sub="vs yesterday" />
      </div>

      {/* Sales Charts */}
      <div className="grid-2 mb-24">
        <Card>
          <div className="chart-header">
            <h3>Sales by Channel — Last 6 Months</h3>
            <ExportBtn
              columns={[{ key: 'month', label: 'Month' }, { key: 'partner', label: 'Partner Stores (SGD)' }, { key: 'ownStore', label: 'Own Stores (SGD)' }, { key: 'shopee', label: 'Shopee (SGD)' }, { key: 'lazada', label: 'Lazada (SGD)' }]}
              data={salesChartData}
              filename="sales-by-channel.csv"
            />
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={salesChartData} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
              <defs>
                {Object.entries(CHANNEL_COLORS).map(([key, color]) => (
                  <linearGradient key={key} id={`g-${key}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity={0.2} />
                    <stop offset="100%" stopColor={color} stopOpacity={0} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f1f8" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip formatter={v => `SGD ${v.toLocaleString()}`} />
              <Area type="monotone" dataKey="partner" stroke="#2b206c" fill="url(#g-partner)" strokeWidth={2} name="Partner Stores" />
              <Area type="monotone" dataKey="ownStore" stroke="#ffa700" fill="url(#g-ownStore)" strokeWidth={2} name="Own Stores" />
              <Area type="monotone" dataKey="shopee" stroke="#e85330" fill="url(#g-shopee)" strokeWidth={2} name="Shopee" />
              <Area type="monotone" dataKey="lazada" stroke="#d6146a" fill="url(#g-lazada)" strokeWidth={2} name="Lazada" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <div className="chart-header">
            <h3>Revenue Share by Channel</h3>
            <ExportBtn
              columns={[{ key: 'name', label: 'Channel' }, { key: 'value', label: 'Revenue (SGD)' }]}
              data={channelShare}
              filename="revenue-by-channel.csv"
            />
          </div>
          <div className="pie-wrapper">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={channelShare} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
                  {channelShare.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip formatter={v => `SGD ${v.toLocaleString()}`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="pie-legend">
              {channelShare.map(c => (
                <div key={c.name} className="pie-legend-item">
                  <span className="pie-dot" style={{ background: c.color }} />
                  <span className="pie-label">{c.name}</span>
                  <span className="pie-value">SGD {c.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Fulfilment + Inventory */}
      <div className="grid-2 mb-24">
        <Card>
          <div className="chart-header">
            <h3>Daily Fulfilment Rate — Last 7 Days</h3>
            <ExportBtn
              columns={[{ key: 'day', label: 'Day' }, { key: 'rate', label: 'Fulfilment Rate (%)' }]}
              data={fulfilmentChartData}
              filename="fulfilment-rate.csv"
            />
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={fulfilmentChartData} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f1f8" />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} />
              <YAxis domain={[85, 100]} tick={{ fontSize: 11 }} unit="%" />
              <Tooltip formatter={v => `${v}%`} />
              <Line type="monotone" dataKey="rate" stroke="#2b206c" strokeWidth={2.5} dot={{ fill: '#2b206c', r: 4 }} name="Fulfilment Rate" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <div className="chart-header"><h3>Inventory Status Overview</h3></div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart
              data={[
                { zone: 'Zone A', healthy: 3, low: 1, out: 1 },
                { zone: 'Zone B', healthy: 3, low: 0, out: 0 },
                { zone: 'Zone C', healthy: 2, low: 1, out: 0 },
                { zone: 'Zone D', healthy: 1, low: 1, out: 1 },
                { zone: 'Zone E', healthy: 1, low: 0, out: 0 },
              ]}
              margin={{ top: 4, right: 8, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f1f8" />
              <XAxis dataKey="zone" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="healthy" stackId="a" fill="#16a34a" name="Healthy" radius={[0,0,0,0]} />
              <Bar dataKey="low" stackId="a" fill="#d97706" name="Low" />
              <Bar dataKey="out" stackId="a" fill="#dc2626" name="Out of Stock" radius={[2,2,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Returns breakdown */}
      <div className="grid-2 mb-24">
        <Card>
          <div className="chart-header">
            <h3>Returns by Condition</h3>
            <ExportBtn
              columns={[{ key: 'name', label: 'Condition' }, { key: 'value', label: 'Count' }]}
              data={returnConditionData}
              filename="returns-by-condition.csv"
            />
          </div>
          <div className="pie-wrapper">
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={returnConditionData} cx="50%" cy="50%" outerRadius={75} paddingAngle={4} dataKey="value">
                  {returnConditionData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="pie-legend">
              {returnConditionData.map(c => (
                <div key={c.name} className="pie-legend-item">
                  <span className="pie-dot" style={{ background: c.color }} />
                  <span className="pie-label">{c.name}</span>
                  <span className="pie-value">{c.value} returns</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card>
          <div className="chart-header"><h3>Order Status Breakdown</h3></div>
          <div className="order-breakdown">
            {[
              { label: 'Dispatched', count: orders.filter(o => o.status === 'dispatched').length, color: 'success' },
              { label: 'In Fulfilment', count: orders.filter(o => ['picking','packing'].includes(o.status)).length, color: 'warning' },
              { label: 'Confirmed', count: orders.filter(o => o.status === 'confirmed').length, color: 'info' },
              { label: 'Pending', count: orders.filter(o => o.status === 'pending').length, color: 'neutral' },
            ].map(item => (
              <div key={item.label} className="breakdown-row">
                <span className="breakdown-label">{item.label}</span>
                <div className="breakdown-bar-wrapper">
                  <div className="breakdown-bar" style={{ width: `${(item.count / orders.length) * 100}%`, background: item.color === 'success' ? 'var(--success)' : item.color === 'warning' ? 'var(--warning)' : item.color === 'info' ? 'var(--info)' : 'var(--border)' }} />
                </div>
                <span className="breakdown-count">{item.count}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
