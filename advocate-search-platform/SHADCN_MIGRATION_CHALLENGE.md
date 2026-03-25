# 🎯 ShadCN Migration Challenge

## Overview
You have a fully functional Next.js + Tailwind CSS application for searching advocates. Your challenge is to **refactor the styling to use ShadCN/UI components** instead of raw Tailwind classes.

This is an excellent exercise for demonstrating:
- Understanding of component libraries and design systems
- Ability to migrate code while maintaining functionality
- Knowledge of accessibility patterns (ShadCN is built on Radix UI)
- Problem-solving and refactoring skills

---

## 🚀 Your Mission

Migrate the following components from Tailwind CSS to ShadCN components:

### Components to Migrate:

1. **SearchBar.tsx** 
   - Replace with: `Input` + `Button` + custom icon handling
   - Keep the clear (X) button functionality
   - Maintain search icon from lucide-react

2. **AdvocateCard.tsx**
   - Replace with: `Card`, `CardHeader`, `CardTitle`, `CardDescription`
   - Style the icon sections using card composition
   - Maintain the hover effects and layout

3. **Pagination.tsx**
   - Replace with: `Button` variants for prev/next
   - Create a custom pagination component using ShadCN buttons
   - Maintain disabled states

4. **LoadingState.tsx**
   - Keep as is (animation is fine) OR replace with custom spinner using ShadCN

5. **EmptyState.tsx**
   - Compose using ShadCN `Button` and semantic HTML
   - Maintain the layout and messaging

6. **AdvocatesContainer.tsx**
   - Replace container divs with ShadCN components where appropriate
   - Use ShadCN `Alert` for error states

---

## 🛠️ Setup Instructions

### Step 1: Install ShadCN/UI
```bash
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-slot
npm install class-variance-authority clsx tailwind-merge
```

### Step 2: Set Up the `cn()` Utility
Already provided in `src/lib/utils.ts` - this merges Tailwind classes intelligently.

### Step 3: Create ShadCN Component Files
You'll need to create these ShadCN components:

- `src/components/ui/button.tsx`
- `src/components/ui/input.tsx`
- `src/components/ui/card.tsx`
- `src/components/ui/alert.tsx` (optional)

---

## 📋 Migration Checklist

- [ ] Set up ShadCN utilities and components
- [ ] Migrate `SearchBar.tsx` to use Input + Button
- [ ] Migrate `AdvocateCard.tsx` to use Card components
- [ ] Migrate `Pagination.tsx` to use Button variants
- [ ] Migrate `EmptyState.tsx` to use Button + semantic HTML
- [ ] Update `AdvocatesContainer.tsx` for error handling with Alert (if time permits)
- [ ] Test all functionality still works
- [ ] Ensure accessibility (keyboard navigation, focus states)
- [ ] Document any styling trade-offs

---

## 🎨 Key Benefits of Migration

1. **Consistency**: All components follow the same design system
2. **Accessibility**: Built on Radix UI primitives
3. **Reduced Custom CSS**: Less code to maintain
4. **Theming**: ShadCN makes dark mode and custom themes easier
5. **Production-Ready**: Composable, well-tested components

---

## 💡 Pro Tips for Interview

### When migrating, think about:
- **Composition**: How do you nest ShadCN components to create complex UIs?
- **Variants**: ShadCN components have variant systems (using CVA). Understand how to use them.
- **Customization**: When do you add custom className vs. using built-in styling?
- **Trade-offs**: What did you lose/gain from the migration? Be ready to explain.
- **Performance**: Did anything change with bundle size or rendering?

### Example Migration Pattern:

**Before (Tailwind):**
```tsx
<button className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700">
  Search
</button>
```

**After (ShadCN):**
```tsx
<Button variant="default" size="default">
  Search
</Button>
```

---

## 📊 Thought Process Document

Create a `MIGRATION_NOTES.md` file documenting:
1. **What you changed and why**
2. **Challenges you encountered**
3. **How you solved them**
4. **Trade-offs made**
5. **What you'd do differently next time**

This document demonstrates your thought process and communication skills.

---

## 🎓 Interview Talking Points

Be prepared to discuss:

1. **Why migrate to ShadCN?**
   - Design system consistency
   - Accessibility out of the box
   - Reduced CSS bloat
   - Team standardization

2. **What's the learning curve?**
   - Understanding CVA (Class Variance Authority)
   - Radix UI primitives
   - Component composition patterns

3. **When would you NOT use ShadCN?**
   - Simple static sites
   - When you need pixel-perfect custom designs
   - If bundle size is a constraint
   - Legacy browser support

4. **How do you handle styling edge cases?**
   - Using `cn()` utility to merge classes
   - Creating wrapper components for custom styling
   - Extending ShadCN components

---

## 🚦 Stretch Challenges (if time permits)

1. **Add Dark Mode Support**
   - Update `tailwind.config.js` with `darkMode: 'class'`
   - ShadCN components work great with dark mode

2. **Create a Custom Theme**
   - Modify CSS variables in `globals.css`
   - All ShadCN components automatically update

3. **Add Form Validation**
   - Use `react-hook-form` with ShadCN `Input`
   - Show validation errors elegantly

4. **Implement Advanced Pagination**
   - Show page numbers (1, 2, 3...)
   - Add jump-to-page functionality

---

## 🎬 Getting Started

1. Read through the current Tailwind implementation
2. Understand how each component works
3. Start with the simplest component (SearchBar or Pagination)
4. Test as you go
5. Document your decisions in MIGRATION_NOTES.md

Good luck! 🚀
