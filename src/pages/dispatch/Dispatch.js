import React, { useState } from 'react';
import { PageHeader, Card, Badge, DataTable, Btn, SearchBar, StatCard, Modal, FormField, Input, Select, Section } from '../../components/common/Common';
import { deliveryRuns, orders } from '../../data/mockData';
import { Truck, CheckCircle2, Clock, Plus, MapPin, Package, AlertCircle } from 'lucide-react';
import './Dispatch.css';

function RunStatusBadge({ status }) {
  const map = {
    completed: ['success', 'Completed'],
    in_progress: ['warning', 'In Progress'],
    scheduled: ['info', 'Scheduled'],
    draft: ['neutral', 'Draft'],
  };
  const [type, label] = map[status] || ['neutral', status];
  return <Badge type={type}>{label}</Badge>;
}

const packedOrders = orders.filter(o => ['packing', 'dispatched'].includes(o.status));

export default function Dispatch() {
  const [search, setSearch] = useState('');
  const [showNewRun, setShowNewRun] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedRun, setSelectedRun] = useState(null);

  const filtered = deliveryRuns.filter(r =>
    r.id.toLowerCase().includes(search.toLowerCase()) ||
    (r.driver || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dispatch-page fade-in">
      <PageHeader
        title="Dispatch & Delivery Management"
        subtitle="Organise daily delivery runs, assign drivers, and track outbound delivery status"
        actions={
          <Btn variant="primary" icon={Plus} onClick={() => setShowNewRun(true)}>Create Delivery Run</Btn>
        }
      />

      <div className="grid-4 mb-24">
        <StatCard label="Total Runs Today" value={deliveryRuns.filter(r => r.date === '2025-03-28').length} icon={Truck} color="primary" />
        <StatCard label="Completed" value={deliveryRuns.filter(r => r.status === 'completed').length} icon={CheckCircle2} color="success" />
        <StatCard label="In Progress" value={deliveryRuns.filter(r => r.status === 'in_progress').length} icon={Truck} color="warning" />
        <StatCard label="Scheduled" value={deliveryRuns.filter(r => r.status === 'scheduled').length} icon={Clock} color="info" />
      </div>

      {/* Runs Table */}
      <Card noPad>
        <div className="table-toolbar">
          <SearchBar value={search} onChange={setSearch} placeholder="Search run ID or driver..." />
        </div>
        <DataTable
          columns={[
            { key: 'id', label: 'Run ID', render: v => <span className="run-id">{v}</span> },
            { key: 'date', label: 'Date' },
            { key: 'driver', label: 'Driver', render: v => v || <span style={{ color: 'var(--text-muted)' }}>Not Assigned</span> },
            { key: 'vehicle', label: 'Vehicle', render: v => v || '—' },
            { key: 'orders', label: 'Orders', render: v => `${v.length} orders` },
            { key: 'dispatched', label: 'Dispatched At', render: v => v || '—' },
            { key: 'completed', label: 'Completed At', render: v => v || '—' },
            { key: 'status', label: 'Status', render: v => <RunStatusBadge status={v} /> },
            { key: 'id', label: '', render: (v, row) => (
              <Btn size="sm" variant="ghost" onClick={() => { setSelectedRun(row); setShowDetail(true); }}>View</Btn>
            )},
          ]}
          data={filtered}
          emptyText="No delivery runs found"
        />
      </Card>

      {/* Run Detail Modal */}
      <Modal open={showDetail} onClose={() => setShowDetail(false)} title={`Delivery Run — ${selectedRun?.id}`} width={620}>
        {selectedRun && (
          <div>
            <div className="run-header-row">
              <RunStatusBadge status={selectedRun.status} />
              <span className="run-date">{selectedRun.date}</span>
            </div>
            <div className="run-info-grid">
              <div className="receive-po-info" style={{ marginBottom: 0 }}>
                <div className="receive-info-row"><span>Run ID</span><strong>{selectedRun.id}</strong></div>
                <div className="receive-info-row"><span>Driver</span><strong>{selectedRun.driver || 'Not assigned'}</strong></div>
                <div className="receive-info-row"><span>Vehicle</span><strong>{selectedRun.vehicle || '—'}</strong></div>
                <div className="receive-info-row"><span>Dispatched</span><strong>{selectedRun.dispatched || '—'}</strong></div>
                <div className="receive-info-row"><span>Completed</span><strong>{selectedRun.completed || '—'}</strong></div>
              </div>
              <div className="run-orders-panel">
                <h4>Assigned Orders ({selectedRun.orders.length})</h4>
                {selectedRun.orders.map(ordId => {
                  const o = orders.find(x => x.id === ordId);
                  return o ? (
                    <div key={ordId} className="run-order-item">
                      <div>
                        <span className="run-order-id">{o.id}</span>
                        <span className="run-order-customer">{o.customer}</span>
                      </div>
                      <Badge type={selectedRun.status === 'completed' ? 'success' : 'info'}>
                        {selectedRun.status === 'completed' ? '✓ Delivered' : 'En Route'}
                      </Badge>
                    </div>
                  ) : null;
                })}
              </div>
            </div>

            {/* Actions */}
            <div className="run-actions">
              {selectedRun.status === 'draft' && (
                <>
                  <Btn variant="primary" icon={Truck}>Assign Driver & Confirm</Btn>
                  <Btn variant="outline">Edit Run</Btn>
                </>
              )}
              {selectedRun.status === 'scheduled' && (
                <>
                  <Btn variant="primary" icon={Truck}>Confirm Dispatch</Btn>
                  <Btn variant="outline">Print Manifest</Btn>
                </>
              )}
              {selectedRun.status === 'in_progress' && (
                <>
                  <Btn variant="success" icon={CheckCircle2}>Mark Run Complete</Btn>
                  <Btn variant="outline" icon={AlertCircle}>Log Failed Delivery</Btn>
                </>
              )}
              {selectedRun.status === 'completed' && (
                <Btn variant="outline">Download POD Report</Btn>
              )}
            </div>
          </div>
        )}
      </Modal>

      {/* New Run Modal */}
      <Modal open={showNewRun} onClose={() => setShowNewRun(false)} title="Create New Delivery Run" width={580}>
        <div className="form-grid">
          <FormField label="Delivery Date" required><Input type="date" value="2025-03-29" onChange={() => {}} /></FormField>
          <FormField label="Driver Name"><Input placeholder="Select or enter driver name" value="" onChange={() => {}} /></FormField>
          <FormField label="Vehicle Plate"><Input placeholder="e.g. SGX 9012C" value="" onChange={() => {}} /></FormField>
          <FormField label="Run Type">
            <Select value="standard" onChange={() => {}} options={[
              { value: 'standard', label: 'Standard Delivery' },
              { value: 'express', label: 'Express Delivery' },
              { value: 'transfer', label: 'Store Transfer' },
            ]} />
          </FormField>
        </div>

        <Section title="Assign Packed Orders">
          <div className="packed-orders-list">
            {packedOrders.map(o => (
              <div key={o.id} className="packed-order-row">
                <input type="checkbox" id={o.id} />
                <label htmlFor={o.id}>
                  <span className="run-order-id">{o.id}</span>
                  <span className="run-order-customer">{o.customer}</span>
                  <Badge type="neutral">{o.items} items</Badge>
                </label>
              </div>
            ))}
          </div>
        </Section>

        <div className="modal-footer">
          <Btn variant="outline" onClick={() => setShowNewRun(false)}>Cancel</Btn>
          <Btn variant="primary" onClick={() => setShowNewRun(false)}>Create Run</Btn>
        </div>
      </Modal>
    </div>
  );
}
