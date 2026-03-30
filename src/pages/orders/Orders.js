import React, { useState } from 'react';
import { PageHeader, Card, Badge, DataTable, Btn, SearchBar, StatCard, Modal, FormField, Input, Select, Section } from '../../components/common/Common';
import { orders } from '../../data/mockData';
import { ShoppingCart, Plus, AlertTriangle, CheckCircle2, Package, ScanLine, Clock } from 'lucide-react';
import './Orders.css';

function ChannelBadge({ channel }) {
  const map = { shopee: ['shopee','Shopee'], lazada: ['lazada','Lazada'], partner_store: ['partner','Partner Store'], own_store: ['own','Own Store'] };
  const [cls, label] = map[channel] || ['default', channel];
  return <span className={`tag tag-${cls}`}>{label}</span>;
}

function StatusBadge({ status }) {
  const map = {
    pending: ['neutral','Pending'], confirmed: ['info','Confirmed'],
    picking: ['warning','Picking'], packing: ['warning','Packing'],
    dispatched: ['success','Dispatched'], cancelled: ['danger','Cancelled'],
  };
  const [type, label] = map[status] || ['neutral', status];
  return <Badge type={type}>{label}</Badge>;
}

const ORDER_STEPS = ['Confirmed', 'Pick List Generated', 'Picking', 'Packing', 'Dispatched'];
const stepIndex = { confirmed: 0, picking: 2, packing: 3, dispatched: 4, pending: -1 };

function OrderTimeline({ status }) {
  const current = stepIndex[status] ?? 0;
  return (
    <div className="order-timeline">
      {ORDER_STEPS.map((step, i) => (
        <div key={step} className={`timeline-step ${i <= current ? 'done' : ''} ${i === current ? 'active' : ''}`}>
          <div className="timeline-dot" />
          <span>{step}</span>
          {i < ORDER_STEPS.length - 1 && <div className="timeline-line" />}
        </div>
      ))}
    </div>
  );
}

export default function Orders() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [showNewModal, setShowNewModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filtered = orders.filter(o => {
    const m = o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.toLowerCase().includes(search.toLowerCase());
    const f = filter === 'all' || o.status === filter;
    return m && f;
  });

  const handleRow = (row) => { setSelectedOrder(row); setShowDetailModal(true); };

  return (
    <div className="orders-page fade-in">
      <PageHeader
        title="Order Management & Fulfilment"
        subtitle="Unified order queue across Shopee, Lazada, partner stores, and own retail outlets"
        actions={
          <>
            <Btn variant="outline" icon={ScanLine}>Pick Mode</Btn>
            <Btn variant="primary" icon={Plus} onClick={() => setShowNewModal(true)}>New Order</Btn>
          </>
        }
      />

      <div className="grid-4 mb-24">
        <StatCard label="Total Orders" value={orders.length} icon={ShoppingCart} color="primary" />
        <StatCard label="Pending" value={orders.filter(o => o.status === 'pending').length} icon={Clock} color="warning" />
        <StatCard label="In Fulfilment" value={orders.filter(o => ['confirmed','picking','packing'].includes(o.status)).length} icon={Package} color="info" />
        <StatCard label="Dispatched" value={orders.filter(o => o.status === 'dispatched').length} icon={CheckCircle2} color="success" />
      </div>

      <Card noPad>
        <div className="table-toolbar">
          <SearchBar value={search} onChange={setSearch} placeholder="Search order ID, customer..." />
          <div className="filter-tabs">
            {['all','pending','confirmed','picking','packing','dispatched'].map(f => (
              <button key={f} className={`filter-tab ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
                {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <DataTable
          columns={[
            { key: 'id', label: 'Order ID', render: v => <span className="order-id">{v}</span> },
            { key: 'channel', label: 'Channel', render: v => <ChannelBadge channel={v} /> },
            { key: 'customer', label: 'Customer / Recipient' },
            { key: 'items', label: 'Items' },
            { key: 'value', label: 'Value', render: v => `SGD ${v.toFixed(2)}` },
            { key: 'priority', label: 'Priority', render: v => <Badge type={v === 'high' ? 'danger' : 'neutral'}>{v === 'high' ? '⚡ High' : 'Normal'}</Badge> },
            { key: 'created', label: 'Created' },
            { key: 'assigned', label: 'Assigned To', render: v => v || <span style={{ color: 'var(--text-muted)' }}>Unassigned</span> },
            { key: 'status', label: 'Status', render: v => <StatusBadge status={v} /> },
          ]}
          data={filtered}
          onRowClick={handleRow}
          emptyText="No orders match your search"
        />
      </Card>

      {/* Order Detail Modal */}
      <Modal open={showDetailModal} onClose={() => setShowDetailModal(false)} title={`Order Detail — ${selectedOrder?.id}`} width={640}>
        {selectedOrder && (
          <div>
            <div className="order-meta-row">
              <ChannelBadge channel={selectedOrder.channel} />
              <StatusBadge status={selectedOrder.status} />
              <Badge type={selectedOrder.priority === 'high' ? 'danger' : 'neutral'}>
                {selectedOrder.priority === 'high' ? '⚡ High Priority' : 'Normal Priority'}
              </Badge>
            </div>
            <OrderTimeline status={selectedOrder.status} />
            <div className="order-detail-grid">
              <div className="order-detail-card">
                <h4>Order Information</h4>
                <div className="detail-row"><span>Customer</span><strong>{selectedOrder.customer}</strong></div>
                <div className="detail-row"><span>Items</span><strong>{selectedOrder.items} units</strong></div>
                <div className="detail-row"><span>Order Value</span><strong>SGD {selectedOrder.value.toFixed(2)}</strong></div>
                <div className="detail-row"><span>Created</span><strong>{selectedOrder.created}</strong></div>
                <div className="detail-row"><span>Assigned To</span><strong>{selectedOrder.assigned || '—'}</strong></div>
              </div>
              <div className="order-actions-card">
                <h4>Actions</h4>
                <div className="action-list">
                  {selectedOrder.status === 'pending' && <Btn variant="primary" size="sm" icon={CheckCircle2}>Confirm Order</Btn>}
                  {selectedOrder.status === 'confirmed' && <Btn variant="primary" size="sm" icon={Package}>Generate Pick List</Btn>}
                  {selectedOrder.status === 'picking' && <Btn variant="primary" size="sm" icon={ScanLine}>Open Pick Scanner</Btn>}
                  {selectedOrder.status === 'packing' && <Btn variant="primary" size="sm" icon={Package}>Mark as Packed</Btn>}
                  <Btn variant="outline" size="sm">Edit Order</Btn>
                  <Btn variant="outline" size="sm">Print Pick List</Btn>
                  {!['dispatched','cancelled'].includes(selectedOrder.status) && <Btn variant="danger" size="sm">Cancel Order</Btn>}
                </div>
              </div>
            </div>
            <div className="pick-list-section">
              <h4>Pick List (Sample)</h4>
              <div className="pick-list-table">
                <div className="pick-list-header">
                  <span>SKU</span><span>Product</span><span>Qty</span><span>Location</span><span>Status</span>
                </div>
                <div className="pick-list-row">
                  <span className="sku-code-cell">MAT-HOT-007</span>
                  <span>Hot Wheels 50-Car Set</span>
                  <span>{Math.ceil(selectedOrder.items / 2)}</span>
                  <span>B-02-07</span>
                  <Badge type={selectedOrder.status === 'dispatched' ? 'success' : 'neutral'}>
                    {selectedOrder.status === 'dispatched' ? '✓ Picked' : 'Pending'}
                  </Badge>
                </div>
                <div className="pick-list-row">
                  <span className="sku-code-cell">DIS-FRZ-008</span>
                  <span>Disney Frozen Elsa Doll</span>
                  <span>{Math.floor(selectedOrder.items / 2)}</span>
                  <span>A-03-06</span>
                  <Badge type={selectedOrder.status === 'dispatched' ? 'success' : 'neutral'}>
                    {selectedOrder.status === 'dispatched' ? '✓ Picked' : 'Pending'}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* New Order Modal */}
      <Modal open={showNewModal} onClose={() => setShowNewModal(false)} title="Create New Order" width={580}>
        <div className="form-grid">
          <FormField label="Channel" required>
            <Select value="" onChange={() => {}} options={[
              { value: 'partner_store', label: 'Partner Store' },
              { value: 'own_store', label: 'Own Store' },
            ]} />
          </FormField>
          <FormField label="Customer / Store" required><Input placeholder="Customer or store name" value="" onChange={() => {}} /></FormField>
          <FormField label="Priority">
            <Select value="normal" onChange={() => {}} options={[{ value: 'normal', label: 'Normal' }, { value: 'high', label: '⚡ High' }]} />
          </FormField>
          <FormField label="Required by Date"><Input type="date" value="" onChange={() => {}} /></FormField>
        </div>
        <FormField label="Notes / Instructions"><Input placeholder="Special handling or delivery instructions..." value="" onChange={() => {}} /></FormField>
        <div className="modal-footer" style={{ marginTop: 20 }}>
          <Btn variant="outline" onClick={() => setShowNewModal(false)}>Cancel</Btn>
          <Btn variant="primary" onClick={() => setShowNewModal(false)}>Create Order</Btn>
        </div>
      </Modal>
    </div>
  );
}
