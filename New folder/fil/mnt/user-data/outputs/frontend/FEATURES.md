# FEATURES.md — AI CFO Frontend Feature Specifications

## Feature Index

1. [Authentication Pages](#1-authentication-pages)
2. [Onboarding Wizard](#2-onboarding-wizard)
3. [Overview Dashboard](#3-overview-dashboard)
4. [AI CFO Chat](#4-ai-cfo-chat)
5. [Daily Briefing](#5-daily-briefing)
6. [Cash Flow Forecast & Scenarios](#6-cash-flow-forecast--scenarios)
7. [Alerts Center](#7-alerts-center)
8. [Transactions](#8-transactions)
9. [Invoices](#9-invoices)
10. [Chart of Accounts](#10-chart-of-accounts)
11. [Financial Reports](#11-financial-reports)
12. [Profitability Analytics](#12-profitability-analytics)
13. [Bank Connections](#13-bank-connections)
14. [Document Upload (OCR)](#14-document-upload-ocr)
15. [Settings](#15-settings)
16. [Notifications System](#16-notifications-system)
17. [Global Search](#17-global-search)
18. [Mobile Experience](#18-mobile-experience)

---

## 1. Authentication Pages

### Login Page `/login`
**Layout:** Centered card on branded split-screen background (left: product feature highlights, right: form)

**Form Fields:**
- Email address
- Password (show/hide toggle)
- Remember me checkbox

**Features:**
- "Forgot password" link
- Error state: wrong credentials shows inline error (not toast)
- 2FA step: after valid password, if 2FA enabled, show TOTP code input
- Redirect to originally requested URL after login
- Loading spinner on submit button during request

**Validation:**
- Email: valid email format
- Password: required, min 8 characters

---

### Register Page `/register`
**Layout:** Same split-screen as login

**Form Fields:**
- Full name
- Email address
- Password + confirm password
- Company/business name
- Accept terms and privacy policy checkbox

**Features:**
- Password strength indicator (weak/fair/strong)
- After submit: "Check your email" confirmation screen
- Email verification link redirects to onboarding

---

### Forgot Password `/forgot-password`
- Email input
- Send reset link
- Confirmation message with instructions
- Link back to login

---

## 2. Onboarding Wizard

**Route:** `/onboarding`
**Layout:** Full-screen wizard, no sidebar, step progress indicator at top

### Step 1 — Business Profile
- Business name (pre-filled from registration)
- Business type (Sole Proprietor, Partnership, Limited Company, Corporation)
- Industry selector (Retail, Technology, Services, Manufacturing, Healthcare, etc.)
- Country of operation
- Primary currency

### Step 2 — Fiscal Year
- Fiscal year start month (Jan–Dec)
- Accounting method (Cash or Accrual)
- VAT/GST registered toggle
- If yes: tax rate and filing frequency

### Step 3 — Connect Your Bank
- Headline: "Connect your bank for instant insights"
- Show Mono (Nigeria) and Plaid (International) options
- One-click connect launches provider widget
- Skip option with clear explanation of limited features
- Can connect multiple accounts

### Step 4 — Import Existing Data
- Options:
  - Start fresh (recommended for new businesses)
  - Import from QuickBooks (CSV export)
  - Import from Xero (CSV export)
  - Upload bank statement CSV
- Skip option available

### Step 5 — Meet Your AI CFO
- Animated intro card
- Show 3 things it will do: morning briefings, cash flow forecast, chat
- "Ask your first question" input — pre-seeds first AI chat session
- Complete → redirect to dashboard

---

## 3. Overview Dashboard

**Route:** `/overview`

### Daily Briefing Card *(Top of page — most prominent)*
```
┌─────────────────────────────────────────────────────────┐
│  📊 Your Morning Briefing — Wednesday, March 4          │
│                                                          │
│  Your cash balance is ₦6.2M — up ₦340K from yesterday. │
│  3 invoices totalling ₦1.2M are overdue.                │
│  Your rent of ₦450,000 is due in 4 days.               │
│                                  [Ask AI] [Read More →] │
└─────────────────────────────────────────────────────────┘
```
- Collapsed by default (2-3 lines)
- Expands to full briefing
- Unread = subtle glowing border
- "Ask AI" opens chat with briefing context pre-loaded

### KPI Cards *(4-column grid)*
| Card | Content |
|------|---------|
| Cash Balance | Total across all accounts, trend vs yesterday |
| Monthly Revenue | MTD revenue, % vs last month |
| Monthly Expenses | MTD expenses, % vs last month |
| Net Profit | MTD profit, margin % |

Each card:
- Large formatted number (Instrument Serif font)
- Trend indicator: green up arrow / red down arrow
- Sparkline mini chart (last 30 days)
- Skeleton loader while fetching

### Cash Flow Chart *(Full width)*
- 90-day area chart
- Past 30 days: solid line (actual)
- Next 60 days: dashed line (forecast)
- Cash gap zones: red shaded areas
- Hover tooltip: date + projected balance
- Toggle: 30d / 60d / 90d
- "Run Scenario" button → opens scenario planner modal

### Alerts Strip
- Horizontal scrollable strip of alert cards
- Critical alerts: red border, bold
- Warning: amber border
- Each card: icon + short message + action button
- "View all alerts" → `/ai/alerts`

### Recent Transactions *(Last 10)*
- Date, description, category icon, account, amount
- Income: green amount, Expense: red amount
- Click row → transaction detail drawer
- "View all" → `/transactions`

### Outstanding Invoices *(Top 5 overdue)*
- Contact name, invoice number, amount, days overdue
- Overdue days badge (red if > 30 days)
- "Send Reminder" quick action
- "View all" → `/invoices`

---

## 4. AI CFO Chat

**Route:** `/ai/chat` and `/ai/chat/[sessionId]`

### Layout
```
┌──────────────┬─────────────────────────────────────────┐
│ Past Sessions│           Chat Area                      │
│              │                                          │
│ Today        │  ┌──────────────────────────────────┐  │
│ • Cash flow  │  │  AI CFO Avatar + greeting         │  │
│ • Invoices   │  └──────────────────────────────────┘  │
│              │                                          │
│ Yesterday    │        [User message bubble]             │
│ • Q3 review  │                                          │
│              │  ┌──────────────────────────────────┐  │
│ + New Chat   │  │  AI response with chart           │  │
│              │  └──────────────────────────────────┘  │
│              │                                          │
│              │  ┌──────────────────────────────────┐  │
│              │  │  Type your question...    [Send]  │  │
│              │  └──────────────────────────────────┘  │
└──────────────┴─────────────────────────────────────────┘
```

### Message Types

**User Message**
- Right-aligned
- Blue background bubble
- Timestamp on hover

**AI Message**
- Left-aligned with avatar
- White/surface card
- Full markdown rendering (bold, lists, tables, code)
- Copy button (top right)
- Thumbs up/down feedback
- Timestamp on hover

**Tool Call Indicator** *(shown while AI fetches data)*
```
  ⟳ Looking up your transaction history...
  ⟳ Calculating your cash flow forecast...
```
- Animated spinner
- Disappears when data returns

**Chart Response** *(when AI returns numerical data)*
- Inline Recharts component rendered within AI message
- Chart type auto-selected (bar for comparisons, line for trends, pie for breakdowns)
- Fully interactive — hover tooltips, zoom
- "Download chart" button

**Table Response**
- Formatted data table within AI message
- Sortable columns
- "Export CSV" button

### Input Area Features
- Multi-line textarea (auto-expands)
- Send: Enter key (Shift+Enter = newline)
- Attach file icon (for receipts)
- Voice input icon
- Character counter (max 2000)
- Disabled with "Upgrade to continue" if query limit reached

### Suggested Prompts *(shown on empty chat)*
```
  💰 How's my cash flow looking?
  📄 Which clients owe me money?
  👥 Can I afford to hire someone?
  📊 Show my top expenses this month
  ⚠️  Are there any issues I should know about?
```

### Follow-up Suggestions *(after each AI response)*
- 3 contextual follow-up questions as clickable chips
- Auto-generated based on conversation context

---

## 5. Daily Briefing

**Route:** `/ai/briefing`

### Briefing List
- Today's briefing at top, highlighted
- Last 30 briefings in reverse chronological order
- Read/unread indicator
- Preview first sentence

### Briefing Detail
- Full AI-generated text with proper formatting
- Sections: Cash Position, Actions Needed, Yesterday's Activity, Outlook
- "Ask follow-up" button → opens chat with briefing as context
- Share button (copy link)
- Unread → mark as read automatically on view

---

## 6. Cash Flow Forecast & Scenarios

**Route:** `/ai/forecast`

### Forecast View
- Large area chart: 90-day projection
- Table below chart: weekly summary of projected balance
- Cash gap alerts: specific dates where balance goes negative
- Confidence intervals shown as shaded band around forecast line
- Refresh button with timestamp of last calculation

### Assumptions Panel *(collapsible sidebar)*
- Lists what the model is assuming:
  - Recurring salary: ₦1.8M on 25th each month
  - Outstanding invoice from XYZ at 70% probability
  - Monthly rent: ₦450K due March 15
- Edit assumptions → triggers forecast recalculation

### Scenario Planner *(tab within forecast page)*

**Scenario Types:**

**Hire Someone**
```
Number of hires:     [ 2 ]
Monthly salary each: [ ₦200,000 ]
Start date:          [ April 1, 2025 ]
                                [Calculate Impact]
```

**Change Pricing**
```
Revenue category:    [ All Services ▼ ]
Price change:        [ +10% ]
Expected start:      [ Next Month ]
                                [Calculate Impact]
```

**Take a Loan**
```
Loan amount:         [ ₦5,000,000 ]
Interest rate:       [ 18% annual ]
Repayment period:    [ 12 months ]
                                [Calculate Impact]
```

**After calculation:**
- Side-by-side chart: Current vs Scenario
- Impact summary: "This hire reduces your runway by 18 days"
- AI recommendation based on scenario
- Save scenario with a name
- Compare saved scenarios

---

## 7. Alerts Center

**Route:** `/ai/alerts`

### Alert List
- Tabs: All / Critical / Warnings / Info / Resolved
- Each alert card:
  - Severity icon + color
  - Title and description
  - Affected entity (transaction, invoice, account)
  - Time detected
  - Action buttons: Resolve, Dismiss, View Detail
- Bulk resolve/dismiss

### Alert Detail *(drawer)*
- Full AI explanation of why this was flagged
- Supporting data (the transaction, the pattern, etc.)
- Suggested actions
- Link to affected entity
- Resolution notes input

### Alert Settings *(gear icon)*
- Toggle per alert type on/off
- Sensitivity slider for anomaly detection (Low / Medium / High)
- Notification channel per severity

---

## 8. Transactions

**Route:** `/transactions`

### Transaction Table
**Columns:** Date | Description | Category | Account | Amount | Status

**Filters Bar:**
- Date range picker
- Category multi-select
- Account multi-select
- Amount range (min/max)
- Status: All / Reconciled / Unreconciled / Flagged

**Features:**
- Instant search (debounced, searches description)
- Sort by any column
- Bulk select + bulk actions (categorize, reconcile, export)
- CSV/Excel export of filtered results
- Infinite scroll (load 50 at a time)
- Anomaly flag icon (⚠️) on flagged transactions

### Transaction Detail Drawer
*(Slides in from right, page stays in background)*
- All transaction fields editable inline
- Category selector with search
- Account selector
- Tags input
- Notes textarea
- Receipt attachment (upload or view existing)
- Link to invoice (search and link)
- View journal entry button
- "Split Transaction" option
- Audit history (who changed what, when)

### Add Transaction Modal
- Date, description, amount, currency
- Type: Income / Expense / Transfer
- Category (searchable)
- Account (searchable)
- Contact (optional)
- Recurring toggle → set frequency
- Save and add another checkbox

### Import Flow *(modal/page)*
1. Upload CSV file (drag and drop)
2. Map columns: "Your CSV column X" → "Our field Y"
3. Preview: first 10 rows with mapped values
4. Validation errors highlighted in red
5. Confirm import
6. Results: "127 transactions imported, 3 duplicates skipped"

---

## 9. Invoices

**Route:** `/invoices`

### Invoice List
**Views:** Kanban (by status) | List

**Kanban Columns:** Draft | Sent | Overdue | Paid | Void

**List Columns:** Number | Customer | Issue Date | Due Date | Amount | Status

**Quick Actions per invoice:**
- Draft: Edit, Send, Delete
- Sent: Record Payment, Send Reminder, View PDF
- Overdue: Record Payment, Send Reminder (highlighted)
- Paid: View, Duplicate

### Invoice Editor `/invoices/new` and `/invoices/[id]`

**Layout:** Left — form inputs | Right — live PDF preview (on desktop)

**Header Section:**
- Your company info (auto-filled from settings)
- Invoice number (auto-generated, editable)
- Customer selector (search existing or create new)
- Invoice date + due date
- Payment terms preset (Net 15 / Net 30 / Net 60 / Custom / Due on Receipt)

**Line Items:**
- Description | Quantity | Unit Price | Tax Rate | Amount
- Add line item button
- Remove line item button
- Reorder by drag-and-drop
- Inline calculations (quantity × price = amount)

**Totals:**
- Subtotal
- Discount (% or fixed amount)
- Tax (by line item or overall)
- **Grand Total** (large, prominent)

**Bottom Section:**
- Currency selector
- Notes to customer (free text)
- Payment instructions
- Attachment upload (supporting docs)

**Actions:**
- Save Draft
- Preview PDF
- Send to Customer (opens send modal)
- Duplicate

**Send Modal:**
- To: customer email (pre-filled)
- Subject: editable
- Message: editable template
- Attach PDF: checkbox (default on)
- Send + mark as Sent

### Record Payment Modal
- Amount received (default: full outstanding amount)
- Payment date
- Payment method (Bank Transfer, Cash, Card, Cheque, Other)
- Reference number
- Notes
- Creates transaction automatically

---

## 10. Chart of Accounts

**Route:** `/accounts`

### Accounts Tree View
- Hierarchical display: account type → category → account
- Collapsible sections
- Each account shows: Code | Name | Type | Balance
- Balance color coded: positive (green), negative (red)
- Inactive accounts greyed out (toggle show/hide)

### Account Detail `/accounts/[id]`
- Account info header
- Transaction ledger for this account
- Date range filter
- Opening balance, closing balance
- Export ledger CSV

### Add/Edit Account Modal
- Account code (auto-suggested next code)
- Account name
- Account type (Asset/Liability/Equity/Revenue/Expense)
- Parent account (optional)
- Description
- Opening balance + date (for existing businesses)

---

## 11. Financial Reports

**Route:** `/reports`

### Report Selector Page
- Cards for each report type with description and icon
- Click card → configure and run report

### Report Configuration
*(Same UI for all reports)*
- Date range picker with presets
- Compare to previous period toggle
- Additional options per report type
- Run Report button

### Profit & Loss Report
- Revenue section (collapsible by category)
- Gross Profit line
- Operating Expenses (collapsible)
- EBITDA line
- Net Profit line
- Comparison column (if enabled): shows variance amount and %
- Variance: green (improvement), red (deterioration)

### Balance Sheet Report
- Assets column (Current + Non-current)
- Liabilities + Equity column
- Total validation: Assets = Liabilities + Equity
- Shows as of selected date

### AR/AP Aging Reports
- Summary row totals
- Columns: 0-30 days | 31-60 days | 61-90 days | 90+ days
- Color intensity increases with age
- Click contact name → filtered invoice list
- "Send All Reminders" bulk action

### AI Report Summary *(on every report)*
- "Explain this report" button
- Generates plain-English 3-paragraph AI summary
- Highlights most important observations
- Suggests one action based on findings

---

## 12. Profitability Analytics

**Route:** `/analytics`

### Overview Tab
- Gross margin trend (line chart, 12 months)
- Expense breakdown (donut chart by category)
- Revenue breakdown (donut chart by source)
- Top 5 most profitable clients (horizontal bar)
- Bottom 5 least profitable clients (horizontal bar)

### By Client Tab
- Table: Client | Revenue | Costs | Gross Profit | Margin %
- Sortable columns
- Click client → filtered invoice + transaction view
- Margin trend per client (sparkline in table)

### By Product/Service Tab
- Same layout as client tab but for product/service lines
- Requires transactions to be tagged with product/service

### Trend Tab
- Month-by-month profit margin trend
- Compare up to 3 metrics on one chart
- Year-over-year comparison toggle

---

## 13. Bank Connections

**Route:** `/bank`

### Connected Accounts List
Each connection card shows:
- Bank name + logo
- Account name + masked number
- Account type (Checking, Savings, Business)
- Current balance
- Last synced: "2 hours ago"
- Sync status: Healthy / Error / Pending
- Actions: Sync Now, Disconnect

### Connect New Bank
- Modal with provider options:
  - **Mono** — for Nigerian banks (GTB, Access, Zenith, UBA, etc.)
  - **Plaid** — for international banks
- Click → launches provider widget
- On success: back to connections list with new account

### Sync History *(per connection)*
- Drawer showing last 20 sync attempts
- Each: timestamp, transactions fetched, status, errors

---

## 14. Document Upload (OCR)

**Route:** `/documents`

### Upload Area
- Large drag-and-drop zone
- Accepts: JPG, PNG, PDF (max 10MB)
- Multiple file upload
- Progress indicator per file
- Processing status: Uploading → Extracting → Review

### Extraction Review
Each extracted document shows:
- Thumbnail of original
- Extracted fields:
  - Vendor name
  - Date
  - Amount
  - Tax amount
  - Line items (if invoice)
- Confidence score per field (high = green, low = yellow highlight)
- Edit any field before confirming
- Account assignment (required before confirming)
- **Confirm → creates transaction/invoice**
- **Reject → discards**

---

## 15. Settings

### Business Settings `/settings/business`
- Company name, registration number
- Address (multi-line)
- Phone, email, website
- Logo upload (shown on invoices)
- Invoice color/branding
- Default payment terms
- Default currency

### Team `/settings/team`
- Current members table: Name | Email | Role | Status | Actions
- Invite by email: email input + role selector + send
- Pending invitations list with resend/cancel
- Role change dropdown per member
- Remove member (with confirmation)

### Security `/settings/security`
- Change password form
- 2FA: enable/disable, QR code setup
- Active sessions list with revoke option
- Login history (last 20 logins with IP + device)

### Notifications `/settings/notifications`
- Toggle matrix: Notification Type × Channel (Email / SMS / In-app)
- Daily briefing time preference
- Alert sensitivity preference
- Phone number for SMS (with verification)

### Billing `/settings/billing`
- Current plan card with features
- Usage meter: AI queries, bank connections, users
- Upgrade/downgrade plan → pricing page
- Payment method (card on file, update)
- Billing history table: Date | Amount | Status | Download

---

## 16. Notifications System

### Notification Bell *(in header)*
- Badge with unread count
- Dropdown on click showing last 10 notifications
- "Mark all read" button
- "View all" link to full notification page

### Notification Types & Design
| Type | Icon | Color |
|------|------|-------|
| Critical Alert | ⚠️ | Red |
| Warning Alert | 🔔 | Amber |
| Invoice Overdue | 📄 | Amber |
| Payment Received | 💰 | Green |
| Daily Briefing | 📊 | Blue |
| Bank Sync Error | 🏦 | Red |
| System Info | ℹ️ | Grey |

### Real-time Delivery
- SignalR connection for live push while app is open
- New notification: toast appears bottom-right
- Bell badge increments
- Critical notifications: full-page banner (cannot dismiss without action)

---

## 17. Global Search

**Trigger:** `Cmd+K` (Mac) or `Ctrl+K` (Windows)

### Search Modal
- Full-screen overlay
- Instant search as you type
- Categories in results:
  - Transactions (matching description)
  - Invoices (matching number or contact)
  - Contacts
  - Accounts
  - Reports
  - Settings pages
  - AI Chat (suggested prompts)

### Keyboard Navigation
- Arrow keys to navigate results
- Enter to select
- Escape to close

---

## 18. Mobile Experience

### Bottom Navigation *(replaces sidebar on mobile)*
- Home (Overview)
- Transactions
- Invoices
- AI Chat
- More (Settings, Reports, etc.)

### Mobile-Specific Optimizations
- Swipe right on transaction to quick-categorize
- Swipe left to view actions (edit, delete)
- Pull-to-refresh on list views
- Camera button on transaction add form → launch OCR
- Floating action button (+) for quick add
- Chat input stays above keyboard on mobile (iOS fix)
- Charts simplified on small screens (less data points, larger touch targets)

### Progressive Web App (PWA)
- Installable on iOS and Android home screen
- Offline: last-viewed data cached, queue changes when offline
- Push notifications via service worker
- App icon, splash screen, standalone display mode
