import React, { useState } from 'react';
import { PageHeader, Card, Badge, DataTable, Btn, SearchBar, StatCard, Modal, FormField, Input, Select, Section, ExportBtn } from '../../components/common/Common';
import { systemUsers, integrationStatus, auditLogs } from '../../data/mockData';
import { ROLE_LABELS } from '../../context/AppContext';
import { Users, Settings, Activity, Link2, Plus, Shield, RefreshCw } from 'lucide-react';
import './Admin.css';

const USER_EXPORT_COLUMNS = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role' },
  { key: 'status', label: 'Status' },
  { key: 'lastLogin', label: 'Last Login' },
];

const AUDIT_EXPORT_COLUMNS = [
  { key: 'time', label: 'Timestamp' },
  { key: 'user', label: 'User' },
  { key: 'action', label: 'Action' },
  { key: 'detail', label: 'Details' },
];

function UserStatusBadge({ status }) {
  return <Badge type={status === 'active' ? 'success' : 'neutral'}>{status === 'active' ? 'Active' : 'Inactive'}</Badge>;
}

function IntegrationStatusBadge({ status }) {
  const map = { connected: ['success','Connected'], warning: ['warning','Warning'], error: ['danger','Error'] };
  const [type, label] = map[status] || ['neutral', status];
  return <Badge type={type}>{label}</Badge>;
}

const TABS = ['Users', 'Integrations', 'Audit Log', 'System Settings'];

export default function Admin() {
  const [tab, setTab] = useState('Users');
  const [search, setSearch] = useState('');
  const [showNewUser, setShowNewUser] = useState(false);
  const [showUserDetail, setShowUserDetail] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const filteredUsers = systemUsers.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    ROLE_LABELS[u.role]?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-page fade-in">
      <PageHeader
        title="Platform Administration"
        subtitle="User management, integrations, audit logs, and system configuration"
        actions={tab === 'Users' && <Btn variant="primary" icon={Plus} onClick={() => setShowNewUser(true)}>Add User</Btn>}
      />

      {/* KPIs */}
      <div className="grid-4 mb-24">
        <StatCard label="Total Users" value={systemUsers.length} icon={Users} color="primary" />
        <StatCard label="Active Users" value={systemUsers.filter(u => u.status === 'active').length} icon={Shield} color="success" />
        <StatCard label="Integrations" value={integrationStatus.length} icon={Link2} color="info" />
        <StatCard label="Audit Events Today" value={auditLogs.length} icon={Activity} color="warning" />
      </div>

      {/* Tabs */}
      <div className="admin-tabs mb-24">
        {TABS.map(t => (
          <button key={t} className={`admin-tab ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>

      {/* ── USERS TAB ── */}
      {tab === 'Users' && (
        <Card noPad>
          <div className="table-toolbar">
            <SearchBar value={search} onChange={setSearch} placeholder="Search users by name, email, role..." />
            <ExportBtn columns={USER_EXPORT_COLUMNS} data={filteredUsers} filename="users.csv" />
          </div>
          <DataTable
            columns={[
              { key: 'name', label: 'Name', render: (v, row) => (
                <div className="user-cell">
                  <div className="user-avatar-sm">{row.name.split(' ').map(n => n[0]).join('')}</div>
                  <div>
                    <div className="user-name">{v}</div>
                    <div className="user-email">{row.email}</div>
                  </div>
                </div>
              )},
              { key: 'role', label: 'Role', render: v => <Badge type="primary">{ROLE_LABELS[v] || v}</Badge> },
              { key: 'status', label: 'Status', render: v => <UserStatusBadge status={v} /> },
              { key: 'lastLogin', label: 'Last Login' },
              { key: 'id', label: 'Actions', render: (v, row) => (
                <div style={{ display: 'flex', gap: 6 }}>
                  <Btn size="sm" variant="ghost" onClick={() => { setSelectedUser(row); setShowUserDetail(true); }}>Edit</Btn>
                  <Btn size="sm" variant="ghost">{row.status === 'active' ? 'Deactivate' : 'Activate'}</Btn>
                </div>
              )},
            ]}
            data={filteredUsers}
            emptyText="No users found"
          />
        </Card>
      )}

      {/* ── INTEGRATIONS TAB ── */}
      {tab === 'Integrations' && (
        <div className="integrations-grid">
          {integrationStatus.map(intg => (
            <Card key={intg.name} className="integration-card">
              <div className="intg-header">
                <div className="intg-icon">
                  <Link2 size={18} />
                </div>
                <div>
                  <div className="intg-name">{intg.name}</div>
                  <div className="intg-type">{intg.type}</div>
                </div>
                <IntegrationStatusBadge status={intg.status} />
              </div>
              <div className="intg-details">
                <div className="intg-detail-row">
                  <span>Last Sync</span>
                  <strong>{intg.lastSync}</strong>
                </div>
                <div className="intg-detail-row">
                  <span>Details</span>
                  <strong>{intg.records}</strong>
                </div>
              </div>
              <Btn variant="outline" size="sm" icon={RefreshCw}>Force Sync</Btn>
            </Card>
          ))}
        </div>
      )}

      {/* ── AUDIT LOG TAB ── */}
      {tab === 'Audit Log' && (
        <Card noPad>
          <div className="table-toolbar">
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Audit Events</span>
            <ExportBtn columns={AUDIT_EXPORT_COLUMNS} data={auditLogs} filename="audit-log.csv" />
          </div>
          <DataTable
            columns={[
              { key: 'time', label: 'Timestamp' },
              { key: 'user', label: 'User', render: v => <span style={{ fontWeight: 600 }}>{v}</span> },
              { key: 'action', label: 'Action', render: v => <Badge type="primary">{v}</Badge> },
              { key: 'detail', label: 'Details' },
            ]}
            data={auditLogs}
            emptyText="No audit events"
          />
        </Card>
      )}

      {/* ── SYSTEM SETTINGS TAB ── */}
      {tab === 'System Settings' && (
        <div className="settings-grid">
          <Card>
            <Section title="General Settings">
              <div className="settings-group">
                <div className="settings-row">
                  <div>
                    <div className="settings-label">Platform Name</div>
                    <div className="settings-desc">Display name shown in the UI</div>
                  </div>
                  <Input value="Emway DMP" onChange={() => {}} />
                </div>
                <div className="settings-row">
                  <div>
                    <div className="settings-label">Default Currency</div>
                    <div className="settings-desc">Used across all financial displays</div>
                  </div>
                  <Select value="SGD" onChange={() => {}} options={[{ value: 'SGD', label: 'SGD — Singapore Dollar' }, { value: 'USD', label: 'USD — US Dollar' }]} />
                </div>
                <div className="settings-row">
                  <div>
                    <div className="settings-label">Timezone</div>
                    <div className="settings-desc">All timestamps in this timezone</div>
                  </div>
                  <Select value="SGT" onChange={() => {}} options={[{ value: 'SGT', label: 'SGT (UTC+8)' }]} />
                </div>
              </div>
            </Section>
          </Card>
          <Card>
            <Section title="Master Data Configuration">
              <div className="settings-group">
                <div className="settings-row">
                  <div>
                    <div className="settings-label">Warehouse Zones</div>
                    <div className="settings-desc">5 zones configured (A–E)</div>
                  </div>
                  <Btn variant="outline" size="sm">Manage Zones</Btn>
                </div>
                <div className="settings-row">
                  <div>
                    <div className="settings-label">Store Profiles</div>
                    <div className="settings-desc">3 own stores · 300+ partner stores</div>
                  </div>
                  <Btn variant="outline" size="sm">Manage Stores</Btn>
                </div>
                <div className="settings-row">
                  <div>
                    <div className="settings-label">SKU Categories</div>
                    <div className="settings-desc">8 product categories active</div>
                  </div>
                  <Btn variant="outline" size="sm">Manage Categories</Btn>
                </div>
              </div>
            </Section>
          </Card>
        </div>
      )}

      {/* Add User Modal */}
      <Modal open={showNewUser} onClose={() => setShowNewUser(false)} title="Add New User">
        <div className="form-grid">
          <FormField label="Full Name" required><Input placeholder="Full name" value="" onChange={() => {}} /></FormField>
          <FormField label="Email Address" required><Input type="email" placeholder="user@emway.sg" value="" onChange={() => {}} /></FormField>
          <FormField label="Role" required>
            <Select value="" onChange={() => {}} options={Object.entries(ROLE_LABELS).map(([v, l]) => ({ value: v, label: l }))} />
          </FormField>
          <FormField label="Status">
            <Select value="active" onChange={() => {}} options={[{ value: 'active', label: 'Active' }, { value: 'inactive', label: 'Inactive' }]} />
          </FormField>
        </div>
        <div className="modal-footer">
          <Btn variant="outline" onClick={() => setShowNewUser(false)}>Cancel</Btn>
          <Btn variant="primary" onClick={() => setShowNewUser(false)}>Create User</Btn>
        </div>
      </Modal>

      {/* Edit User Modal */}
      <Modal open={showUserDetail} onClose={() => setShowUserDetail(false)} title={`Edit User — ${selectedUser?.name}`}>
        {selectedUser && (
          <div>
            <div className="form-grid">
              <FormField label="Full Name"><Input value={selectedUser.name} onChange={() => {}} /></FormField>
              <FormField label="Email"><Input value={selectedUser.email} onChange={() => {}} /></FormField>
              <FormField label="Role">
                <Select value={selectedUser.role} onChange={() => {}} options={Object.entries(ROLE_LABELS).map(([v, l]) => ({ value: v, label: l }))} />
              </FormField>
              <FormField label="Status">
                <Select value={selectedUser.status} onChange={() => {}} options={[{ value: 'active', label: 'Active' }, { value: 'inactive', label: 'Inactive' }]} />
              </FormField>
            </div>
            <div className="modal-footer">
              <Btn variant="danger" onClick={() => setShowUserDetail(false)}>Deactivate User</Btn>
              <Btn variant="outline" onClick={() => setShowUserDetail(false)}>Cancel</Btn>
              <Btn variant="primary" onClick={() => setShowUserDetail(false)}>Save Changes</Btn>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
