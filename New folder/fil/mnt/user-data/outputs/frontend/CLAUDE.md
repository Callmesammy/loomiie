# CLAUDE.md — AI CFO Frontend (Next.js)

## Project Overview
AI CFO frontend is a Next.js 14 App Router application providing a world-class financial intelligence dashboard. It connects to the .NET backend API and delivers an experience that feels more like talking to a smart financial advisor than using accounting software. Fast, beautiful, and AI-first.

---

## Technology Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS v3 |
| UI Components | shadcn/ui |
| State Management | Zustand (global) + React Query (server state) |
| API Client | Axios + React Query (TanStack Query v5) |
| Forms | React Hook Form + Zod |
| Charts | Recharts |
| AI Chat UI | Custom SSE streaming component |
| Real-time | Socket.io client (SignalR) |
| Animations | Framer Motion |
| Date handling | date-fns |
| Number formatting | Intl.NumberFormat + numeral.js |
| Icons | Lucide React |
| Notifications | Sonner (toast) |
| Tables | TanStack Table v8 |
| PDF Viewer | react-pdf |
| File Upload | react-dropzone |
| Auth | next-auth v5 (Auth.js) |
| Testing | Vitest + React Testing Library + Playwright |

---

## Project Structure

```
src/
├── app/                          ← Next.js App Router pages
│   ├── (auth)/                   ← Auth layout (no sidebar)
│   │   ├── login/
│   │   ├── register/
│   │   ├── forgot-password/
│   │   └── onboarding/           ← New user setup wizard
│   ├── (dashboard)/              ← Main app layout (with sidebar)
│   │   ├── layout.tsx            ← Sidebar + header shell
│   │   ├── overview/             ← Main dashboard / KPIs
│   │   ├── ai/
│   │   │   ├── chat/             ← AI CFO chat interface
│   │   │   ├── briefing/         ← Daily briefings
│   │   │   ├── alerts/           ← Anomaly alerts
│   │   │   └── forecast/         ← Cash flow forecast
│   │   ├── transactions/         ← Transaction list + detail
│   │   ├── invoices/             ← AR/AP management
│   │   ├── accounts/             ← Chart of accounts
│   │   ├── reports/              ← Financial reports
│   │   ├── analytics/            ← Profitability intelligence
│   │   ├── bank/                 ← Bank connections
│   │   ├── documents/            ← OCR document upload
│   │   └── settings/             ← Profile, billing, team
│   ├── api/                      ← Next.js API routes (thin proxies + auth)
│   └── layout.tsx                ← Root layout
├── components/
│   ├── ui/                       ← shadcn/ui base components
│   ├── layout/                   ← Sidebar, Header, Breadcrumb
│   ├── ai/                       ← Chat, BriefingCard, AlertCard
│   ├── charts/                   ← Recharts wrappers with consistent styling
│   ├── finance/                  ← InvoiceCard, TransactionRow, etc.
│   ├── forms/                    ← Reusable form components
│   └── shared/                   ← Loading states, empty states, error states
├── lib/
│   ├── api/                      ← API client + all query/mutation hooks
│   │   ├── client.ts             ← Axios instance with auth interceptors
│   │   ├── auth.ts               ← Auth queries
│   │   ├── transactions.ts       ← Transaction hooks
│   │   ├── invoices.ts           ← Invoice hooks
│   │   ├── reports.ts            ← Report hooks
│   │   └── ai.ts                 ← AI chat, briefing, forecast hooks
│   ├── store/                    ← Zustand stores
│   │   ├── auth.store.ts
│   │   ├── ui.store.ts           ← Sidebar state, modals
│   │   └── notifications.store.ts
│   ├── utils/                    ← Formatters, helpers
│   └── validations/              ← Zod schemas
├── types/                        ← TypeScript interfaces and types
├── hooks/                        ← Custom React hooks
└── styles/                       ← Global styles, Tailwind config
```

---

## Design System

### Color Palette
```css
/* Brand Colors */
--primary: #0066FF          /* Primary blue */
--primary-foreground: #FFFFFF

/* Financial Status Colors */
--positive: #16A34A          /* Profit, received, healthy */
--negative: #DC2626          /* Loss, overdue, critical */
--warning: #D97706           /* Attention needed */
--neutral: #6B7280           /* Neutral info */

/* Dark Mode First */
--background: #0A0F1E        /* Deep navy background */
--surface: #111827           /* Card surfaces */
--surface-elevated: #1F2937  /* Elevated cards */
--border: #374151            /* Subtle borders */
--text-primary: #F9FAFB      /* Primary text */
--text-secondary: #9CA3AF    /* Secondary text */
--text-muted: #6B7280        /* Muted text */
```

### Typography
```css
/* Display — for large numbers and headings */
font-family: 'Instrument Serif', Georgia, serif;

/* Body — for everything else */
font-family: 'DM Sans', system-ui, sans-serif;

/* Mono — for numbers, codes, amounts */
font-family: 'JetBrains Mono', 'Fira Code', monospace;
```

### Money Formatting
```typescript
// Always use this utility — never format money inline
formatMoney(1500000, 'NGN')   → "₦1,500,000.00"
formatMoney(49.99, 'USD')     → "$49.99"
formatMoney(1200, 'GBP')      → "£1,200.00"

// Compact format for charts and summaries
formatMoneyCompact(1500000, 'NGN')  → "₦1.5M"
formatMoneyCompact(49000, 'USD')    → "$49K"
```

---

## Key Conventions

### File Naming
```
app/overview/page.tsx           ← Route pages always page.tsx
components/ai/ChatMessage.tsx   ← Components: PascalCase
lib/api/transactions.ts         ← Utilities: camelCase
types/invoice.types.ts          ← Type files: camelCase.types.ts
```

### Component Structure
```tsx
// Always this order in component files:
// 1. Imports
// 2. Types/interfaces
// 3. Component function
// 4. Subcomponents (if small)
// 5. Export

interface TransactionRowProps {
  transaction: Transaction;
  onSelect: (id: string) => void;
}

export function TransactionRow({ transaction, onSelect }: TransactionRowProps) {
  // hooks first
  // derived state
  // handlers
  // render
}
```

### Data Fetching Pattern
```tsx
// Always use React Query hooks — never fetch directly in components
// Define hooks in lib/api/ — never inline in components

// lib/api/transactions.ts
export function useTransactions(filters: TransactionFilters) {
  return useQuery({
    queryKey: ['transactions', filters],
    queryFn: () => apiClient.get('/transactions', { params: filters }),
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
}

// Component usage
const { data, isLoading, error } = useTransactions({ status: 'pending' });
```

### Forms Pattern
```tsx
// Always React Hook Form + Zod — never uncontrolled forms
const schema = z.object({
  amount: z.number().positive('Amount must be positive'),
  description: z.string().min(1, 'Description is required'),
});

const form = useForm<z.infer<typeof schema>>({
  resolver: zodResolver(schema),
});
```

### Error Handling
```tsx
// Every async operation must handle errors visibly
// Use error boundaries for page-level errors
// Use toast for operation errors
// Use inline validation for form errors
// NEVER silently catch errors

try {
  await createInvoice(data);
  toast.success('Invoice created successfully');
} catch (error) {
  toast.error('Failed to create invoice. Please try again.');
  // Log to Sentry
}
```

---

## AI Chat — Implementation Notes

### SSE Streaming
```typescript
// The chat endpoint streams via Server-Sent Events
// Use this pattern for consuming SSE in React:

async function sendMessage(sessionId: string, content: string) {
  const response = await fetch(`/api/ai/chat/sessions/${sessionId}/messages`, {
    method: 'POST',
    body: JSON.stringify({ content }),
    headers: { 'Content-Type': 'application/json' },
  });

  const reader = response.body?.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader!.read();
    if (done) break;
    const chunk = decoder.decode(value);
    // Append chunk to message state
    setStreamingMessage(prev => prev + chunk);
  }
}
```

### Chat UI Rules
- User messages: right-aligned, primary blue background
- AI messages: left-aligned, surface card with AI avatar
- Show typing indicator (3 animated dots) while streaming
- Render markdown in AI messages (use react-markdown)
- Code blocks in AI responses use syntax highlighting
- Charts/tables mentioned by AI render as interactive components
- Suggested follow-up questions shown after each AI response
- "Copy to clipboard" on every AI message
- Timestamp on hover only (not always visible)

---

## Performance Rules

- All pages use React Suspense with skeleton loaders — no layout shift
- Charts lazy-loaded — don't block initial page render
- Infinite scroll or cursor pagination for transaction lists (never load all)
- Images optimized with `next/image`
- Fonts preloaded in `app/layout.tsx`
- API responses cached in React Query — avoid redundant network calls
- Bundle size: run `next build --analyze` before each release
- Core Web Vitals targets: LCP < 2.5s, FID < 100ms, CLS < 0.1

---

## Responsive Design

- Mobile-first Tailwind classes
- Sidebar collapses to bottom nav on mobile
- Charts reflow for small screens
- AI chat is full-screen on mobile
- Tables scroll horizontally on mobile with frozen first column
- All modals are full-screen on mobile

---

## Accessibility

- All interactive elements must have `aria-label` or visible label
- Color is never the only indicator of status (use icons + text too)
- Keyboard navigation must work for all core flows
- Focus management in modals and drawers
- Screen reader announcements for AI streaming responses

---

## Environment Variables

```env
# API
NEXT_PUBLIC_API_URL=http://localhost:7001/api
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Auth
AUTH_SECRET=<secret>
AUTH_URL=http://localhost:3000

# Bank Integrations (public keys only)
NEXT_PUBLIC_MONO_PUBLIC_KEY=<key>
NEXT_PUBLIC_PLAID_ENV=sandbox

# Analytics
NEXT_PUBLIC_POSTHOG_KEY=<key>
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

# Error tracking
NEXT_PUBLIC_SENTRY_DSN=<dsn>
```

---

## Getting Started

```bash
# Install
git clone https://github.com/your-org/aicfo-frontend
cd aicfo-frontend
npm install

# Setup environment
cp .env.example .env.local
# Fill in your API URL and keys

# Run development
npm run dev
# App at http://localhost:3000

# Run tests
npm run test          # Unit tests (Vitest)
npm run test:e2e      # E2E tests (Playwright)

# Build
npm run build
npm run start
```
