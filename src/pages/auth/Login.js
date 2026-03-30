import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp, DEMO_USERS, ROLE_LABELS, ROLES } from '../../context/AppContext';
import { Package, ChevronDown, ChevronRight } from 'lucide-react';
import './Login.css';

// Group users by role
const usersByRole = DEMO_USERS.reduce((acc, u) => {
  if (!acc[u.role]) acc[u.role] = [];
  acc[u.role].push(u);
  return acc;
}, {});

const ALL_ROLES = Object.entries(ROLE_LABELS).map(([key, label]) => ({ key, label }));

export default function Login() {
  const { login } = useApp();
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState(null);
  const [roleOpen, setRoleOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userOpen, setUserOpen] = useState(false);

  const usersForRole = selectedRole ? (usersByRole[selectedRole] || []) : [];

  const handleRoleSelect = (roleKey) => {
    setSelectedRole(roleKey);
    setSelectedUser(null);
    setRoleOpen(false);
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setUserOpen(false);
  };

  const handleLogin = () => {
    if (!selectedUser) return;
    login(selectedUser);
    navigate('/dashboard');
  };

  return (
    <div className="login-page">
      <div className="login-bg">
        <div className="login-bg-circle c1" />
        <div className="login-bg-circle c2" />
        <div className="login-bg-circle c3" />
      </div>

      <div className="login-left">
        <div className="login-brand">
          <div className="login-logo">
            <Package size={28} color="#fff" />
          </div>
          <span className="login-logo-text">Emway DMP</span>
        </div>
        <div className="login-hero">
          <h1 className="login-title">Distribution<br />Management<br />Platform</h1>
          <p className="login-subtitle">Real-time visibility across every warehouse movement, order, and delivery — all in one place.</p>
          <div className="login-stats">
            <div className="login-stat">
              <span className="login-stat-value">7</span>
              <span className="login-stat-label">Core Modules</span>
            </div>
            <div className="login-stat">
              <span className="login-stat-value">9</span>
              <span className="login-stat-label">User Roles</span>
            </div>
            <div className="login-stat">
              <span className="login-stat-value">3</span>
              <span className="login-stat-label">Integrations</span>
            </div>
          </div>
        </div>
      </div>

      <div className="login-right">
        <div className="login-card">
          <div className="login-card-header">
            <h2>Welcome back</h2>
            <p>Select your role and user to enter the demo environment</p>
          </div>

          <div className="login-form">

            {/* ── Step 1: Role ── */}
            <div className="login-step-label">
              <span className="login-step-num">1</span>
              <label className="login-label">Select Role</label>
            </div>
            <div className="login-dropdown" onClick={() => { setRoleOpen(o => !o); setUserOpen(false); }}>
              {selectedRole ? (
                <div className="login-selected">
                  <div className="login-role-dot" />
                  <div>
                    <div className="login-selected-name">{ROLE_LABELS[selectedRole]}</div>
                  </div>
                </div>
              ) : (
                <span className="login-placeholder">Choose a role...</span>
              )}
              <ChevronDown size={16} className={`login-chevron ${roleOpen ? 'open' : ''}`} />
            </div>
            {roleOpen && (
              <div className="login-dropdown-list">
                {ALL_ROLES.map(r => (
                  <div
                    key={r.key}
                    className={`login-dropdown-item login-role-item ${selectedRole === r.key ? 'active' : ''}`}
                    onClick={() => handleRoleSelect(r.key)}
                  >
                    <div className="login-role-icon">
                      {r.label.charAt(0)}
                    </div>
                    <span className="login-role-label">{r.label}</span>
                    {selectedRole === r.key && <ChevronRight size={14} style={{ marginLeft: 'auto', color: 'var(--primary)' }} />}
                  </div>
                ))}
              </div>
            )}

            {/* ── Step 2: User ── */}
            <div className={`login-step-label ${!selectedRole ? 'login-step-disabled' : ''}`}>
              <span className="login-step-num">2</span>
              <label className="login-label">Select User</label>
            </div>
            <div
              className={`login-dropdown ${!selectedRole ? 'login-dropdown-disabled' : ''}`}
              onClick={() => { if (selectedRole) { setUserOpen(o => !o); setRoleOpen(false); } }}
            >
              {selectedUser ? (
                <div className="login-selected">
                  <div className="login-avatar small">{selectedUser.avatar}</div>
                  <div>
                    <div className="login-selected-name">{selectedUser.name}</div>
                    <div className="login-selected-role">{selectedUser.email}</div>
                  </div>
                </div>
              ) : (
                <span className="login-placeholder">
                  {selectedRole ? `${usersForRole.length} user${usersForRole.length !== 1 ? 's' : ''} available` : 'Select a role first'}
                </span>
              )}
              <ChevronDown size={16} className={`login-chevron ${userOpen ? 'open' : ''}`} />
            </div>
            {userOpen && usersForRole.length > 0 && (
              <div className="login-dropdown-list">
                {usersForRole.map(u => (
                  <div
                    key={u.id}
                    className={`login-dropdown-item ${selectedUser?.id === u.id ? 'active' : ''}`}
                    onClick={() => handleUserSelect(u)}
                  >
                    <div className="login-avatar">{u.avatar}</div>
                    <div className="login-user-info">
                      <div className="login-user-name">{u.name}</div>
                      <div className="login-user-role">{u.email}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <button
              className="login-btn"
              onClick={handleLogin}
              disabled={!selectedUser}
            >
              Enter Platform
            </button>
          </div>

          <p className="login-note">This is a UI/UX demo. No real authentication is required.</p>
        </div>
      </div>
    </div>
  );
}
