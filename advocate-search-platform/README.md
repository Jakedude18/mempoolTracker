# Advocate Search Platform

A full-stack web application for searching and discovering legal advocates. Built with **Next.js**, **Tailwind CSS**, and featuring a challenge to migrate to **ShadCN/UI components**.

## 🎯 Project Goals

- Demonstrate full-stack development skills
- Implement server-side search and pagination
- Build a professional, accessible UI
- Practice component-based architecture
- Learn ShadCN/UI component library migration

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or 20+
- npm or yarn

### Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd advocate-search
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
.
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── advocates/
│   │   │       └── route.ts          # Backend API with filtering & pagination
│   │   ├── globals.css               # Global styles
│   │   ├── layout.tsx                # Root layout
│   │   └── page.tsx                  # Home page
│   ├── components/
│   │   ├── AdvocatesContainer.tsx    # Main container component
│   │   ├── SearchBar.tsx             # Search input & button
│   │   ├── AdvocateCard.tsx          # Single advocate card
│   │   ├── Pagination.tsx            # Pagination controls
│   │   ├── LoadingState.tsx          # Loading skeleton
│   │   ├── EmptyState.tsx            # No results message
│   │   └── ui/                       # ShadCN components (add here)
│   ├── types/
│   │   └── index.ts                  # TypeScript interfaces
│   └── lib/
│       └── utils.ts                  # Utility functions (cn, etc.)
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── next.config.js
├── INTERVIEW_GUIDE.md                # Interview prep guide
├── SHADCN_MIGRATION_CHALLENGE.md     # Migration challenge
└── README.md
```

## ✨ Features

### Current (Tailwind CSS)
- ✅ Search advocates by name, phone, city, or specialty
- ✅ Server-side filtering and pagination
- ✅ Responsive grid layout
- ✅ Loading states
- ✅ Empty states with helpful messages
- ✅ Error handling
- ✅ Smooth animations and transitions
- ✅ Accessible button and form elements

### Planned (ShadCN Migration)
- ⏳ Refactor components to use ShadCN/UI
- ⏳ Implement dark mode support
- ⏳ Add form validation
- ⏳ Advanced filter options

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework
- **React 18** - UI library
- **Tailwind CSS** - Utility-first CSS
- **TypeScript** - Type safety
- **Lucide React** - Icons

### Backend
- **Next.js API Routes** - Serverless functions
- **In-memory database** - Mock advocate data

### Development
- **ESLint** - Code linting
- **PostCSS** - CSS processing

## 📖 API Documentation

### GET `/api/advocates`

Returns a paginated list of advocates, optionally filtered by search query.

**Query Parameters:**
- `search` (optional): Filter by name, phone, city, or specialty
- `page` (optional, default: 1): Page number for pagination
- `limit` (optional, default: 5): Items per page (max: 100)

**Example Request:**
```
GET /api/advocates?search=john&page=1&limit=5
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
  "search": "john"
}
```

## 🎯 Challenge: ShadCN Migration

Want to level up? Check out **SHADCN_MIGRATION_CHALLENGE.md** to:
- Learn ShadCN/UI component library
- Refactor Tailwind CSS to components
- Understand design systems
- Practice professional code migration

## 📚 Interview Preparation

See **INTERVIEW_GUIDE.md** for:
- 2-hour timeline
- Evaluation criteria
- Common pitfalls
- Sample interview questions
- Success metrics

## 🎨 Styling Details

### Color Scheme (Tailwind)
- **Primary**: Indigo (600, 700)
- **Secondary**: Slate (100-900)
- **Accent**: Emerald, Blue, Red
- **Background**: Gradient (slate-50 to slate-100)

### Typography
- **Headings**: Bold, Slate-900
- **Body**: Regular, Slate-600/700
- **Small text**: Slate-500

### Components
- **Cards**: White background, slate-200 borders
- **Buttons**: Indigo primary, slate secondary, ghost variants
- **Icons**: Lucide React (5-8px sizes)

## 🔧 Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

## 🚀 Deployment

### Deploy to Vercel (recommended)
```bash
npx vercel deploy
```

### Deploy to Other Platforms
Next.js can be deployed to:
- Vercel (native)
- AWS Amplify
- Netlify (with adapters)
- Docker containers
- Traditional Node.js servers

## 📝 Code Style

- **Components**: Functional components with hooks
- **Naming**: PascalCase for components, camelCase for functions/variables
- **Types**: Use TypeScript interfaces for data structures
- **Styling**: Tailwind classes, organized top-to-bottom
- **Comments**: Add for complex logic or non-obvious decisions

## 🤝 Contributing

This is a learning/interview project. Feel free to:
- Add new features
- Improve styling
- Optimize performance
- Enhance accessibility
- Write tests

## 📄 License

This project is provided as-is for learning and interview purposes.

## 💡 Next Steps

1. ✅ Understand the current Tailwind implementation
2. ⏳ Read the ShadCN migration challenge
3. ⏳ Start migrating components one by one
4. ⏳ Document your decisions in MIGRATION_NOTES.md
5. ⏳ Test thoroughly
6. ⏳ Deploy and share!

## 🆘 Troubleshooting

### Port 3000 already in use
```bash
# Use a different port
npm run dev -- -p 3001
```

### API not responding
- Ensure the dev server is running
- Check browser console for errors
- Verify API route file is in correct location

### Styling not applying
- Clear `.next` folder and restart: `rm -rf .next && npm run dev`
- Check Tailwind config is properly imported in `globals.css`

## 📞 Questions?

- Check the INTERVIEW_GUIDE.md for common questions
- Review the SHADCN_MIGRATION_CHALLENGE.md for migration help
- Test individual components in isolation

---

**Built with ❤️ for interview preparation. Good luck! 🚀**
