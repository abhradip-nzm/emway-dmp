import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useApp, ROLE_LABELS } from '../../context/AppContext';
import { NAV_CONFIG } from '../../data/navConfig';
import {
  LayoutDashboard, PackageOpen, Warehouse, ShoppingCart, RotateCcw,
  Truck, BarChart3, Settings, Bell, LogOut, Menu, X, Package, ChevronRight
} from 'lucide-react';
import './AppLayout.css';

const ICON_MAP = { LayoutDashboard, PackageOpen, Warehouse, ShoppingCart, RotateCcw, Truck, BarChart3, Settings };

export default function AppLayout({ children }) {
  const { user, logout, notifications } = useApp();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifOpen, setNotifOpen] = useState(false);

  const navItems = NAV_CONFIG[user?.role] || [];
  const unread = notifications.filter(n => !n.read).length;

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <div className={`app-layout ${sidebarOpen ? '' : 'sidebar-collapsed'}`}>
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="sidebar-logo">
            <Package size={20} color="#fff" />
          </div>
          <div className="sidebar-brand-text">
            <span className="sidebar-app-name">Emway DMP</span>
            <span className="sidebar-app-sub">Distribution Platform</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          {navItems.map(item => {
            const Icon = ICON_MAP[item.icon];
            return (
              <NavLink
                key={item.key}
                to={item.path}
                className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
              >
                {Icon && <Icon size={18} />}
                <span>{item.label}</span>
                <ChevronRight size={14} className="sidebar-arrow" />
              </NavLink>
            );
          })}
        </nav>

        <div className="sidebar-user">
          <div className="sidebar-avatar">{user?.avatar}</div>
          <div className="sidebar-user-info">
            <span className="sidebar-user-name">{user?.name}</span>
            <span className="sidebar-user-role">{ROLE_LABELS[user?.role]}</span>
          </div>
          <button className="sidebar-logout" onClick={handleLogout} title="Logout">
            <LogOut size={16} />
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="app-main">
        {/* Topbar */}
        <header className="topbar">
          <button className="topbar-menu-btn" onClick={() => setSidebarOpen(s => !s)}>
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <div className="topbar-right">
            <div className="notif-wrapper">
              <button className="topbar-btn" onClick={() => setNotifOpen(o => !o)}>
                <Bell size={18} />
                {unread > 0 && <span className="notif-badge">{unread}</span>}
              </button>
              {notifOpen && (
                <div className="notif-panel">
                  <div className="notif-panel-header">
                    <span>Notifications</span>
                    {unread > 0 && <button className="notif-mark-read" onClick={() => { useApp().markAllRead?.(); setNotifOpen(false); }}>Mark all read</button>}
                  </div>
                  {notifications.map(n => (
                    <div key={n.id} className={`notif-item ${n.read ? 'read' : ''}`}>
                      <div className={`notif-dot ${n.type}`} />
                      <div className="notif-content">
                        <p>{n.message}</p>
                        <span>{n.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="topbar-divider" />
            <div className="topbar-user">
              <div className="topbar-avatar">{user?.avatar}</div>
              <div className="topbar-user-info">
                <span className="topbar-user-name">{user?.name}</span>
                <span className="topbar-user-role">{ROLE_LABELS[user?.role]}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="app-content">
          {children}
        </main>
      </div>
    </div>
  );
}
