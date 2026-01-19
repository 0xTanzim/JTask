---
description: 'UI/UX and accessibility guidelines using shadcn/ui, Tailwind CSS, and WCAG 2.1 AA standards'
applyTo: 'apps/{web,mobile}/**/*.{tsx,ts}'
---

# UI/UX & Accessibility Guidelines

## shadcn/ui Components

### Good Example - Use design system components

```typescript
// ✅ Good: shadcn/ui with variants
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

<Button variant="default" size="lg">
  Create Booking
</Button>

<Button variant="outline" size="sm">
  Cancel
</Button>

<Card>
  <CardHeader>
    <h2>Booking Details</h2>
  </CardHeader>
  <CardContent>
    {/* Content */}
  </CardContent>
</Card>
```

**Tailwind Spacing:** Use design tokens

- `space-1` to `space-12` (4px to 48px)
- `text-xs` to `text-4xl`
- `rounded-sm`, `rounded-md`, `rounded-lg`

## Accessibility (WCAG 2.1 AA)

### Good Example - Use semantic HTML and ARIA

```typescript
// ✅ Good: Accessible form
<form onSubmit={handleSubmit}>
  <div className="space-y-4">
    <div>
      <label htmlFor="booking-date" className="text-sm font-medium">
        Booking Date
        <span className="text-red-500" aria-label="required">*</span>
      </label>
      <input
        id="booking-date"
        type="date"
        required
        aria-required="true"
        aria-describedby="date-error"
        aria-invalid={!!errors.date}
        className="mt-1"
      />
      {errors.date && (
        <p id="date-error" role="alert" className="text-red-500 text-sm">
          {errors.date.message}
        </p>
      )}
    </div>
  </div>

  <button type="submit" aria-disabled={isSubmitting}>
    {isSubmitting ? (
      <>
        <span className="sr-only">Creating booking...</span>
        <LoadingSpinner aria-hidden="true" />
      </>
    ) : (
      'Create Booking'
    )}
  </button>
</form>
```

### Good Example - Keyboard Navigation

```typescript
// ✅ Good: Keyboard support
<div
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  }}
>
  Click me
</div>
```

## Color Contrast

**Do:** Maintain WCAG AA ratios

- Normal text: 4.5:1 minimum
- Large text (18pt+): 3:1 minimum
- UI components: 3:1 minimum

```typescript
// ✅ Good: Sufficient contrast
<p className="text-gray-900 dark:text-gray-100">
  High contrast text
</p>

// ❌ Bad: Insufficient contrast
<p className="text-gray-400">
  Low contrast text (fails WCAG)
</p>
```

**Don't rely on color alone:**

```typescript
// ✅ Good: Color + icon + text
<div className="flex items-center gap-2">
  <CheckCircleIcon className="text-green-600" aria-hidden="true" />
  <span className="text-green-600 font-medium">Success</span>
</div>

// ❌ Bad: Color only
<div className="text-red-500">
  Error occurred
</div>
```

## Responsive Design

**Do:** Mobile-first approach

```typescript
// ✅ Good: Responsive classes
<div className="
  grid
  grid-cols-1       // Mobile: 1 column
  md:grid-cols-2    // Tablet: 2 columns
  lg:grid-cols-3    // Desktop: 3 columns
  gap-4
  p-4 md:p-6 lg:p-8
">
  {bookings.map(booking => (
    <BookingCard key={booking.id} booking={booking} />
  ))}
</div>
```

**Touch Targets:** Minimum 44x44px

```typescript
// ✅ Good: Touch-friendly
<button className="min-h-[44px] min-w-[44px] px-4 py-2">
  Tap me
</button>
```

## Form Design

**Do:** Clear labels and validation

```typescript
// ✅ Good: Accessible form with react-hook-form
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

function BookingForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(bookingSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="staff" className="block text-sm font-medium mb-2">
          Select Staff
        </label>
        <select
          id="staff"
          {...register('staffId')}
          className="w-full px-3 py-2 border rounded-md"
          aria-invalid={!!errors.staffId}
          aria-describedby={errors.staffId ? 'staff-error' : undefined}
        >
          <option value="">Choose a staff member</option>
          {staff.map(s => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
        {errors.staffId && (
          <p id="staff-error" role="alert" className="text-red-600 text-sm mt-1">
            {errors.staffId.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        {isSubmitting ? 'Creating...' : 'Create Booking'}
      </button>
    </form>
  );
}
```

## Loading States

**Do:** Show skeleton screens

```typescript
// ✅ Good: Skeleton loading
import { Skeleton } from '@/components/ui/skeleton';

function BookingList({ isLoading, bookings }) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="p-4 border rounded">
            <Skeleton className="h-4 w-1/3 mb-2" />
            <Skeleton className="h-3 w-full mb-2" />
            <Skeleton className="h-3 w-2/3" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      {bookings.map(booking => (
        <BookingCard key={booking.id} booking={booking} />
      ))}
    </div>
  );
}
```

## Empty States

**Do:** Provide helpful empty states

```typescript
// ✅ Good: Informative empty state
function EmptyBookings() {
  return (
    <div className="text-center py-12">
      <CalendarIcon className="mx-auto h-12 w-12 text-gray-400" aria-hidden="true" />
      <h3 className="mt-4 text-lg font-medium">No bookings yet</h3>
      <p className="mt-2 text-sm text-gray-500">
        Get started by creating your first booking.
      </p>
      <Button className="mt-6" onClick={() => navigate('/bookings/new')}>
        Create Booking
      </Button>
    </div>
  );
}
```

## Animations

**Do:** Respect reduced motion

```typescript
// ✅ Good: Reduced motion support
<div className="
  transition-all
  duration-200
  motion-reduce:transition-none
  hover:scale-105
  motion-reduce:hover:scale-100
">
  Interactive element
</div>
```

**Framer Motion:**

```typescript
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.2 }}
>
  Content
</motion.div>
```