# 📚 Interview Preparation Guide

## Project Overview

You're building a full-stack advocate search application with:
- **Frontend**: Next.js 15 + React 18 + Tailwind CSS
- **Backend**: Next.js API Routes (server-side)
- **Data**: In-memory advocates array with filtering & pagination
- **Challenge**: Migrate to ShadCN/UI components

---

## ⏱️ 2-Hour Interview Timeline

### Hour 1: Setup & Core Features (0:00 - 1:00)
- [ ] **0:00-0:10**: Understand requirements & ask clarifying questions
- [ ] **0:10-0:30**: Set up Next.js, Tailwind, TypeScript, folder structure
- [ ] **0:30-0:45**: Create API route with advocates data & filtering logic
- [ ] **0:45-1:00**: Build basic UI components (SearchBar, AdvocateCard, Pagination)

### Hour 2: Polish & Enhancement (1:00 - 2:00)
- [ ] **1:00-1:15**: Add loading states, error handling, empty states
- [ ] **1:15-1:45**: Migrate components to ShadCN/UI (or styling enhancements)
- [ ] **1:45-1:55**: Test functionality, handle edge cases
- [ ] **1:55-2:00**: Document trade-offs and thought process

---

## 🔍 Key Evaluation Criteria

Interviewers will look for:

### 1. **Backend Implementation**
- ✅ Correct filtering by name/phone/other fields
- ✅ Proper pagination logic (offset, limit)
- ✅ Error handling and validation
- ✅ Clear, maintainable code structure

### 2. **Frontend Architecture**
- ✅ Component composition and reusability
- ✅ State management (useState, useCallback)
- ✅ Proper data fetching patterns
- ✅ Clean, readable code

### 3. **UI/UX**
- ✅ Functional search & filters
- ✅ Responsive design
- ✅ Loading states (indicate server work)
- ✅ Empty states (when no results)
- ✅ Error messages (user feedback)
- ✅ Accessibility (keyboard navigation, ARIA labels)

### 4. **Styling & Design**
- ✅ Consistent visual design
- ✅ Professional appearance
- ✅ Attention to spacing, typography, colors
- ✅ Hover/active states on interactive elements

### 5. **Communication & Problem-Solving**
- ✅ Explaining your approach
- ✅ Discussing trade-offs
- ✅ Asking clarifying questions
- ✅ Handling ambiguity
- ✅ Time management

---

## 🎓 Technical Concepts to Know

### Backend
- [ ] API route handlers in Next.js
- [ ] Query parameters (search, pagination)
- [ ] Filtering arrays in JavaScript
- [ ] Pagination math: `(page - 1) * limit` to `page * limit`
- [ ] HTTP status codes and error responses

### Frontend
- [ ] React hooks: `useState`, `useEffect`, `useCallback`
- [ ] Client vs. server components in Next.js 13+
- [ ] Fetch API and error handling
- [ ] URL query parameters
- [ ] Form submission and input handling
- [ ] Conditional rendering

### Styling
- [ ] Tailwind CSS utility classes
- [ ] Responsive design (`sm:`, `md:`, `lg:`)
- [ ] Hover and active states
- [ ] CSS Grid and Flexbox
- [ ] CSS variables and theming

### Design System (ShadCN)
- [ ] Component composition
- [ ] CVA (Class Variance Authority)
- [ ] Radix UI primitives
- [ ] Accessibility patterns
- [ ] Prop spreading and customization

---

## 📝 Common Pitfalls & How to Avoid Them

### 1. **Not handling edge cases**
- ❌ Forgetting to check if page > totalPages
- ✅ Validate all user inputs and API responses

### 2. **Poor user feedback**
- ❌ No loading indicators while fetching
- ✅ Add loading, error, and empty states

### 3. **Inaccessible components**
- ❌ Buttons without proper focus styles
- ✅ Use semantic HTML, ARIA labels, keyboard navigation

### 4. **Inefficient data fetching**
- ❌ Fetching on every keystroke without debouncing
- ✅ Debounce search or use form submission

### 5. **Messy code organization**
- ❌ Everything in one component
- ✅ Break into small, reusable components

### 6. **Styling details**
- ❌ Inconsistent spacing, no visual hierarchy
- ✅ Use a consistent color scheme, proper sizing, clear typography

---

## 💭 Sample Interview Questions

Be prepared to answer:

1. **"Walk me through your implementation."**
   - Start high-level, drill down as asked
   - Explain your architectural decisions

2. **"How does your search/filter work?"**
   - Explain the backend filtering logic
   - How do you handle multiple filter types?

3. **"What happens when the API fails?"**
   - Show your error handling
   - How do you communicate errors to users?

4. **"How would you optimize this for 100,000+ advocates?"**
   - Discuss database indexing
   - Mention lazy loading or infinite scroll
   - Talk about caching strategies

5. **"Why did you choose [technology]?"**
   - Be ready to defend your choices
   - Discuss trade-offs vs. alternatives

6. **"If you had more time, what would you add?"**
   - Dark mode, advanced filters, analytics
   - Better UX features (favorites, saved searches)
   - Performance optimizations

---

## 🎯 Success Metrics

By the end, you should have:

- ✅ A working search application
- ✅ Server-side filtering and pagination
- ✅ Clean, organized code
- ✅ Proper error handling
- ✅ Professional UI with good UX
- ✅ Documentation of your approach (MIGRATION_NOTES.md)
- ✅ Understanding of why you made each choice

---

## 📚 Quick Reference

### Project Structure
```
src/
├── app/
│   ├── api/
│   │   └── advocates/
│   │       └── route.ts          # Backend API
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                  # Home page
├── components/
│   ├── AdvocatesContainer.tsx    # Main logic
│   ├── SearchBar.tsx
│   ├── AdvocateCard.tsx
│   ├── Pagination.tsx
│   ├── LoadingState.tsx
│   ├── EmptyState.tsx
│   └── ui/                       # ShadCN components
├── types/
│   └── index.ts
└── lib/
    └── utils.ts
```

### Key Files to Understand
1. `src/app/api/advocates/route.ts` - Backend logic
2. `src/components/AdvocatesContainer.tsx` - Frontend state management
3. `src/app/page.tsx` - UI layout
4. `tailwind.config.js` - Styling configuration

---

## 🚀 Pro Tips

1. **Start simple, iterate quickly**
   - Get the MVP working first
   - Then add polish and enhancements

2. **Test as you go**
   - Test search functionality
   - Test pagination edge cases
   - Test error states

3. **Think aloud**
   - Explain your reasoning
   - Ask clarifying questions
   - Discuss trade-offs

4. **Document as you code**
   - Add comments for non-obvious logic
   - Keep a running list of decisions
   - Write MIGRATION_NOTES.md

5. **Pay attention to details**
   - Spacing and typography matter
   - Hover states should feel responsive
   - Loading states should be obvious
   - Error messages should be helpful

6. **Be ready for follow-up questions**
   - If you make a choice, understand why
   - Be able to defend or pivot if questioned
   - Show flexibility and problem-solving

---

## 🎬 Let's Go!

You have everything you need. Good luck! Remember:
- **Communication** is as important as code quality
- **Problem-solving** matters more than perfection
- **Time management** shows maturity
- **Passion** for the work shows through

Now go build something amazing! 🚀
