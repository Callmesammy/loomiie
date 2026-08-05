# PLAN.md — AI CFO Frontend Development Plan

## Vision
Build a financial intelligence interface that feels nothing like traditional accounting software. Think of it as a conversation with a smart financial advisor — clean, fast, insightful, and proactive. The AI is front and center, not an afterthought.

---

## Development Phases

---

## Phase 1 — Foundation & Shell (Weeks 1–2)

**Goal:** Everything visible, nothing that works yet. The shell should feel beautiful.

### 1.1 Project Setup
- [ ] Next.js 14 with App Router, TypeScript strict mode
- [ ] Tailwind CSS configured with custom design tokens
- [ ] shadcn/ui initialized with custom theme
- [ ] Framer Motion installed
- [ ] ESLint + Prettier + Husky pre-commit hooks
- [ ] Absolute imports configured (`@/components`, `@/lib`, etc.)
- [ ] Environment variable schema with type safety (T3 Env)

### 1.2 Design System Foundation
- [ ] Custom Tailwind config with brand colors, typography, spacing
- [ ] Font loading: Instrument Serif (display) + DM Sans (body) + JetBrains Mono (numbers)
- [ ] `formatMoney()`, `formatMoneyCompact()`, `formatPercent()` utilities
- [ ] Date formatting utilities with timezone support
- [ ] Dark mode as default (light mode toggle supported)
- [ ] CSS variables for all theme tokens

### 1.3 App Shell
- [ ] Root layout with metadata, font loading, providers
- [ ] `QueryProvider` — React Query setup with dev tools
- [ ] `AuthProvider` — next-auth session provider
- [ ] `ToastProvider` — Sonner notifications
- [ ] Error boundary at root level

### 1.4 Dashboard Layout
- [ ] Sidebar navigation component
  - Logo + product name
  - Navigation items with active state
  - Collapsed/expanded state (saved to localStorage)
  - User profile section at bottom
  - Plan/usage indicator
- [ ] Top header bar
  - Page title + breadcrumb
  - Global search (Cmd+K)
  - Notifications bell with unread count
  - User avatar menu
- [ ] Main content area with proper scroll behavior
- [ ] Mobile: bottom tab navigation replacing sidebar
- [ ] Skeleton loader for the entire shell (instant paint)

### 1.5 Auth Pages
- [ ] Login page — email/password with 2FA step
- [ ] Register page — name, email, password, company name
- [ ] Forgot password page
- [ ] Reset password page
- [ ] Auth redirect logic (protect dashboard routes)

---

## Phase 2 — Onboarding Flow (Week 3)

**Goal:** First-time users go from signup to "wow" in under 5 minutes.

### 2.1 Onboarding Wizard
- [ ] Step 1: Business profile — name, industry, country, currency
- [ ] Step 2: Fiscal year setup — start month, accounting method
- [ ] Step 3: Connect first bank account (Mono/Plaid) or skip
- [ ] Step 4: Import existing data or start fresh
- [ ] Step 5: Meet your AI CFO — brief intro to the chat feature
- [ ] Progress indicator and ability to skip/return to steps
- [ ] Animated transitions between steps
- [ ] Completion: redirect to dashboard with first daily briefing generating

---

## Phase 3 — Overview Dashboard (Week 4)

**Goal:** The first screen users see every day. Must communicate the full financial picture in under 10 seconds.

### 3.1 KPI Cards Row
- [ ] `CashBalanceCard` — total balance across all accounts, trend arrow
- [ ] `MonthlyRevenueCard` — MTD revenue vs last month
- [ ] `MonthlyExpensesCard` — MTD expenses vs last month
- [ ] `NetProfitCard` — MTD net profit with margin %
- [ ] All cards animate in on load (staggered Framer Motion)
- [ ] Hover state shows mini sparkline chart

### 3.2 Daily Briefing Panel
- [ ] Top of dashboard — most prominent element
- [ ] Shows today's AI-generated briefing
- [ ] Expandable — collapsed shows headline, expanded shows full briefing
- [ ] "Ask a follow-up" button opens AI chat pre-loaded with context
- [ ] Unread indicator — glowing dot if not yet read today

### 3.3 Cash Flow Forecast Chart
- [ ] 90-day area chart — historical (solid) + projected (dashed)
- [ ] Cash gap zones highlighted in red
- [ ] Hover tooltip shows date, projected balance, confidence
- [ ] Toggle: 30 / 60 / 90 days
- [ ] "What if" button opens scenario planner

### 3.4 Alerts Panel
- [ ] Critical alerts shown inline — can't be missed
- [ ] Color coded: red (critical), amber (warning), blue (info)
- [ ] One-click resolve/dismiss
- [ ] "View all alerts" link

### 3.5 Quick Actions
- [ ] Add Transaction
- [ ] Create Invoice
- [ ] Upload Receipt
- [ ] Ask AI CFO

### 3.6 Recent Activity Feed
- [ ] Last 10 transactions with category icon, description, amount
- [ ] Color: green for income, red for expense
- [ ] "View all" links to transactions page

---

## Phase 4 — AI CFO Chat (Week 5)

**Goal:** The crown jewel of the product. Must feel magical.

### 4.1 Chat Layout
- [ ] Full-page chat interface (like Claude or ChatGPT but finance-specific)
- [ ] Persistent sidebar showing past sessions
- [ ] New chat button
- [ ] Session title (auto-generated from first message)

### 4.2 Chat Message Components
- [ ] `UserMessage` — right-aligned, blue bubble
- [ ] `AIMessage` — left-aligned with AI avatar, markdown rendered
- [ ] `ToolCallIndicator` — "Looking up your transactions..." while AI fetches data
- [ ] `StreamingMessage` — letter-by-letter appearance while streaming
- [ ] `ChartMessage` — AI response includes an embedded interactive chart
- [ ] `TableMessage` — AI response includes a formatted data table
- [ ] Typing indicator (3-dot animation)

### 4.3 Input Area
- [ ] Multi-line text input
- [ ] Send on Enter, newline on Shift+Enter
- [ ] Voice input button (Web Speech API)
- [ ] Suggested prompts shown when input is empty:
  - "How's my cash flow looking?"
  - "Which clients owe me money?"
  - "Can I afford to hire someone?"
  - "Show my expenses this month"
- [ ] Attach file button (for receipts in context)

### 4.4 Chat Intelligence Display
- [ ] When AI uses a tool, show briefly what it's doing: *"Checking your invoices..."*
- [ ] After AI responds, show 3 suggested follow-up questions
- [ ] Copy button on every AI message
- [ ] Thumbs up/down feedback on AI responses
- [ ] "Open as chart" button when AI mentions numerical data

---

## Phase 5 — Transactions (Week 6)

### 5.1 Transaction List
- [ ] Virtualized table for large datasets (TanStack Virtual)
- [ ] Columns: Date, Description, Category, Account, Amount
- [ ] Category icons (color-coded per category)
- [ ] Filter bar: date range, category, account, amount range, reconciled status
- [ ] Search: instant full-text search with highlighting
- [ ] Bulk actions: categorize, reconcile, export
- [ ] Amount displayed in account currency

### 5.2 Transaction Detail Drawer
- [ ] Slide-in drawer from right (not a new page)
- [ ] Edit category, account, description, notes, tags
- [ ] Attach receipt image
- [ ] Link to related invoice
- [ ] View matching journal entry
- [ ] Flag as anomaly or clear anomaly flag

### 5.3 Add Transaction Form
- [ ] Modal with React Hook Form + Zod validation
- [ ] Date, description, amount, currency, category, account
- [ ] Recurring transaction option
- [ ] Split transaction support

### 5.4 Import Flow
- [ ] Drag-and-drop CSV upload
- [ ] Column mapping UI (match CSV columns to our fields)
- [ ] Preview table before confirming import
- [ ] Import results: N imported, M duplicates skipped, X errors

---

## Phase 6 — Invoices (Week 7)

### 6.1 Invoice List
- [ ] Kanban-style view by status (Draft, Sent, Overdue, Paid)
- [ ] List view alternative
- [ ] Color-coded status badges
- [ ] Overdue days indicator (e.g., "14 days overdue" in red)
- [ ] Quick action: Send, Record Payment, View PDF

### 6.2 Invoice Editor
- [ ] Full-page invoice creation/edit form
- [ ] Real-time preview as user types (split view)
- [ ] Line items with add/remove
- [ ] Tax and discount application
- [ ] Customer search and create inline
- [ ] Currency selection
- [ ] Payment terms selector (Net 15/30/60/Custom)
- [ ] Notes and terms fields
- [ ] Branding settings applied (logo, colors)

### 6.3 Invoice PDF View
- [ ] In-app PDF viewer (react-pdf)
- [ ] Download button
- [ ] Share payment link
- [ ] Print support

### 6.4 Payment Recording
- [ ] Modal: amount, date, payment method
- [ ] Partial payment support
- [ ] Multi-payment history on invoice
- [ ] Auto-create transaction on payment

---

## Phase 7 — Reports (Week 8)

### 7.1 Report Builder
- [ ] Report selector: P&L, Balance Sheet, Cash Flow, AR Aging, AP Aging
- [ ] Date range picker with presets (This Month, Last Quarter, YTD, Custom)
- [ ] Comparison period toggle (vs previous period)
- [ ] Run / Refresh button
- [ ] Export: PDF, CSV, Excel

### 7.2 Report Display Components
- [ ] `ProfitLossReport` — collapsible sections, subtotals, variance columns
- [ ] `BalanceSheetReport` — two-column layout, totals validation
- [ ] `CashFlowReport` — operating/investing/financing sections
- [ ] `AgingReport` — colored age buckets (0-30, 31-60, 61-90, 90+)
- [ ] All reports printer-friendly with print stylesheet

### 7.3 AI Report Narration
- [ ] "Explain this report" button on every report
- [ ] AI generates 3-paragraph plain-English summary of findings
- [ ] Highlights most important insights and anomalies

---

## Phase 8 — Analytics & Forecasting (Week 9)

### 8.1 Cash Flow Forecast Page
- [ ] Full-page expanded forecast view
- [ ] Chart: actual vs projected with confidence bands
- [ ] Cash gap table: date, projected balance, cause, suggestion
- [ ] Assumptions panel: what the model is assuming
- [ ] Refresh forecast button

### 8.2 Scenario Planner
- [ ] "What If" tab in forecast view
- [ ] Scenario type selector (Hire, Price Change, Loan, New Expense)
- [ ] Parameter inputs per scenario type
- [ ] Side-by-side chart: baseline vs scenario
- [ ] AI narration of scenario impact
- [ ] Save scenario with a name
- [ ] Compare up to 3 saved scenarios on one chart

### 8.3 Profitability Analytics
- [ ] Top/bottom clients by margin (horizontal bar chart)
- [ ] Top/bottom products/services by margin
- [ ] Margin trend over time (line chart)
- [ ] Expense breakdown donut chart by category
- [ ] Revenue breakdown by source

---

## Phase 9 — Settings & Administration (Week 10)

### 9.1 Business Settings
- [ ] Company name, logo upload, address
- [ ] Currency and locale settings
- [ ] Fiscal year configuration
- [ ] Invoice branding (colors, logo, terms)
- [ ] Tax settings (VAT/GST rates)

### 9.2 Team Management
- [ ] Invite team members by email
- [ ] Role assignment (Admin, Accountant, Viewer)
- [ ] Remove member
- [ ] Pending invitations list

### 9.3 Bank Connections
- [ ] Connected accounts list with sync status
- [ ] Connect new bank (Mono / Plaid flow)
- [ ] Disconnect account
- [ ] Manual sync trigger
- [ ] View sync history

### 9.4 Notifications Settings
- [ ] Toggle per notification type
- [ ] Channel preference per type (email/SMS/in-app)
- [ ] Notification digest preference (instant/daily summary)
- [ ] Phone number for SMS alerts

### 9.5 Billing & Subscription
- [ ] Current plan display
- [ ] Usage meter (AI queries this month)
- [ ] Upgrade/downgrade plan
- [ ] Payment method management
- [ ] Billing history with invoice download

---

## Phase 10 — Polish & Production (Week 11)

### 10.1 Empty States
- [ ] Every list view has a designed empty state with CTA
- [ ] First-time user empty states are educational (explain the feature)
- [ ] Returning user empty states are actionable

### 10.2 Loading States
- [ ] Skeleton components for every data-loading area
- [ ] Optimistic updates for common actions (mark invoice paid, etc.)
- [ ] Page transition loading indicators

### 10.3 Error States
- [ ] API error boundary with retry button
- [ ] Form validation inline errors
- [ ] Network error global banner
- [ ] 404 and 500 error pages (branded)

### 10.4 Keyboard Shortcuts
- [ ] `Cmd+K` — global search / command palette
- [ ] `Cmd+N` — new transaction
- [ ] `Cmd+I` — new invoice
- [ ] `Cmd+/` — open AI chat
- [ ] `?` — show keyboard shortcuts modal

### 10.5 Testing
- [ ] Unit tests for all utility functions (formatMoney, date helpers)
- [ ] Component tests for complex components (Invoice Editor, Chat)
- [ ] E2E tests (Playwright): login, create invoice, pay invoice, view report
- [ ] E2E: AI chat sends message and receives streaming response

---

## Page Map

```
/login                          ← Auth
/register
/forgot-password
/onboarding

/overview                       ← Dashboard home
/ai/chat                        ← AI CFO chat
/ai/chat/[sessionId]
/ai/briefing                    ← Daily briefings
/ai/alerts                      ← All alerts
/ai/forecast                    ← Cash flow forecast

/transactions                   ← Transaction list
/transactions/[id]              ← Transaction detail

/invoices                       ← Invoice list
/invoices/new                   ← Create invoice
/invoices/[id]                  ← Invoice detail/edit

/accounts                       ← Chart of accounts
/accounts/[id]                  ← Account ledger

/reports                        ← Report selector
/reports/profit-loss
/reports/balance-sheet
/reports/cash-flow
/reports/ar-aging
/reports/ap-aging

/analytics                      ← Profitability analytics
/analytics/profitability
/analytics/expenses

/bank                           ← Bank connections
/documents                      ← OCR upload

/settings                       ← Settings hub
/settings/business
/settings/team
/settings/notifications
/settings/billing
/settings/security
```
