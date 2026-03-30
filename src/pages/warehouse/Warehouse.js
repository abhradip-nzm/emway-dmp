import React, { useState } from 'react';
import { PageHeader, Card, Badge, DataTable, Btn, SearchBar, StatCard, Modal, FormField, Input, Select, Section, ProgressBar } from '../../components/common/Common';
import { skuInventory, warehouseZones } from '../../data/mockData';
import { Package, AlertTriangle, CheckCircle2, ScanLine, Plus, RefreshCw, BarChart2 } from 'lucide-react';
import './Warehouse.css';

function StockBadge({ status }) {
  const map = { healthy: ['success','Healthy'], low: ['warning','Low Stock'], out: ['danger','Out of Stock'] };
  const [type, label] = map[status] || ['neutral', status];
  return <Badge type={type}>{label}</Badge>;
}

export default function Warehouse() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [view, setView] = useState('sku'); // 'sku' | 'zone'
  const [showAdjustModal, setShowAdjustModal] = useState(false);
  const [showCycleModal, setShowCycleModal] = useState(false);
  const [selectedSKU, setSelectedSKU] = useState(null);

  const filtered = skuInventory.filter(s => {
    const m = s.sku.toLowerCase().includes(search.toLowerCase()) ||
      s.product.toLowerCase().includes(search.toLowerCase()) ||
      s.brand.toLowerCase().includes(search.toLowerCase());
    const f = filter === 'all' || s.status === filter;
    return m && f;
  });

  return (
    <div className="warehouse-page fade-in">
      <PageHeader
        title="Warehouse & Inventory"
        subtitle="Real-time stock levels across all warehouse zones and store locations"
        actions={
          <>
            <Btn variant="outline" icon={RefreshCw}>Cycle Count</Btn>
            <Btn variant="outline" icon={ScanLine}>Scan Movement</Btn>
            <Btn variant="primary" icon={Plus} onClick={() => setShowAdjustModal(true)}>Add SKU</Btn>
          </>
        }
      />

      {/* KPI Row */}
      <div className="grid-4 mb-24">
        <StatCard label="Total SKUs" value={skuInventory.length} icon={Package} color="primary" />
        <StatCard label="Healthy Stock" value={skuInventory.filter(s => s.status === 'healthy').length} icon={CheckCircle2} color="success" />
        <StatCard label="Low Stock" value={skuInventory.filter(s => s.status === 'low').length} icon={AlertTriangle} color="warning" />
        <StatCard label="Out of Stock" value={skuInventory.filter(s => s.status === 'out').length} icon={AlertTriangle} color="danger" />
      </div>

      {/* Zone Overview */}
      <Section title="Warehouse Zone Capacity">
        <div className="zone-grid">
          {warehouseZones.map(z => (
            <Card key={z.zone} className="zone-card">
              <div className="zone-header">
                <div className="zone-badge">Zone {z.zone}</div>
                <span className="zone-capacity-pct">{z.capacity}%</span>
              </div>
              <div className="zone-desc">{z.description}</div>
              <ProgressBar value={z.capacity} max={100} color={z.capacity > 85 ? 'warning' : 'primary'} />
              <div className="zone-meta">{z.locations} storage locations</div>
            </Card>
          ))}
        </div>
      </Section>

      {/* SKU Table */}
      <Card noPad>
        <div className="table-toolbar">
          <SearchBar value={search} onChange={setSearch} placeholder="Search SKU, product, brand..." />
          <div className="filter-tabs">
            {['all','healthy','low','out'].map(f => (
              <button key={f} className={`filter-tab ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
                {f === 'all' ? 'All Stock' : f === 'low' ? 'Low Stock' : f === 'out' ? 'Out of Stock' : 'Healthy'}
              </button>
            ))}
          </div>
        </div>
        <DataTable
          columns={[
            { key: 'sku', label: 'SKU', render: v => <span className="sku-code-cell">{v}</span> },
            { key: 'product', label: 'Product' },
            { key: 'brand', label: 'Brand' },
            { key: 'location', label: 'Location' },
            { key: 'stock', label: 'On Hand' },
            { key: 'reserved', label: 'Reserved' },
            { key: 'available', label: 'Available', render: v => <strong style={{ color: v === 0 ? 'var(--danger)' : v < 20 ? 'var(--warning)' : 'var(--success)' }}>{v}</strong> },
            { key: 'reorderPoint', label: 'Reorder Point' },
            { key: 'status', label: 'Status', render: v => <StockBadge status={v} /> },
            { key: 'sku', label: '', render: (v, row) => (
              <Btn size="sm" variant="ghost" onClick={() => { setSelectedSKU(row); setShowAdjustModal(true); }}>Adjust</Btn>
            )},
          ]}
          data={filtered}
          emptyText="No SKUs match your filter"
        />
      </Card>

      {/* Stock Adjustment Modal */}
      <Modal open={showAdjustModal} onClose={() => { setShowAdjustModal(false); setSelectedSKU(null); }}
        title={selectedSKU ? `Adjust Stock — ${selectedSKU.sku}` : 'Add New SKU'}>
        {selectedSKU ? (
          <div>
            <div className="receive-po-info">
              <div className="receive-info-row"><span>Product</span><strong>{selectedSKU.product}</strong></div>
              <div className="receive-info-row"><span>Current Stock</span><strong>{selectedSKU.stock} units</strong></div>
              <div className="receive-info-row"><span>Location</span><strong>{selectedSKU.location}</strong></div>
            </div>
            <div className="form-grid">
              <FormField label="Adjustment Type">
                <Select value="" onChange={() => {}} options={[
                  { value: 'add', label: 'Add Stock' },
                  { value: 'remove', label: 'Remove Stock' },
                  { value: 'set', label: 'Set Exact Count' },
                ]} />
              </FormField>
              <FormField label="Quantity"><Input type="number" placeholder="0" value="" onChange={() => {}} /></FormField>
              <FormField label="Reason">
                <Select value="" onChange={() => {}} options={[
                  { value: 'cycle_count', label: 'Cycle Count Correction' },
                  { value: 'damage', label: 'Damaged / Write-off' },
                  { value: 'found', label: 'Found Stock' },
                  { value: 'transfer', label: 'Location Transfer' },
                ]} />
              </FormField>
              <FormField label="Notes"><Input placeholder="Optional notes..." value="" onChange={() => {}} /></FormField>
            </div>
            <div className="modal-footer">
              <Btn variant="outline" onClick={() => { setShowAdjustModal(false); setSelectedSKU(null); }}>Cancel</Btn>
              <Btn variant="primary" onClick={() => { setShowAdjustModal(false); setSelectedSKU(null); }}>Apply Adjustment</Btn>
            </div>
          </div>
        ) : (
          <div>
            <div className="form-grid">
              <FormField label="SKU Code" required><Input placeholder="e.g. LEG-CLASS-XX" value="" onChange={() => {}} /></FormField>
              <FormField label="Product Name" required><Input placeholder="Full product name" value="" onChange={() => {}} /></FormField>
              <FormField label="Brand" required><Input placeholder="Brand name" value="" onChange={() => {}} /></FormField>
              <FormField label="Barcode"><Input placeholder="Scan or enter barcode" value="" onChange={() => {}} /></FormField>
              <FormField label="Warehouse Zone">
                <Select value="" onChange={() => {}} options={warehouseZones.map(z => ({ value: z.zone, label: `Zone ${z.zone} — ${z.description}` }))} />
              </FormField>
              <FormField label="Storage Location"><Input placeholder="e.g. A-01-03" value="" onChange={() => {}} /></FormField>
              <FormField label="Opening Stock"><Input type="number" placeholder="0" value="" onChange={() => {}} /></FormField>
              <FormField label="Reorder Point"><Input type="number" placeholder="0" value="" onChange={() => {}} /></FormField>
            </div>
            <div className="modal-footer">
              <Btn variant="outline" onClick={() => setShowAdjustModal(false)}>Cancel</Btn>
              <Btn variant="primary" onClick={() => setShowAdjustModal(false)}>Create SKU</Btn>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
