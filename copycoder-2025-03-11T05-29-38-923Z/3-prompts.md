<summary_title>
Prompt Management Dashboard - Content List View
</summary_title>

<image_analysis>
1. Content Structure:
- Main Content Elements: Data table displaying prompt information, search bar, "New Prompt" button
- Content Grouping: Tabular layout with columns for Title, Description, Content, Type, and Created At
- Visual Hierarchy: Column headers > row content > action buttons
- Content Types: Text data, badges, buttons, search input
- Text Elements: Column headers, prompt titles, descriptions, timestamps, type indicators

2. Layout Structure:
- Content Distribution: Full-width table with fixed columns
- Spacing Patterns: Consistent row height and padding, column spacing
- Container Structure: Main content area with search bar above table
- Grid/Alignment: Left-aligned text, right-aligned timestamps and actions
- Responsive Behavior: Horizontal scroll for narrow screens, fixed header

3. UI Components (Page-Specific):
- Content Cards/Containers: Table rows with alternating backgrounds
- Interactive Elements: Search field, "New Prompt" button, row action buttons
- Data Display Elements: Text badges for type (TEXT), timestamps
- Status Indicators: None visible
- Media Components: Small icons for actions

4. Interactive Patterns:
- Content Interactions: Sortable columns, searchable content
- State Changes: Hover states for rows and buttons
- Dynamic Content: Real-time updates for "Created At" times
- Mobile Interactions: Touch-friendly row heights and button sizes

</image_analysis>

<development_planning>
1. Component Structure:
- PromptTable component with sortable columns
- SearchBar component with filtering capability
- PromptRow component for individual entries
- ActionButton component for copy/delete actions
- TypeBadge component for displaying prompt types

2. Content Layout:
- CSS Grid or Table layout for consistent column alignment
- Flexbox for row content alignment
- Responsive container queries for mobile adaptation
- Virtual scrolling for large datasets

3. Integration Points:
- Global styling variables for colors and spacing
- Shared button and input components
- Common table patterns and behaviors
- Data fetching and state management integration

4. Performance Considerations:
- Implement pagination or infinite scroll
- Lazy loading for large datasets
- Debounced search functionality
- Memoized row components to prevent unnecessary rerenders
- Optimized sorting and filtering operations
</development_planning>