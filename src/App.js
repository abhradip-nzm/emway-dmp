import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import AppLayout from './components/layout/AppLayout';
import Login from './pages/auth/Login';
import Dashboard from './pages/dashboard/Dashboard';
import Inbound from './pages/inbound/Inbound';
import Warehouse from './pages/warehouse/Warehouse';
import Orders from './pages/orders/Orders';
import Returns from './pages/returns/Returns';
import Dispatch from './pages/dispatch/Dispatch';
import Reporting from './pages/reporting/Reporting';
import Admin from './pages/admin/Admin';
import { NAV_CONFIG } from './data/navConfig';

function ProtectedRoute({ children, path }) {
  const { user } = useApp();
  if (!user) return <Navigate to="/" replace />;
  const navItems = NAV_CONFIG[user.role] || [];
  const routeKey = path.replace('/', '');
  const hasAccess = navItems.some(n => n.key === routeKey || n.path === path);
  if (!hasAccess) return <Navigate to="/dashboard" replace />;
  return <AppLayout>{children}</AppLayout>;
}

function AppRoutes() {
  const { user } = useApp();
  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <Login />} />
      <Route path="/dashboard" element={
        <ProtectedRoute path="/dashboard"><Dashboard /></ProtectedRoute>
      } />
      <Route path="/inbound" element={
        <ProtectedRoute path="/inbound"><Inbound /></ProtectedRoute>
      } />
      <Route path="/warehouse" element={
        <ProtectedRoute path="/warehouse"><Warehouse /></ProtectedRoute>
      } />
      <Route path="/orders" element={
        <ProtectedRoute path="/orders"><Orders /></ProtectedRoute>
      } />
      <Route path="/returns" element={
        <ProtectedRoute path="/returns"><Returns /></ProtectedRoute>
      } />
      <Route path="/dispatch" element={
        <ProtectedRoute path="/dispatch"><Dispatch /></ProtectedRoute>
      } />
      <Route path="/reporting" element={
        <ProtectedRoute path="/reporting"><Reporting /></ProtectedRoute>
      } />
      <Route path="/admin" element={
        <ProtectedRoute path="/admin"><Admin /></ProtectedRoute>
      } />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppProvider>
  );
}
