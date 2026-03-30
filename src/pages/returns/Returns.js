import React, { useState } from 'react';
import { PageHeader, Card, Badge, DataTable, Btn, SearchBar, StatCard, Modal, FormField, Input, Select, Section, ExportBtn, StatusTimeline } from '../../components/common/Common';
import { returns } from '../../data/mockData';
import { RotateCcw, CheckCircle2, AlertTriangle, Plus, ScanLine, DollarSign, XCircle } from 'lucide-react';
import './Returns.css';

const RETURNS_TIMELINE_STEPS = [
  { key: 'pending_finance', label: 'Pending Finance' },
  { key: 'approved', label: 'Credit Note Approved' },
  { key: 'restocked', label: 'Restocked' },
];
const RETURNS_WRITEOFF_STEPS = [
  { key: 'pending_finance', label: 'Pending Finance' },
  { key: 'approved', label: 'Approved' },
  { key: 'write_off', label: 'Written Off' },
];

const EXPORT_COLUMNS = [
  { key: 'id', label: 'Return ID' },
  { key: 'orderId', label: 'Order Ref' },
  { key: 'customer', label: 'Customer' },
  { key: 'channel', label: 'Channel' },
  { key: 'product', label: 'Product' },
  { key: 'sku', label: 'SKU' },
  { key: 'qty', label: 'Qty' },
  { key: 'reason', label: 'Reason' },
  { key: 'condition', label: 'Condition' },
  { key: 'creditValue', label: 'Credit Value (SGD)' },
  { key: 'status', label: 'Status' },
  { key: 'created', label: 'Created' },
];

function ConditionBadge({ condition }) {
  const map = { good: ['success','✓ Good Stock'], damaged: ['danger','✗ Damaged'], clearance: ['warning','⚠ Clearance'] };
  const [type, label] = map[condition] || ['neutral', condition];
  return <Badge type={type}>{label}</Badge>;
}

function StatusBadge({ status }) {
  const map = {
    pending_finance: ['warning','Pending Finance Approval'],
    approved: ['info','Credit Note Approved'],
    restocked: ['success','Restocked'],
    write_off: ['danger','Written Off'],
  };
  const [type, label] = map[status] || ['neutral', status];
  return <Badge type={type}>{label}</Badge>;
}

export default function Returns() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [showNewModal, setShowNewModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedReturn, setSelectedReturn] = useState(null);
  const [conditionStep, setConditionStep] = useState(0);

  const filtered = returns.filter(r => {
    const m = r.id.toLowerCase().includes(search.toLowerCase()) ||
      r.customer.toLowerCase().includes(search.toLowerCase()) ||
      r.product.toLowerCase().includes(search.toLowerCase());
    const f = filter === 'all' || r.status === filter || r.condition === filter;
    return m && f;
  });

  const totalCredit = returns.reduce((a, r) => a + r.creditValue, 0);

  return (
    <div className="returns-page fade-in">
      <PageHeader
        title="Returns Management"
        subtitle="Log, assess, and reconcile all stock returns with full audit trail"
        actions={
          <>
            <Btn variant="outline" icon={ScanLine}>Scan Return</Btn>
            <Btn variant="primary" icon={Plus} onClick={() => setShowNewModal(true)}>New Return</Btn>
          </>
        }
      />

      <div className="grid-4 mb-24">
        <StatCard label="Total Returns" value={returns.length} icon={RotateCcw} color="primary" />
        <StatCard label="Pending Finance" value={returns.filter(r => r.status === 'pending_finance').length} icon={AlertTriangle} color="warning" />
        <StatCard label="Restocked" value={returns.filter(r => r.status === 'restocked').length} icon={CheckCircle2} color="success" />
        <StatCard label="Total Credit Value" value={`SGD ${totalCredit.toFixed(2)}`} icon={DollarSign} color="info" />
      </div>

      <Card noPad>
        <div className="table-toolbar">
          <SearchBar value={search} onChange={setSearch} placeholder="Search return ID, customer, product..." />
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <div className="filter-tabs">
              {['all','pending_finance','approved','restocked','write_off'].map(f => (
                <button key={f} className={`filter-tab ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
                  {f === 'all' ? 'All' : f === 'pending_finance' ? 'Pending' : f === 'write_off' ? 'Write-Off' : f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
            <ExportBtn columns={EXPORT_COLUMNS} data={filtered} filename="returns.csv" />
          </div>
        </div>
        <DataTable
          columns={[
            { key: 'id', label: 'Return ID', render: v => <span className="return-id">{v}</span> },
            { key: 'orderId', label: 'Order Ref', render: v => <span style={{ color: 'var(--primary)', fontWeight: 600 }}>{v}</span> },
            { key: 'customer', label: 'Customer' },
            { key: 'product', label: 'Product' },
            { key: 'qty', label: 'Qty' },
            { key: 'reason', label: 'Reason' },
            { key: 'condition', label: 'Condition', render: v => <ConditionBadge condition={v} /> },
            { key: 'creditValue', label: 'Credit Value', render: v => `SGD ${v.toFixed(2)}` },
            { key: 'status', label: 'Status', render: v => <StatusBadge status={v} /> },
            { key: 'id', label: '', render: (v, row) => (
              <Btn size="sm" variant="ghost" onClick={() => { setSelectedReturn(row); setShowDetailModal(true); }}>View</Btn>
            )},
          ]}
          data={filtered}
          emptyText="No returns match your filter"
        />
      </Card>

      {/* Return Detail / Approval Modal */}
      <Modal open={showDetailModal} onClose={() => setShowDetailModal(false)} title={`Return Detail — ${selectedReturn?.id}`} width={600}>
        {selectedReturn && (
          <div>
            <StatusTimeline
              steps={selectedReturn.status === 'write_off' ? RETURNS_WRITEOFF_STEPS : RETURNS_TIMELINE_STEPS}
              currentKey={selectedReturn.status}
            />
            <div className="return-status-bar">
              <StatusBadge status={selectedReturn.status} />
              <ConditionBadge condition={selectedReturn.condition} />
            </div>
            <div className="return-info-grid">
              <div className="receive-po-info" style={{ marginBottom: 0 }}>
                <div className="receive-info-row"><span>Return ID</span><strong>{selectedReturn.id}</strong></div>
                <div className="receive-info-row"><span>Original Order</span><strong>{selectedReturn.orderId}</strong></div>
                <div className="receive-info-row"><span>Customer</span><strong>{selectedReturn.customer}</strong></div>
                <div className="receive-info-row"><span>Channel</span><strong>{selectedReturn.channel.replace('_',' ')}</strong></div>
              </div>
              <div className="receive-po-info" style={{ marginBottom: 0 }}>
                <div className="receive-info-row"><span>Product</span><strong>{selectedReturn.product}</strong></div>
                <div className="receive-info-row"><span>SKU</span><strong>{selectedReturn.sku}</strong></div>
                <div className="receive-info-row"><span>Quantity</span><strong>{selectedReturn.qty} units</strong></div>
                <div className="receive-info-row"><span>Return Reason</span><strong>{selectedReturn.reason}</strong></div>
              </div>
            </div>

            {/* Credit Note Section */}
            <div className="credit-note-section">
              <h4>Credit Note</h4>
              <div className="credit-note-value">
                <span>Credit Value</span>
                <strong>SGD {selectedReturn.creditValue.toFixed(2)}</strong>
              </div>
              <div className="credit-note-status">
                {selectedReturn.status === 'pending_finance' ? (
                  <div className="credit-alert warning">
                    <AlertTriangle size={15} />
                    <span>Awaiting Finance approval before sync to SAP</span>
                  </div>
                ) : selectedReturn.status === 'approved' ? (
                  <div className="credit-alert info">
                    <CheckCircle2 size={15} />
                    <span>Credit note approved — pending SAP sync</span>
                  </div>
                ) : selectedReturn.status === 'restocked' ? (
                  <div className="credit-alert success">
                    <CheckCircle2 size={15} />
                    <span>Stock restocked to available inventory · Credit note synced to SAP</span>
                  </div>
                ) : (
                  <div className="credit-alert danger">
                    <XCircle size={15} />
                    <span>Stock written off · Credit note processed</span>
                  </div>
                )}
              </div>
            </div>

            {selectedReturn.status === 'pending_finance' && (
              <div className="modal-footer" style={{ marginTop: 20 }}>
                <Btn variant="danger" icon={XCircle}>Reject Credit Note</Btn>
                <Btn variant="success" icon={CheckCircle2}>Approve & Sync to SAP</Btn>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* New Return Modal — step 1 */}
      <Modal open={showNewModal} onClose={() => { setShowNewModal(false); setConditionStep(0); }} title="Log New Return" width={580}>
        <div className="return-steps">
          {['Scan & Identify', 'Condition Assessment', 'Confirm & Process'].map((s, i) => (
            <div key={s} className={`return-step ${i === conditionStep ? 'active' : ''} ${i < conditionStep ? 'done' : ''}`}>
              <div className="return-step-num">{i < conditionStep ? '✓' : i + 1}</div>
              <span>{s}</span>
            </div>
          ))}
        </div>

        {conditionStep === 0 && (
          <div>
            <div className="scan-section">
              <h4>Scan Item Barcode</h4>
              <div className="scan-input-row">
                <div className="scan-input-wrapper">
                  <ScanLine size={16} className="scan-prefix" />
                  <input className="scan-input" placeholder="Scan barcode or enter SKU manually..." autoFocus />
                </div>
              </div>
            </div>
            <div className="form-grid">
              <FormField label="Original Order ID"><Input placeholder="ORD-XXXX" value="" onChange={() => {}} /></FormField>
              <FormField label="Quantity Returned"><Input type="number" placeholder="0" value="" onChange={() => {}} /></FormField>
              <FormField label="Return Reason">
                <Select value="" onChange={() => {}} options={[
                  { value: '', label: 'Select reason...' },
                  { value: 'damaged', label: 'Damaged packaging/product' },
                  { value: 'wrong', label: 'Wrong item sent' },
                  { value: 'change', label: 'Customer changed mind' },
                  { value: 'overstock', label: 'Overstock / Excess inventory' },
                  { value: 'defective', label: 'Defective product' },
                ]} />
              </FormField>
              <FormField label="Channel">
                <Select value="" onChange={() => {}} options={[
                  { value: 'shopee', label: 'Shopee' },
                  { value: 'lazada', label: 'Lazada' },
                  { value: 'partner_store', label: 'Partner Store' },
                  { value: 'own_store', label: 'Own Store' },
                ]} />
              </FormField>
            </div>
            <div className="modal-footer">
              <Btn variant="outline" onClick={() => setShowNewModal(false)}>Cancel</Btn>
              <Btn variant="primary" onClick={() => setConditionStep(1)}>Next: Assess Condition →</Btn>
            </div>
          </div>
        )}

        {conditionStep === 1 && (
          <div>
            <p className="step-desc">Inspect the returned item and tag its condition to determine how it will be processed.</p>
            <div className="condition-options">
              <div className="condition-option good" onClick={() => setConditionStep(2)}>
                <CheckCircle2 size={24} />
                <strong>Good Stock</strong>
                <span>Sellable condition. Returns directly to available inventory.</span>
              </div>
              <div className="condition-option damaged" onClick={() => setConditionStep(2)}>
                <XCircle size={24} />
                <strong>Damaged Stock</strong>
                <span>Cannot be resold. Moved to damaged holding for write-off.</span>
              </div>
              <div className="condition-option clearance" onClick={() => setConditionStep(2)}>
                <AlertTriangle size={24} />
                <strong>Clearance Stock</strong>
                <span>Minor issues. Moved to clearance for reduced-price sale.</span>
              </div>
            </div>
            <div className="modal-footer">
              <Btn variant="outline" onClick={() => setConditionStep(0)}>← Back</Btn>
            </div>
          </div>
        )}

        {conditionStep === 2 && (
          <div>
            <div className="confirm-summary">
              <div className="credit-alert success">
                <CheckCircle2 size={15} />
                <span>Return logged · Stock will be updated · Credit note generated for Finance review</span>
              </div>
            </div>
            <FormField label="Additional Notes"><Input placeholder="Any extra observations or instructions..." value="" onChange={() => {}} /></FormField>
            <div className="modal-footer" style={{ marginTop: 20 }}>
              <Btn variant="outline" onClick={() => setConditionStep(1)}>← Back</Btn>
              <Btn variant="primary" onClick={() => { setShowNewModal(false); setConditionStep(0); }}>Confirm & Process Return</Btn>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
