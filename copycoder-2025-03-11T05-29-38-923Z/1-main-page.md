Set up the frontend according to the following prompt:
  <frontend-prompt>
  Create detailed components with these requirements:
  1. Use 'use client' directive for client-side components
  2. Make sure to concatenate strings correctly using backslash
  3. Style with Tailwind CSS utility classes for responsive design
  4. Use Lucide React for icons (from lucide-react package). Do NOT use other UI libraries unless requested
  5. Use stock photos from picsum.photos where appropriate, only valid URLs you know exist
  6. Configure next.config.js image remotePatterns to enable stock photos from picsum.photos
  7. Create root layout.tsx page that wraps necessary navigation items to all pages
  8. MUST implement the navigation elements items in their rightful place i.e. Left sidebar, Top header
  9. Accurately implement necessary grid layouts
  10. Follow proper import practices:
     - Use @/ path aliases
     - Keep component imports organized
     - Update current src/app/page.tsx with new comprehensive code
     - Don't forget root route (page.tsx) handling
     - You MUST complete the entire prompt before stopping
  </frontend-prompt>

  <summary_title>
Social Media Content Management Dashboard
</summary_title>

<image_analysis>
1. Navigation Elements:
- Primary navigation: Find Inspiration, Prompts, Sources, Calendar, Published Posts, Videos, Videos2, Videos3
- Left sidebar with icon navigation, approximately 60px wide
- Top header bar ~64px height with source tabs (YouTube, Facebook, Threads, LinkedIn, Blog, Twitter)
- "Add Source" and "Add Post" buttons in header
- "Close All" option on right side
- Platform selector dropdown in top-right corner

2. Layout Components:
- Main content area: ~800px width
- Left sidebar: 60px fixed width
- Right panel: ~300px width
- Header height: 64px
- Content editor height: flexible
- Character counter: 234/280 displayed below content

3. Content Sections:
- Main text editor area
- Media attachment section
- Progress indicators for post generation
- Chat-style interface for AI responses
- Tips and help section in right panel
- Source management tabs

4. Interactive Controls:
- Toggle switches for features
- "Add Media" button
- "Publish" and "Clone" actions
- Platform-specific post controls
- Character count indicator
- Source selection tabs

5. Colors:
- Primary purple: #6C5CE7
- Background gray: #F8F9FA
- Text dark: #2D3436
- Border light: #E2E8F0
- Accent blue: #4A90E2

6. Grid/Layout Structure:
- 3-column layout (sidebar, main, panel)
- Flexbox-based header organization
- Card-based content containers
- Responsive scaling for different screen sizes
</image_analysis>

<development_planning>
1. Project Structure:
```
src/
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx
│   │   ├── Header.tsx
│   │   └── ContentArea.tsx
│   ├── features/
│   │   ├── PostEditor/
│   │   ├── SourceManager/
│   │   └── AIAssistant/
│   └── shared/
├── assets/
├── styles/
├── hooks/
└── utils/
```

2. Key Features:
- Multi-platform post management
- AI-assisted content generation
- Media attachment handling
- Character count validation
- Source integration management
- Post scheduling system

3. State Management:
```typescript
interface AppState {
  editor: {
    content: string;
    attachments: Attachment[];
    characterCount: number;
    selectedPlatforms: Platform[];
  };
  sources: {
    active: Source[];
    available: Source[];
    connected: boolean[];
  };
  ai: {
    generating: boolean;
    responses: Response[];
    context: Context;
  }
}
```

4. Component Architecture:
- PostEditor (Main content editor)
- PlatformTabs (Source management)
- AIAssistant (Content generation)
- MediaManager (Attachment handling)
- SourceIntegration (Platform connections)

5. Responsive Breakpoints:
```scss
$breakpoints: (
  'mobile': 320px,
  'tablet': 768px,
  'desktop': 1024px,
  'wide': 1440px
);
```
</development_planning>