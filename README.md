# Emway DMP — Distribution Management Platform

A full frontend UI/UX demo built in React for **Emway Singapore Pte. Ltd.**  
Designed and developed by **NextZen Minds Pte. Ltd.**

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm start

# 3. Open in browser
http://localhost:3000
```

---

## Tech Stack

| Package | Purpose |
|---|---|
| `react` + `react-dom` | UI framework |
| `react-router-dom` | Client-side routing |
| `recharts` | Charts and data visualisation |
| `lucide-react` | Icon library |

Fonts loaded via Google Fonts: **Noto Sans JP** (body) · **Syne** (headings)

---

## Project Structure

```
src/
├── App.js                        # Root app + routing
├── index.js                      # Entry point
├── styles/
│   └── globals.css               # Design tokens + global styles
├── context/
│   └── AppContext.js             # Auth state, roles, demo users
├── data/
│   ├── mockData.js               # All mock data (orders, SKUs, runs, etc.)
│   └── navConfig.js              # Role-based navigation config
├── components/
│   ├── layout/
│   │   ├── AppLayout.js          # Sidebar + Topbar shell
│   │   └── AppLayout.css
│   └── common/
│       ├── Common.js             # Shared UI components
│       └── Common.css
└── pages/
    ├── auth/
    │   ├── Login.js              # Login / role selector page
    │   └── Login.css
    ├── dashboard/
    │   ├── Dashboard.js          # Role-aware dashboard
    │   └── Dashboard.css
    ├── inbound/
    │   ├── Inbound.js            # Inbound & Procurement Management
    │   └── Inbound.css
    ├── warehouse/
    │   ├── Warehouse.js          # Warehouse & Inventory Management
    │   └── Warehouse.css
    ├── orders/
    │   ├── Orders.js             # Order Management & Fulfilment
    │   └── Orders.css
    ├── returns/
    │   ├── Returns.js            # Returns Management
    │   └── Returns.css
    ├── dispatch/
    │   ├── Dispatch.js           # Dispatch & Delivery Management
    │   └── Dispatch.css
    ├── reporting/
    │   ├── Reporting.js          # Reports & Analytics
    │   └── Reporting.css
    └── admin/
        ├── Admin.js              # Platform Administration
        └── Admin.css
```

---

## User Roles (9 total)

Select any role at login to experience its tailored UI:

| Role | Email | What they see |
|---|---|---|
| System Administrator | admin@emway.sg | Full access — all 7 modules + admin |
| Procurement Officer | procurement@emway.sg | Inbound & Procurement only |
| Warehouse Manager | whmanager@emway.sg | All operational modules |
| Warehouse Staff | whstaff@emway.sg | Task-level: Inbound, Warehouse, Orders, Returns |
| Inventory Manager | inventory@emway.sg | Warehouse & Inventory (full) + read access elsewhere |
| Sales / Order Manager | sales@emway.sg | Order Management (full) + read Warehouse & Dispatch |
| Logistics / Dispatch Coordinator | logistics@emway.sg | Dispatch (full) + read Orders |
| Finance / Billing Coordinator | finance@emway.sg | Returns (credit note approval) + read Orders & Reports |
| Management / Executive | executive@emway.sg | Reports & Dashboard (read-only) |

---

## Modules (7 total)

1. **Dashboard** — Role-aware home screen with KPIs, charts, and task lists
2. **Inbound & Procurement** — PO tracking, barcode receiving, discrepancy flagging
3. **Warehouse & Inventory** — Real-time SKU levels, zone capacity, stock adjustments
4. **Order Management & Fulfilment** — Unified order queue (Shopee, Lazada, Partner, Own Store), pick/pack workflow
5. **Returns Management** — Scan-based returns intake, condition tagging, credit note generation
6. **Dispatch & Delivery** — Delivery run creation, driver assignment, delivery outcome logging
7. **Platform Administration** — User management, integration monitoring, audit logs, system settings

---

## Design System

| Token | Value |
|---|---|
| Primary | `#2b206c` |
| Secondary | `#ffa700` |
| Body Font | Noto Sans JP |
| Heading Font | Syne |
| Border Radius | 6px / 10px / 16px / 24px |

All design tokens are defined as CSS variables in `src/styles/globals.css`.

---

## Notes

- This is a **frontend-only demo** — no backend, no real authentication
- All data is mocked in `src/data/mockData.js`
- Role-based access control is enforced in routing (`App.js`) and navigation (`navConfig.js`)
- No `localStorage` or `sessionStorage` is used; all state lives in React context
