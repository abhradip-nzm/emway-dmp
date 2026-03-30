import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp, DEMO_USERS, ROLE_LABELS } from '../../context/AppContext';
import { Package, ChevronDown } from 'lucide-react';
import './Login.css';

export default function Login() {
  const { login } = useApp();
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);

  const handleLogin = () => {
    if (!selected) return;
    login(selected);
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
            <p>Select your role to enter the demo environment</p>
          </div>

          <div className="login-form">
            <label className="login-label">Select User / Role</label>
            <div className="login-dropdown" onClick={() => setOpen(!open)}>
              {selected ? (
                <div className="login-selected">
                  <div className="login-avatar small">{selected.avatar}</div>
                  <div>
                    <div className="login-selected-name">{selected.name}</div>
                    <div className="login-selected-role">{ROLE_LABELS[selected.role]}</div>
                  </div>
                </div>
              ) : (
                <span className="login-placeholder">Choose a demo user...</span>
              )}
              <ChevronDown size={16} className={`login-chevron ${open ? 'open' : ''}`} />
            </div>
            {open && (
              <div className="login-dropdown-list">
                {DEMO_USERS.map(u => (
                  <div
                    key={u.id}
                    className={`login-dropdown-item ${selected?.id === u.id ? 'active' : ''}`}
                    onClick={() => { setSelected(u); setOpen(false); }}
                  >
                    <div className="login-avatar">{u.avatar}</div>
                    <div className="login-user-info">
                      <div className="login-user-name">{u.name}</div>
                      <div className="login-user-role">{ROLE_LABELS[u.role]}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <button
              className="login-btn"
              onClick={handleLogin}
              disabled={!selected}
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
