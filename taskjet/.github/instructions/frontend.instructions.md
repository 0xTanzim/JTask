---
description: 'Frontend development guidelines for Next.js App Router, React Query, and UI components'
applyTo: '**'
---

# Frontend Development Guidelines

## 1. Next.js App Router Practices

- Default to Server Components for data fetching, SEO, and reduced bundle size. Promote Client Components only when you need interactivity, browser APIs, or React state.
- Use route groups and nested layouts to scope auth, dashboard, and marketing shells. Keep shared providers (React Query, theme) at the smallest possible boundary.
- Provide `loading.tsx` and `error.tsx` for every async route segment. Wrap critical sections in `<Suspense>` with skeletons for progressive rendering.
- Generate metadata via `generateMetadata` or the route config so OG tags and canonical URLs stay accurate per tenant.

### Good Example - Server Component

```tsx
// app/dashboard/page.tsx
export default async function DashboardPage() {
  const data = await getDashboardStats(); // Server-side fetch
  return <DashboardView initialData={data} />;
}
```

### Bad Example - Unnecessary Client Component

```tsx
'use client'; // Avoid if not needed
export default function DashboardPage() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch('/api/stats').then(setData);
  }, []);
  if (!data) return <Spinner />;
  return <div>{data.title}</div>;
}
```

## 2. Data & State Management

- React Query is the default for server state. Namespaces: `['bookings', tenantId]`, `['staff', tenantId, date]`, etc. Configure `staleTime` based on feature SLAs.
- Use optimistic updates for lightweight mutations (booking status, notes). Provide rollback handlers to restore cache on failure.
- Keep local UI state (`useState`, `useReducer`) scoped to the component tree. Avoid duplicating server data in local state; subscribe to the query cache instead.

## 3. Forms & Validation

- Compose forms with React Hook Form + Zod. Reuse shared input components from `apps/web/components/forms` so labels, help text, and errors stay consistent.
- Show validation inline, use `aria-live="polite"` for error summaries, and disable submit buttons only while a mutation is pending.
- For multi-step flows, persist draft data via URL search params or React Query cache so refreshes do not lose progress.

## 4. UI System & Accessibility

- Use shadcn/ui components wrapped in our tokens (`@/components/ui`). Respect Tailwind spacing, typography, and radius scale.
- Every interactive element needs a visible label or `aria-label`. Keyboard support: tab order, `Enter/Space` activation, `role="button"` fallback only when native semantics aren’t possible.
- Maintain WCAG 2.1 AA: 4.5:1 contrast for text, 3:1 for large text/UI. Provide more than color (icons, text) to communicate status.
- Responsive layout targets: mobile-first (`grid-cols-1`), `md` for tablets, `lg` for desktop. Minimum touch target 44×44px.
- Respect reduced-motion preferences using `motion-reduce:` utilities or Framer Motion’s `useReducedMotion` hook.

## 5. Internationalization (i18n)

- Use `next-intl` for all user-facing text. Store messages in `apps/web/i18n/{locale}/...json` files, organized by feature.
- Wrap route segments with `IntlProvider` at the highest level (e.g., `app/[locale]/layout.tsx`). Use the `useTranslations` hook in components to fetch localized strings.
- Format dates, numbers, and currencies using `IntlProvider` context. Avoid hard-coded formats; leverage locale-aware formatting functions.

## 6. Loading, Empty, and Error States

- Provide skeletons for list/detail views, not spinners. Keep skeleton shapes aligned with final layouts to avoid layout shift.
- Design empty states with icon, headline, supporting copy, and a primary action that nudges the user forward.
- Error presentation includes a retry CTA and, when possible, a “details” disclosure for support. Log console errors via the shared logger.

## 7. Performance & Assets

- Use `next/image` with the CDN loader for all media. Provide width/height to prevent CLS.
- Lazy-load heavy feature modules via `next/dynamic` and show intent-specific fallbacks (skeleton cards, placeholder charts).
- Memoize expensive components (`React.memo`, `useMemo`, `useCallback`) only when profiling proves re-render pressure.
- Monitor Core Web Vitals via the built-in `reportWebVitals`; log results with tenant context.

## 8. Styling Conventions

- Co-locate component styles with the component using Tailwind classes or `cn()` helpers. Avoid global CSS except for tokens and root variables.
- Support dark mode by referencing CSS variables (`bg-background`, `text-foreground`) rather than hard-coded colors.
- Keep component files under ~200 LOC; break large UI flows into composable subcomponents.

## 9. API Integration & Auth

- API clients live in `apps/web/lib/api`. Each function returns typed data (Zod inferred) and throws a domain error shape consumed by React Query.
- Include tenant context in every request (headers or route segment). Never read tenant IDs from query params alone.
- Handle token refresh through the shared auth hook; UI components should only care about the presence of `session` data.

## 10. Testing Strategy

- Use React Testing Library for component tests. Prefer behavior over implementation (find by role/text, simulate keyboard input).
- Add Playwright or Cypress happy-path tests for key journeys (search → book → manage). Mock network calls with MSW.
- Snapshot or visual-regression test critical marketing components to catch layout regressions.

Following these patterns keeps the Next.js surface fast, accessible, and consistent with the shared design system.