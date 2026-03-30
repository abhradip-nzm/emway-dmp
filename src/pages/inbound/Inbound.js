import React, { useState } from 'react';
import { PageHeader, Card, Section, Badge, DataTable, Btn, SearchBar, Modal, FormField, Input, Select, StatCard } from '../../components/common/Common';
import { inboundShipments } from '../../data/mockData';
import { PackageOpen, CheckCircle2, AlertTriangle, Truck, Plus, ScanLine } from 'lucide-react';
import './Inbound.css';

const statusMap = {
  pending: ['neutral', 'Pending'],
  in_transit: ['info', 'In Transit'],
  partial: ['warning', 'Partial Receipt'],
  complete: ['success', 'Complete'],
};

function StatusBadge({ status }) {
  const [type, label] = statusMap[status] || ['neutral', status];
  return <Badge type={type}>{label}</Badge>;
}

export default function Inbound() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [showReceiveModal, setShowReceiveModal] = useState(false);
  const [selectedPO, setSelectedPO] = useState(null);
  const [scanned, setScanned] = useState('');

  const filtered = inboundShipments.filter(s => {
    const matchSearch = s.id.toLowerCase().includes(search.toLowerCase()) ||
      s.supplier.toLowerCase().includes(search.toLowerCase()) ||
      s.product.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || s.status === filter;
    return matchSearch && matchFilter;
  });

  const handleReceive = (row) => { setSelectedPO(row); setShowReceiveModal(true); };

  return (
    <div className="inbound-page fade-in">
      <PageHeader
        title="Inbound & Procurement"
        subtitle="Manage expected shipments and scan received stock against purchase orders"
        actions={
          <>
            <Btn variant="outline" icon={ScanLine} onClick={() => {}}>Scan Mode</Btn>
            <Btn variant="primary" icon={Plus} onClick={() => setShowModal(true)}>Log Expected Shipment</Btn>
          </>
        }
      />

      <div className="grid-4 mb-24">
        <StatCard label="Pending Arrival" value={inboundShipments.filter(s => s.status === 'pending').length} icon={PackageOpen} color="warning" />
        <StatCard label="In Transit" value={inboundShipments.filter(s => s.status === 'in_transit').length} icon={Truck} color="info" />
        <StatCard label="Received Today" value={inboundShipments.filter(s => s.status === 'complete').length} icon={CheckCircle2} color="success" />
        <StatCard label="Partial / Issues" value={inboundShipments.filter(s => s.status === 'partial').length} icon={AlertTriangle} color="danger" />
      </div>

      <Card noPad>
        <div className="table-toolbar">
          <SearchBar value={search} onChange={setSearch} placeholder="Search by PO, supplier, product..." />
          <div className="filter-tabs">
            {['all','pending','in_transit','partial','complete'].map(f => (
              <button key={f} className={`filter-tab ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
                {f === 'all' ? 'All' : f === 'in_transit' ? 'In Transit' : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <DataTable
          columns={[
            { key: 'id', label: 'PO Number', render: v => <span className="po-id">{v}</span> },
            { key: 'supplier', label: 'Supplier' },
            { key: 'product', label: 'Product' },
            { key: 'sku', label: 'SKU' },
            { key: 'expected', label: 'Expected Qty' },
            { key: 'received', label: 'Received Qty', render: (v, row) => (
              <span style={{ color: v < row.expected && row.status !== 'pending' ? 'var(--warning)' : 'inherit' }}>{v}</span>
            )},
            { key: 'eta', label: 'ETA' },
            { key: 'status', label: 'Status', render: v => <StatusBadge status={v} /> },
            { key: 'id', label: 'Action', render: (v, row) => (
              row.status !== 'complete'
                ? <Btn size="sm" variant="outline" onClick={() => handleReceive(row)}>Receive Stock</Btn>
                : <span className="received-tag">✓ Received</span>
            )},
          ]}
          data={filtered}
          emptyText="No shipments match your search"
        />
      </Card>

      {/* Log Expected Shipment Modal */}
      <Modal open={showModal} onClose={() => setShowModal(false)} title="Log Expected Inbound Shipment">
        <div className="form-grid">
          <FormField label="Purchase Order Number" required><Input placeholder="PO-2024-XXXX" value="" onChange={() => {}} /></FormField>
          <FormField label="Supplier" required><Input placeholder="Supplier name" value="" onChange={() => {}} /></FormField>
          <FormField label="SKU" required><Input placeholder="SKU code" value="" onChange={() => {}} /></FormField>
          <FormField label="Product Name" required><Input placeholder="Product description" value="" onChange={() => {}} /></FormField>
          <FormField label="Expected Quantity" required><Input type="number" placeholder="0" value="" onChange={() => {}} /></FormField>
          <FormField label="Expected Arrival Date" required><Input type="date" value="" onChange={() => {}} /></FormField>
        </div>
        <div className="modal-footer">
          <Btn variant="outline" onClick={() => setShowModal(false)}>Cancel</Btn>
          <Btn variant="primary" onClick={() => setShowModal(false)}>Save Shipment</Btn>
        </div>
      </Modal>

      {/* Receive Stock Modal */}
      <Modal open={showReceiveModal} onClose={() => setShowReceiveModal(false)} title={`Receive Stock — ${selectedPO?.id}`} width={560}>
        {selectedPO && (
          <div>
            <div className="receive-po-info">
              <div className="receive-info-row"><span>Supplier</span><strong>{selectedPO.supplier}</strong></div>
              <div className="receive-info-row"><span>Product</span><strong>{selectedPO.product}</strong></div>
              <div className="receive-info-row"><span>SKU</span><strong>{selectedPO.sku}</strong></div>
              <div className="receive-info-row"><span>Expected Qty</span><strong>{selectedPO.expected} units</strong></div>
            </div>
            <div className="scan-section">
              <h4>Barcode Scanner Input</h4>
              <div className="scan-input-row">
                <div className="scan-input-wrapper">
                  <ScanLine size={16} className="scan-prefix" />
                  <input
                    className="scan-input"
                    placeholder="Scan or enter barcode..."
                    value={scanned}
                    onChange={e => setScanned(e.target.value)}
                    autoFocus
                  />
                </div>
                <Btn variant="primary" size="sm" onClick={() => setScanned('')}>Confirm Scan</Btn>
              </div>
              <p className="scan-hint">Each scan will update the received count in real time and deduct from expected.</p>
            </div>
            <FormField label="Received Quantity (Manual Override)">
              <Input type="number" placeholder={`Max: ${selectedPO.expected}`} value="" onChange={() => {}} />
            </FormField>
            <FormField label="Discrepancy Notes">
              <Input placeholder="Describe any issues found during receiving..." value="" onChange={() => {}} />
            </FormField>
            <div className="modal-footer" style={{ marginTop: 20 }}>
              <Btn variant="outline" onClick={() => setShowReceiveModal(false)}>Cancel</Btn>
              <Btn variant="primary" onClick={() => setShowReceiveModal(false)}>Confirm Receipt & Update Inventory</Btn>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
