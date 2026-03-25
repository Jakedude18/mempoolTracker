# 🔄 ShadCN Migration - Practical Examples

## Before You Start

This guide shows **concrete before/after examples** to help you migrate components.

---

## 1️⃣ SearchBar Component Migration

### ❌ Current (Tailwind Only)

```tsx
'use client'

import { Search, X } from 'lucide-react'
import { useState } from 'react'

export function SearchBar({ onSearch, isLoading = false }: SearchBarProps) {
  const [query, setQuery] = useState('')

  const handleClear = () => {
    setQuery('')
    onSearch('')
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSearch(query) }}>
      <div className="relative flex items-center gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="w-full pl-10 pr-10 py-3 rounded-lg border-2 border-slate-200 focus:border-indigo-500 focus:outline-none transition-colors bg-white"
          />
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-slate-100 rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <button type="submit" disabled={isLoading} className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700">
          Search
        </button>
      </div>
    </form>
  )
}
```

### ✅ Migrated (ShadCN)

```tsx
'use client'

import { Search, X } from 'lucide-react'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface SearchBarProps {
  onSearch: (query: string) => void
  isLoading?: boolean
}

export function SearchBar({ onSearch, isLoading = false }: SearchBarProps) {
  const [query, setQuery] = useState('')

  const handleClear = () => {
    setQuery('')
    onSearch('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="pl-10 pr-10"
            disabled={isLoading}
          />
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <Button type="submit" disabled={isLoading} variant={outline}>
          {isLoading ? 'Searching...' : 'Search'}
        </Button>
      </div>
    </form>
  )
}
```

### 🔑 Key Changes:
- Input → `<Input />` from ShadCN
- Button → `<Button />` from ShadCN
- Removed manual class definitions
- Classes handled by component variants
- Cleaner, more maintainable code

---

## 2️⃣ AdvocateCard Component Migration

### ❌ Current (Tailwind Only)

```tsx
'use client'

import { Advocate } from '@/types'
import { MapPin, Phone, Briefcase } from 'lucide-react'

export function AdvocateCard({ advocate }: AdvocateCardProps) {
  return (
    <div className="group h-full bg-white rounded-xl border-2 border-slate-100 hover:border-indigo-300 p-6 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <div className="mb-4 pb-4 border-b-2 border-slate-100">
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
          {advocate.name}
        </h3>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <Phone className="w-5 h-5 text-indigo-500 flex-shrink-0" />
          <a href={`tel:${advocate.phone}`} className="text-sm font-mono">
            {advocate.phone}
          </a>
        </div>
        {/* More fields... */}
      </div>
    </div>
  )
}
```

### ✅ Migrated (ShadCN)

```tsx
'use client'

import { Advocate } from '@/types'
import { MapPin, Phone, Briefcase } from 'lucide-react'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'

interface AdvocateCardProps {
  advocate: Advocate
}

export function AdvocateCard({ advocate }: AdvocateCardProps) {
  return (
    <Card className="group h-full hover:border-indigo-300 transition-all hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="border-b">
        <CardTitle className="group-hover:text-indigo-600 transition-colors">
          {advocate.name}
        </CardTitle>
      </CardHeader>

      <div className="px-6 pb-6 space-y-3">
        <div className="flex items-center gap-3">
          <Phone className="w-5 h-5 text-indigo-500 flex-shrink-0" />
          <a href={`tel:${advocate.phone}`} className="text-sm font-mono hover:underline">
            {advocate.phone}
          </a>
        </div>
        
        <div className="flex items-center gap-3">
          <MapPin className="w-5 h-5 text-emerald-500 flex-shrink-0" />
          <span className="text-sm">{advocate.city}</span>
        </div>

        <div className="flex items-center gap-3">
          <Briefcase className="w-5 h-5 text-blue-500 flex-shrink-0" />
          <span className="text-sm text-slate-600">{advocate.specialty}</span>
        </div>
      </div>

      <div className="px-6 py-4 border-t bg-slate-50">
        <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-full">
          ID: {advocate.id}
        </span>
      </div>
    </Card>
  )
}
```

### 🔑 Key Changes:
- Div → `<Card />`
- Custom header → `<CardHeader />` + `<CardTitle />`
- ShadCN handles base styling
- Preserved custom classes for hover effects
- More semantic and maintainable

---

## 3️⃣ Pagination Component Migration

### ❌ Current (Tailwind Only)

```tsx
'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'

export function Pagination({
  currentPage,
  totalPages,
  hasNextPage,
  hasPrevPage,
  onNextPage,
  onPrevPage,
  isLoading = false,
}: PaginationProps) {
  return (
    <div className="flex items-center justify-between gap-4 mt-8 p-4 bg-white rounded-lg border-2 border-slate-200">
      <button
        onClick={onPrevPage}
        disabled={!hasPrevPage || isLoading}
        className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 font-medium rounded-lg hover:bg-slate-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-5 h-5" />
        Previous
      </button>

      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold">Page {currentPage}</span>
        <span className="text-slate-400">of</span>
        <span className="text-sm font-semibold">{totalPages || 1}</span>
      </div>

      <button
        onClick={onNextPage}
        disabled={!hasNextPage || isLoading}
        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  )
}
```

### ✅ Migrated (ShadCN)

```tsx
'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface PaginationProps {
  currentPage: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
  onNextPage: () => void
  onPrevPage: () => void
  isLoading?: boolean
}

export function Pagination({
  currentPage,
  totalPages,
  hasNextPage,
  hasPrevPage,
  onNextPage,
  onPrevPage,
  isLoading = false,
}: PaginationProps) {
  return (
    <div className="flex items-center justify-between gap-4 mt-8 p-4 bg-white rounded-lg border">
      <Button
        onClick={onPrevPage}
        disabled={!hasPrevPage || isLoading}
        variant="secondary"
      >
        <ChevronLeft className="w-4 h-4 mr-2" />
        Previous
      </Button>

      <div className="flex items-center gap-2 text-sm">
        <span className="font-semibold">Page {currentPage}</span>
        <span className="text-muted-foreground">of</span>
        <span className="font-semibold">{totalPages || 1}</span>
      </div>

      <Button
        onClick={onNextPage}
        disabled={!hasNextPage || isLoading}
        variant="default"
      >
        Next
        <ChevronRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  )
}
```

### 🔑 Key Changes:
- Manual button styling → `<Button />` with variants
- `variant="secondary"` for gray button
- `variant="default"` for indigo button
- Disabled states handled by ShadCN
- Much cleaner!

---

## 4️⃣ EmptyState Component Migration

### ❌ Current (Tailwind Only)

```tsx
'use client'

import { Search } from 'lucide-react'

export function EmptyState({ searchQuery, onReset }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6">
      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
        <Search className="w-8 h-8 text-slate-400" />
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-2">
        No advocates found
      </h3>
      <p className="text-slate-600 text-center mb-6 max-w-md">
        {searchQuery
          ? `We couldn't find any advocates matching "${searchQuery}".`
          : 'No advocates available.'}
      </p>
      {onReset && searchQuery && (
        <button
          onClick={onReset}
          className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Clear Search
        </button>
      )}
    </div>
  )
}
```

### ✅ Migrated (ShadCN)

```tsx
'use client'

import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface EmptyStateProps {
  searchQuery?: string
  onReset?: () => void
}

export function EmptyState({ searchQuery, onReset }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6">
      <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
        <Search className="w-8 h-8 text-muted-foreground" />
      </div>
      
      <h3 className="text-xl font-bold text-foreground mb-2">
        No advocates found
      </h3>
      
      <p className="text-muted-foreground text-center mb-6 max-w-md">
        {searchQuery
          ? `We couldn't find any advocates matching "${searchQuery}". Try adjusting your search terms.`
          : 'No advocates available at the moment.'}
      </p>

      {onReset && searchQuery && (
        <Button onClick={onReset} variant="default">
          Clear Search
        </Button>
      )}
    </div>
  )
}
```

### 🔑 Key Changes:
- Hardcoded colors → CSS variables (`secondary`, `muted-foreground`)
- Button styling → `<Button />` component
- More consistent with design system
- Easier theming (dark mode ready!)

---

## 5️⃣ AdvocatesContainer Updates

### 🔄 Migration Pattern for Error State

### ❌ Current (Tailwind)

```tsx
{error && (
  <div className="p-4 bg-red-50 border-2 border-red-200 rounded-lg text-red-800">
    <p className="font-medium">Error: {error}</p>
  </div>
)}
```

### ✅ Migrated (ShadCN) - Option 1: Custom

```tsx
import { AlertCircle } from 'lucide-react'

{error && (
  <div className="p-4 bg-destructive/10 border border-destructive rounded-lg text-destructive">
    <div className="flex gap-2 items-start">
      <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
      <p className="font-medium">{error}</p>
    </div>
  </div>
)}
```

### ✅ Migrated (ShadCN) - Option 2: With Alert Component

```tsx
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'

{error && (
  <Alert variant="destructive">
    <AlertCircle className="h-4 w-4" />
    <AlertTitle>Error</AlertTitle>
    <AlertDescription>{error}</AlertDescription>
  </Alert>
)}
```

---

## 📝 Migration Checklist Template

Create a `MIGRATION_NOTES.md` in your project:

```markdown
# ShadCN Migration Notes

## Components Migrated

### ✅ SearchBar
- **Date**: [Date completed]
- **Changes**: 
  - Replaced `<input>` with `<Input />`
  - Replaced button classes with `<Button />`
- **Issues**: None
- **Tests**: ✅ Passed

### ✅ AdvocateCard
- **Date**: [Date completed]
- **Changes**:
  - Replaced card div with `<Card />`, `<CardHeader />`, `<CardTitle />`
  - Kept custom spacing and hover effects
- **Issues**: Had to use `className` to preserve custom styling
- **Tests**: ✅ Passed

### ⏳ Pagination
- **Status**: In progress
- **Progress**: 50%

## Key Learnings

1. Use `className` to extend ShadCN components
2. CSS variables like `bg-secondary` are powerful
3. Variants reduce code significantly
4. Dark mode works automatically

## Trade-offs

- **Gained**: Consistency, dark mode support, less CSS
- **Lost**: Some styling flexibility (workaround: custom className)

## Recommendations for Production

1. Add Alert component for error states
2. Create custom Button variant for special cases
3. Use CSS variables for all colors
4. Test dark mode thoroughly
```

---

## 🎯 Tips for Successful Migration

### 1. **Do it Component by Component**
- Start with smallest components first
- Test each one thoroughly
- Then move to complex ones

### 2. **Preserve Functionality**
- All event handlers must still work
- All styling should match or improve
- Test search, pagination, edge cases

### 3. **Use `className` for Custom Styles**
```tsx
// Good: Extend ShadCN component
<Button className="custom-hover-effect">
  Click me
</Button>

// Also good: Use CSS variables
<Button className="bg-slate-600">
  Custom background
</Button>
```

### 4. **Leverage Variants**
```tsx
// Instead of multiple button classes
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Delete</Button>
```

### 5. **Group Related Changes**
```tsx
// Structure: imports → component props → template
import { Button } from '@/components/ui/button'

export function MyComponent({ isLoading }: Props) {
  return (
    <Button disabled={isLoading}>
      {isLoading ? 'Loading...' : 'Submit'}
    </Button>
  )
}
```

---

## 🚀 Order of Migration (Recommended)

1. **SearchBar** (15 min) - Simplest, high impact
2. **Pagination** (15 min) - Multiple buttons, good practice
3. **EmptyState** (10 min) - Just a button and text
4. **AdvocateCard** (20 min) - More complex composition
5. **LoadingState** (5 min) - Mostly animation
6. **AdvocatesContainer** (10 min) - Add Alert for errors

**Total: ~75 minutes** (leaves 45 min for testing & questions!)

---

## ✨ Pro Tip: Test as You Go

After migrating each component:

```bash
# Test in browser
npm run dev

# Check:
✅ Component renders
✅ All interactions work
✅ Styling looks correct
✅ No console errors
✅ Responsive design works
✅ Accessibility features work
```

---

Now you're ready to migrate! Good luck! 🚀
