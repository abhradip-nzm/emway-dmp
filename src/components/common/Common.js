import React from 'react';
import { Search, X } from 'lucide-react';
import './Common.css';

// ── PAGE HEADER ────────────────────────────────────────
export function PageHeader({ title, subtitle, actions }) {
  return (
    <div className="page-header">
      <div className="page-header-left">
        <h1 className="page-title">{title}</h1>
        {subtitle && <p className="page-subtitle">{subtitle}</p>}
      </div>
      {actions && <div className="page-header-actions">{actions}</div>}
    </div>
  );
}

// ── CARD ───────────────────────────────────────────────
export function Card({ children, className = '', noPad = false, onClick }) {
  return (
    <div className={`card ${className} ${noPad ? 'no-pad' : ''} ${onClick ? 'clickable' : ''}`} onClick={onClick}>
      {children}
    </div>
  );
}

// ── STAT CARD ──────────────────────────────────────────
export function StatCard({ label, value, sub, icon: Icon, color = 'primary', trend }) {
  return (
    <div className={`stat-card stat-${color}`}>
      <div className="stat-card-top">
        <div className="stat-card-label">{label}</div>
        {Icon && <div className={`stat-icon stat-icon-${color}`}><Icon size={18} /></div>}
      </div>
      <div className="stat-card-value">{value}</div>
      <div className="stat-card-bottom">
        {sub && <span className="stat-sub">{sub}</span>}
        {trend !== undefined && (
          <span className={`stat-trend ${trend >= 0 ? 'up' : 'down'}`}>
            {trend >= 0 ? '▲' : '▼'} {Math.abs(trend)}%
          </span>
        )}
      </div>
    </div>
  );
}

// ── BADGE ─────────────────────────────────────────────
export function Badge({ children, type = 'neutral' }) {
  return <span className={`status-badge ${type}`}>{children}</span>;
}

// ── BUTTON ────────────────────────────────────────────
export function Btn({ children, onClick, variant = 'primary', size = 'md', icon: Icon, disabled }) {
  return (
    <button
      className={`btn btn-${variant} btn-${size}`}
      onClick={onClick}
      disabled={disabled}
    >
      {Icon && <Icon size={15} />}
      {children}
    </button>
  );
}

// ── SEARCH BAR ────────────────────────────────────────
export function SearchBar({ value, onChange, placeholder = 'Search...' }) {
  return (
    <div className="search-bar">
      <Search size={15} className="search-icon" />
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="search-input"
      />
      {value && <X size={14} className="search-clear" onClick={() => onChange('')} />}
    </div>
  );
}

// ── DATA TABLE ────────────────────────────────────────
export function DataTable({ columns, data, onRowClick, emptyText = 'No records found' }) {
  return (
    <div className="table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map(col => (
              <th key={col.key} style={{ width: col.width }}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr><td colSpan={columns.length} className="table-empty">{emptyText}</td></tr>
          ) : (
            data.map((row, i) => (
              <tr key={i} onClick={() => onRowClick?.(row)} className={onRowClick ? 'clickable' : ''}>
                {columns.map(col => (
                  <td key={col.key}>
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

// ── SECTION ───────────────────────────────────────────
export function Section({ title, actions, children }) {
  return (
    <div className="section">
      {(title || actions) && (
        <div className="section-header">
          {title && <h3 className="section-title">{title}</h3>}
          {actions && <div className="section-actions">{actions}</div>}
        </div>
      )}
      {children}
    </div>
  );
}

// ── MODAL ─────────────────────────────────────────────
export function Modal({ open, onClose, title, children, width = 520 }) {
  if (!open) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" style={{ maxWidth: width }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
          <button className="modal-close" onClick={onClose}><X size={18} /></button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}

// ── FORM FIELD ────────────────────────────────────────
export function FormField({ label, children, required }) {
  return (
    <div className="form-field">
      <label className="form-label">{label}{required && <span className="required">*</span>}</label>
      {children}
    </div>
  );
}

export function Input({ value, onChange, placeholder, type = 'text' }) {
  return (
    <input
      className="form-input"
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
}

export function Select({ value, onChange, options }) {
  return (
    <select className="form-input" value={value} onChange={e => onChange(e.target.value)}>
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  );
}

// ── EMPTY STATE ───────────────────────────────────────
export function EmptyState({ icon: Icon, title, description }) {
  return (
    <div className="empty-state">
      {Icon && <div className="empty-icon"><Icon size={36} /></div>}
      <h4>{title}</h4>
      {description && <p>{description}</p>}
    </div>
  );
}

// ── PROGRESS BAR ──────────────────────────────────────
export function ProgressBar({ value, max = 100, color = 'primary' }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className="progress-track">
      <div className={`progress-fill progress-${color}`} style={{ width: `${pct}%` }} />
    </div>
  );
}

// ── TAG ───────────────────────────────────────────────
export function Tag({ children, color = 'default' }) {
  return <span className={`tag tag-${color}`}>{children}</span>;
}
