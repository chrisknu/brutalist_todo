# Brutalist Todo App Architecture

## Technology Stack
- Next.js 14
- TypeScript
- Tailwind CSS
- IndexedDB for storage
- shadcn/ui components
- Web Speech API for voice input
- Atlaskit Pragmatic Drag and Drop
- next-themes for dark mode

## Project Structure
```
todo-app/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Main page component
│   └── providers.tsx      # Theme provider setup
├── components/
│   ├── ui/               # shadcn components
│   └── TodoApp.tsx       # Main todo application
├── lib/
│   ├── db.ts            # IndexedDB operations
│   ├── types.ts         # TypeScript interfaces
│   └── utils.ts         # Utility functions
└── public/              # Static assets
```

## Features
1. Brutalist Design
   - High contrast
   - Monospace typography
   - Thick borders
   - Minimal decoration
   - Sharp edges

2. Data Persistence
   - IndexedDB storage
   - Todo CRUD operations
   - Category management
   - Order preservation

3. Interaction Features
   - Voice input for adding todos
   - Drag and drop reordering
   - Category filtering
   - Dark/Light mode
   - Completion toggling

4. Categories
   - Work
   - Personal
   - Shopping
   - Health
   
5. Accessibility
   - Keyboard navigation
   - ARIA attributes
   - High contrast modes
   - Screen reader support