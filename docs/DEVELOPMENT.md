# Development Guide

## Setup
1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

## Database Schema

### Todo Item
```typescript
interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: string;
  categoryId?: string;
  order: number;
  subtasks: Todo[];
}
```

### Category
```typescript
interface Category {
  id: string;
  name: string;
  color: string;
}
```

## Features In Progress
1. Subtasks Implementation
   - Schema ready
   - UI components needed
   - Recursive drag and drop support required

2. Drag and Drop
   - Currently implementing Atlaskit Pragmatic DnD
   - Need to add visual feedback
   - Touch device support in progress

3. Voice Input
   - Basic implementation complete
   - Need error handling
   - Feedback indicators required
   - Multi-language support planned

## Known Issues
1. Dark mode initial flash
2. Voice input browser support limitations
3. IndexedDB initialization timing
4. Drag and drop package integration

## Testing
- Jest setup ready
- Component tests needed
- E2E tests planned with Playwright

## Build and Deploy
```bash
npm run build
npm start
```

## Performance Notes
- IndexedDB operations are async
- Voice API requires HTTPS in production
- Client-side animations for drag operations