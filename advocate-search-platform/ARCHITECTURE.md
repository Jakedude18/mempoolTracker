# 🏗️ Architecture & Data Flow Guide

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    NEXT.JS APPLICATION                       │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              FRONTEND (src/app/page.tsx)            │   │
│  │  Header + AdvocatesContainer                        │   │
│  └──────────────────────┬──────────────────────────────┘   │
│                         │                                   │
│  ┌──────────────┬───────┴──────────┬─────────────────┐    │
│  │              │                  │                 │     │
│  ▼              ▼                  ▼                 ▼     │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐      │
│ │SearchBar │ │Advocate  │ │Pagination│ │Loading   │      │
│ │Component │ │Card      │ │Component │ │/Empty    │      │
│ │(Tailwind)│ │(Tailwind)│ │(Tailwind)│ │(Tailwind)│      │
│ └────┬─────┘ └──────────┘ └────┬─────┘ └──────────┘      │
│      │                         │                          │
│      └──────────┬──────────────┘                          │
│                 │                                          │
│                 │ Fetch with:                             │
│                 │ ?search=john                            │
│                 │ &page=1                                 │
│                 │ &limit=5                                │
│                 │                                          │
│  ┌──────────────┴──────────────┐                          │
│  │                             │                          │
│  ▼                             ▼                          │
│ ┌─────────────────────────────────────┐                  │
│ │      API ROUTE HANDLER              │                  │
│ │  (src/app/api/advocates/route.ts)   │                  │
│ └────────┬────────────────────────────┘                  │
│          │                                                │
│          │ 1. Receive query params                        │
│          │ 2. Validate inputs                            │
│          │ 3. Filter advocates array                     │
│          │ 4. Slice for pagination                       │
│          │ 5. Return JSON response                       │
│          │                                                │
│  ┌───────┴────────────────────────────┐                  │
│  │                                    │                  │
│  ▼                                    ▼                  │
│ ┌──────────────────────────────────────────┐            │
│ │        IN-MEMORY ADVOCATES DATA          │            │
│ │  (12 advocates with name, phone,        │            │
│ │   city, specialty)                       │            │
│ └──────────────────────────────────────────┘            │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

---

## Data Flow: Search & Pagination

### 1️⃣ User Types Search Query

```
┌─────────────────────┐
│ User types "john"   │
│ Clicks Search       │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────────────────────────┐
│ SearchBar Component                     │
│ - Captures input                        │
│ - Prevents form submission              │
│ - Calls onSearch(query)                 │
└──────────┬──────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────┐
│ AdvocatesContainer                      │
│ - handleSearch() called                 │
│ - setSearchQuery("john")                │
│ - Reset to page 1                       │
│ - Call fetchAdvocates(1, "john")        │
└──────────┬──────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────┐
│ Build API URL:                          │
│ /api/advocates?                         │
│   search=john&                          │
│   page=1&                               │
│   limit=5                               │
└──────────┬──────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────┐
│ API Route (GET /api/advocates)          │
│                                         │
│ 1. Parse query params:                  │
│    search="john"                        │
│    page=1                               │
│    limit=5                              │
│                                         │
│ 2. Filter advocates:                    │
│    advocates.filter(a =>                │
│      a.name.includes("john") ||         │
│      a.phone.includes("john") ||        │
│      a.city.includes("john") ||         │
│      a.specialty.includes("john")       │
│    )                                    │
│    → Results: 3 advocates found         │
│                                         │
│ 3. Calculate pagination:                │
│    total = 3                            │
│    totalPages = ceil(3/5) = 1           │
│    startIndex = (1-1)*5 = 0             │
│    endIndex = 0+5 = 5                   │
│    sliced = [0:5] = all 3               │
│                                         │
│ 4. Return response:                     │
│    {                                    │
│      data: [...3 advocates],            │
│      pagination: {                      │
│        page: 1,                         │
│        totalPages: 1,                   │
│        hasNextPage: false,              │
│        total: 3                         │
│      }                                  │
│    }                                    │
└──────────┬──────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────┐
│ Frontend Updates State                  │
│ - setData(response)                     │
│ - setLoading(false)                     │
│ - Re-render with results                │
└──────────┬──────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────┐
│ UI Updates                              │
│ - Show 3 matching advocates             │
│ - Pagination shows "Page 1 of 1"        │
│ - Next button disabled (no more pages)  │
└─────────────────────────────────────────┘
```

---

### 2️⃣ User Clicks Next Page

```
┌─────────────────────┐
│ User clicks "Next"  │
│ (but disabled)      │
└─────────────────────┘

OR search had 20 results:

┌──────────────────────────────────────┐
│ User searches "legal"                │
│ Results: 10 advocates                │
│ Page 1 of 2 shown                    │
│ Next button enabled                  │
│ User clicks Next                     │
└──────────┬───────────────────────────┘
           │
           ▼
┌──────────────────────────────────────┐
│ handleNextPage() in Container        │
│ - currentPage++ (2)                  │
│ - Call fetchAdvocates(2, "legal")    │
└──────────┬──────────────────────────┘
           │
           ▼
┌──────────────────────────────────────┐
│ Build new API URL:                   │
│ /api/advocates?                      │
│   search=legal&                      │
│   page=2&                            │
│   limit=5                            │
└──────────┬──────────────────────────┘
           │
           ▼
┌──────────────────────────────────────┐
│ API Route Processes:                 │
│ 1. Filter: 10 results match "legal"  │
│ 2. Pagination:                       │
│    startIndex = (2-1)*5 = 5          │
│    endIndex = 5+5 = 10               │
│    sliced = [5:10] = 5 items         │
│ 3. Return:                           │
│    page: 2,                          │
│    hasNextPage: false,               │
│    hasPrevPage: true                 │
└──────────┬──────────────────────────┘
           │
           ▼
┌──────────────────────────────────────┐
│ Frontend Updates                     │
│ - Show page 2 advocates (items 6-10) │
│ - "Page 2 of 2"                      │
│ - Next button disabled                │
│ - Previous button enabled             │
└──────────────────────────────────────┘
```

---

## Component Hierarchy

```
┌─────────────────────────────────────────────────────┐
│                    page.tsx                         │
│              (Home Page Component)                  │
└────────────────────┬────────────────────────────────┘
                     │
     ┌───────────────┴───────────────┐
     │                               │
     ▼                               ▼
┌─────────────────┐         ┌──────────────────┐
│   Header Info   │         │ AdvocatesContainer
│   (JSX markup)  │         │   (Main Logic)   │
└─────────────────┘         └────────┬─────────┘
                                     │
        ┌────────────┬───────────────┼──────────┬─────────┐
        │            │               │          │         │
        ▼            ▼               ▼          ▼         ▼
    ┌────────┐  ┌──────────┐  ┌────────┐  ┌────────┐  ┌────────┐
    │Search  │  │Advocate  │  │Paginat │  │Loading │  │Empty   │
    │Bar     │  │Card      │  │ion     │  │State   │  │State   │
    │        │  │          │  │        │  │        │  │        │
    │Input + │  │Name +    │  │Prev/   │  │Spinner │  │Message │
    │Button  │  │Phone +   │  │Next    │  │        │  │+ Reset │
    │Clear   │  │City +    │  │Page    │  │        │  │Button  │
    │        │  │Specialty │  │Info    │  │        │  │        │
    └────────┘  └──────────┘  └────────┘  └────────┘  └────────┘
    (Tailwind)  (Tailwind)    (Tailwind)  (Tailwind)  (Tailwind)
```

---

## API Request/Response Examples

### Example 1: Initial Load (No Search)

**Request:**
```http
GET /api/advocates?search=&page=1&limit=5
```

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "name": "John Smith",
      "phone": "555-123-4567",
      "city": "Boston",
      "specialty": "Immigration Law"
    },
    {
      "id": 2,
      "name": "Jane Doe",
      "phone": "555-987-6543",
      "city": "New York",
      "specialty": "Civil Rights"
    },
    {
      "id": 3,
      "name": "Johnny Appleseed",
      "phone": "555-222-3333",
      "city": "Chicago",
      "specialty": "Employment Law"
    },
    {
      "id": 4,
      "name": "Sarah Connor",
      "phone": "555-444-1111",
      "city": "Los Angeles",
      "specialty": "Criminal Defense"
    },
    {
      "id": 5,
      "name": "Michael Johnson",
      "phone": "555-555-5555",
      "city": "Boston",
      "specialty": "Tax Law"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 5,
    "total": 12,
    "totalPages": 3,
    "hasNextPage": true,
    "hasPrevPage": false
  },
  "search": null
}
```

### Example 2: Search Query

**Request:**
```http
GET /api/advocates?search=boston&page=1&limit=5
```

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "name": "John Smith",
      "phone": "555-123-4567",
      "city": "Boston",
      "specialty": "Immigration Law"
    },
    {
      "id": 5,
      "name": "Michael Johnson",
      "phone": "555-555-5555",
      "city": "Boston",
      "specialty": "Tax Law"
    },
    {
      "id": 9,
      "name": "David Brown",
      "phone": "555-999-9999",
      "city": "Boston",
      "specialty": "Intellectual Property"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 5,
    "total": 3,
    "totalPages": 1,
    "hasNextPage": false,
    "hasPrevPage": false
  },
  "search": "boston"
}
```

### Example 3: Invalid Page

**Request:**
```http
GET /api/advocates?search=john&page=10&limit=5
```

**Response (400 Error):**
```json
{
  "error": "Page number exceeds total pages"
}
```

---

## State Management Flow

```
┌─────────────────────────────────────────────────────────────┐
│                  AdvocatesContainer State                   │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  const [data, setData]                                      │
│    ↳ Stores: API response with advocates + pagination      │
│    ↳ Updated: After successful fetch                       │
│    ↳ Used by: AdvocateCard, Pagination components          │
│                                                              │
│  const [loading, setLoading]                                │
│    ↳ Stores: true during API call, false when done        │
│    ↳ Updated: At start and end of fetch                   │
│    ↳ Used by: LoadingState component, button disable      │
│                                                              │
│  const [error, setError]                                    │
│    ↳ Stores: Error message if fetch fails                 │
│    ↳ Updated: On API error                                │
│    ↳ Used by: Error message display                        │
│                                                              │
│  const [currentPage, setCurrentPage]                        │
│    ↳ Stores: Current page number (1, 2, 3, ...)          │
│    ↳ Updated: On prev/next button click                   │
│    ↳ Used by: Pagination display + API request            │
│                                                              │
│  const [searchQuery, setSearchQuery]                        │
│    ↳ Stores: Current search term                          │
│    ↳ Updated: On form submission                           │
│    ↳ Used by: API request + clear button logic            │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Pagination Mathematics

```
Given:
- totalResults = 23
- limit = 5
- currentPage = 2

Calculate:
┌─────────────────────────────────────────┐
│ totalPages = ceil(23 / 5) = 5           │
├─────────────────────────────────────────┤
│ startIndex = (2 - 1) * 5 = 5            │
│ endIndex = 5 + 5 = 10                   │
├─────────────────────────────────────────┤
│ Results shown: items 6-10 (5 total)     │
├─────────────────────────────────────────┤
│ Page 2 of 5                             │
│ Showing: 6-10 of 23                     │
│ hasNextPage: true (page 3 exists)       │
│ hasPrevPage: true (page 1 exists)       │
└─────────────────────────────────────────┘

Visual:
┌────┬────┬────┬────┬────┬────┬────┬────┬────┬────┬────┬────┬─────┐
│ 1  │ 2  │ 3  │ 4  │ 5  │ 6  │ 7  │ 8  │ 9  │10  │11  │12  │...23│
└────┴────┴────┴────┴────┴────┴────┴────┴────┴────┴────┴────┴─────┘
     Page 1       │ Page 2       │ Page 3       │ Page 4     │P5

Current: Page 2 (showing items 6-10)
```

---

## Error Handling Flow

```
┌─────────────────────┐
│ fetchAdvocates()    │
│ called              │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────────────────────┐
│ try {                               │
│   setLoading(true)                  │
│   Build URL with params             │
│   fetch(url)                        │
└──────────┬──────────────────────────┘
           │
           ├─ Success ─────────┐
           │                   │
           │                   ▼
           │         ┌──────────────────────────┐
           │         │ response.ok?             │
           │         └──┬──────────────┬────────┘
           │            │              │
           │        true│              │false
           │            ▼              ▼
           │         Parse      throw Error("Failed")
           │         JSON             │
           │            │             │
           │            └─────┬───────┘
           │                  │
           ▼                  ▼
    ┌────────────────────────────────┐
    │ catch (err) {                  │
    │   setError(err.message)        │
    │   setData(null)                │
    │ }                              │
    └────────────────┬───────────────┘
                     │
                     ▼
    ┌────────────────────────────────┐
    │ finally {                      │
    │   setLoading(false)            │
    │ }                              │
    └────────────────────────────────┘
```

---

## TypeScript Data Structures

```typescript
// Advocate Type
interface Advocate {
  id: number              // Unique identifier
  name: string           // Full name
  phone: string          // Phone number (formatted)
  city: string           // City location
  specialty: string      // Legal specialty
}

// Pagination Info
interface Pagination {
  page: number           // Current page
  limit: number          // Items per page
  total: number          // Total matching results
  totalPages: number     // Total page count
  hasNextPage: boolean   // Can user go to next?
  hasPrevPage: boolean   // Can user go to previous?
}

// API Response
interface AdvocatesResponse {
  data: Advocate[]       // Array of advocates
  pagination: Pagination // Pagination metadata
  search: string | null  // Search query used (or null)
}
```

---

## Performance Considerations

```
Current Implementation:
├─ Advocates: 12 (in-memory)
├─ Search: O(n) linear filter
├─ Pagination: O(1) slicing
├─ Response time: <1ms
└─ Bundle size: ~50KB (Next.js app)

For 100,000 advocates:
├─ In-memory: Would need database
├─ Search: Would need indexing (B-tree)
├─ Pagination: Still O(1) with offset/limit
├─ Response time: 10-50ms (depends on DB)
└─ Bundle size: Same (~50KB)

Recommendation:
├─ Database: PostgreSQL with indexes
├─ Caching: Redis for popular searches
├─ Lazy load: Infinite scroll or pagination
└─ Search: Full-text search (Elasticsearch optional)
```

---

Now you understand the complete architecture! Ready to migrate to ShadCN? 🚀
