import { ROLES } from '../context/AppContext';

export const NAV_CONFIG = {
  [ROLES.ADMIN]: [
    { key: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', path: '/dashboard' },
    { key: 'inbound', label: 'Inbound & Procurement', icon: 'PackageOpen', path: '/inbound' },
    { key: 'warehouse', label: 'Warehouse & Inventory', icon: 'Warehouse', path: '/warehouse' },
    { key: 'orders', label: 'Order Management', icon: 'ShoppingCart', path: '/orders' },
    { key: 'returns', label: 'Returns Management', icon: 'RotateCcw', path: '/returns' },
    { key: 'dispatch', label: 'Dispatch & Delivery', icon: 'Truck', path: '/dispatch' },
    { key: 'reporting', label: 'Reports & Dashboard', icon: 'BarChart3', path: '/reporting' },
    { key: 'admin', label: 'Platform Administration', icon: 'Settings', path: '/admin' },
  ],
  [ROLES.PROCUREMENT]: [
    { key: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', path: '/dashboard' },
    { key: 'inbound', label: 'Inbound & Procurement', icon: 'PackageOpen', path: '/inbound' },
  ],
  [ROLES.WH_MANAGER]: [
    { key: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', path: '/dashboard' },
    { key: 'inbound', label: 'Inbound & Procurement', icon: 'PackageOpen', path: '/inbound' },
    { key: 'warehouse', label: 'Warehouse & Inventory', icon: 'Warehouse', path: '/warehouse' },
    { key: 'orders', label: 'Order Management', icon: 'ShoppingCart', path: '/orders' },
    { key: 'returns', label: 'Returns Management', icon: 'RotateCcw', path: '/returns' },
    { key: 'dispatch', label: 'Dispatch & Delivery', icon: 'Truck', path: '/dispatch' },
    { key: 'reporting', label: 'Reports & Dashboard', icon: 'BarChart3', path: '/reporting' },
  ],
  [ROLES.WH_STAFF]: [
    { key: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', path: '/dashboard' },
    { key: 'inbound', label: 'Inbound & Procurement', icon: 'PackageOpen', path: '/inbound' },
    { key: 'warehouse', label: 'Warehouse & Inventory', icon: 'Warehouse', path: '/warehouse' },
    { key: 'orders', label: 'Order Management', icon: 'ShoppingCart', path: '/orders' },
    { key: 'returns', label: 'Returns Management', icon: 'RotateCcw', path: '/returns' },
  ],
  [ROLES.INVENTORY]: [
    { key: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', path: '/dashboard' },
    { key: 'inbound', label: 'Inbound & Procurement', icon: 'PackageOpen', path: '/inbound' },
    { key: 'warehouse', label: 'Warehouse & Inventory', icon: 'Warehouse', path: '/warehouse' },
    { key: 'orders', label: 'Order Management', icon: 'ShoppingCart', path: '/orders' },
  ],
  [ROLES.SALES]: [
    { key: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', path: '/dashboard' },
    { key: 'orders', label: 'Order Management', icon: 'ShoppingCart', path: '/orders' },
    { key: 'warehouse', label: 'Warehouse & Inventory', icon: 'Warehouse', path: '/warehouse' },
    { key: 'dispatch', label: 'Dispatch & Delivery', icon: 'Truck', path: '/dispatch' },
  ],
  [ROLES.LOGISTICS]: [
    { key: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', path: '/dashboard' },
    { key: 'dispatch', label: 'Dispatch & Delivery', icon: 'Truck', path: '/dispatch' },
    { key: 'orders', label: 'Order Management', icon: 'ShoppingCart', path: '/orders' },
  ],
  [ROLES.FINANCE]: [
    { key: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', path: '/dashboard' },
    { key: 'orders', label: 'Order Management', icon: 'ShoppingCart', path: '/orders' },
    { key: 'returns', label: 'Returns Management', icon: 'RotateCcw', path: '/returns' },
    { key: 'reporting', label: 'Reports & Dashboard', icon: 'BarChart3', path: '/reporting' },
  ],
  [ROLES.EXECUTIVE]: [
    { key: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', path: '/dashboard' },
    { key: 'reporting', label: 'Reports & Dashboard', icon: 'BarChart3', path: '/reporting' },
  ],
};
