import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext(null);

export const ROLES = {
  ADMIN: 'system_admin',
  PROCUREMENT: 'procurement_officer',
  WH_MANAGER: 'warehouse_manager',
  WH_STAFF: 'warehouse_staff',
  INVENTORY: 'inventory_manager',
  SALES: 'sales_order_manager',
  LOGISTICS: 'logistics_dispatch',
  FINANCE: 'finance_billing',
  EXECUTIVE: 'management_executive',
};

export const ROLE_LABELS = {
  [ROLES.ADMIN]: 'System Administrator',
  [ROLES.PROCUREMENT]: 'Procurement Officer',
  [ROLES.WH_MANAGER]: 'Warehouse Manager',
  [ROLES.WH_STAFF]: 'Warehouse Staff',
  [ROLES.INVENTORY]: 'Inventory Manager',
  [ROLES.SALES]: 'Sales / Order Manager',
  [ROLES.LOGISTICS]: 'Logistics / Dispatch Coordinator',
  [ROLES.FINANCE]: 'Finance / Billing Coordinator',
  [ROLES.EXECUTIVE]: 'Management / Executive',
};

export const DEMO_USERS = [
  { id: 1, name: 'Alex Tan', email: 'admin@emway.sg', role: ROLES.ADMIN, avatar: 'AT' },
  { id: 2, name: 'Sarah Lim', email: 'procurement@emway.sg', role: ROLES.PROCUREMENT, avatar: 'SL' },
  { id: 3, name: 'David Ng', email: 'whmanager@emway.sg', role: ROLES.WH_MANAGER, avatar: 'DN' },
  { id: 4, name: 'Kevin Ong', email: 'whstaff@emway.sg', role: ROLES.WH_STAFF, avatar: 'KO' },
  { id: 5, name: 'Priya Kumar', email: 'inventory@emway.sg', role: ROLES.INVENTORY, avatar: 'PK' },
  { id: 6, name: 'James Wong', email: 'sales@emway.sg', role: ROLES.SALES, avatar: 'JW' },
  { id: 7, name: 'Michelle Lee', email: 'logistics@emway.sg', role: ROLES.LOGISTICS, avatar: 'ML' },
  { id: 8, name: 'Raymond Chua', email: 'finance@emway.sg', role: ROLES.FINANCE, avatar: 'RC' },
  { id: 9, name: 'Clara Ho', email: 'executive@emway.sg', role: ROLES.EXECUTIVE, avatar: 'CH' },
];

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'warning', message: 'Low stock alert: LEGO Classic (SKU-1042) — 12 units remaining', time: '2m ago', read: false },
    { id: 2, type: 'info', message: 'Inbound shipment PO-2024-0891 confirmed — 340 units received', time: '18m ago', read: false },
    { id: 3, type: 'success', message: 'Order ORD-7821 dispatched successfully to Toys R Us Orchard', time: '1h ago', read: true },
    { id: 4, type: 'warning', message: 'Return RET-0192 pending Finance approval for credit note', time: '2h ago', read: true },
  ]);

  const login = (selectedUser) => setUser(selectedUser);
  const logout = () => setUser(null);
  const markAllRead = () => setNotifications(n => n.map(x => ({ ...x, read: true })));

  return (
    <AppContext.Provider value={{ user, login, logout, notifications, markAllRead }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
