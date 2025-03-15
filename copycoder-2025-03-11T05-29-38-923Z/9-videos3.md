<summary_title>
Video Generation Settings & Premium Feature Page
</summary_title>

<image_analysis>
1. Content Structure:
- Main Content Elements: Toggle switches for video options, premium feature card, sample video previews
- Content Grouping: Settings section at top, premium message in middle, video examples below
- Visual Hierarchy: Settings > Premium message > Sample videos > CTA button
- Content Types: Toggle switches, text content, image previews, button
- Text Elements: "Choose Captions" heading, toggle labels, premium feature message, CTA button text

2. Layout Structure:
- Content Distribution: Vertical flow with clear sections
- Spacing Patterns: Consistent padding between sections, card-based layout
- Container Structure: White cards with rounded corners containing content
- Grid/Alignment: Single column layout with 3-column grid for preview images
- Responsive Behavior: Preview grid likely shifts to single column on mobile

3. UI Components (Page-Specific):
- Content Cards: Premium feature message card, preview image cards
- Interactive Elements: 3 toggle switches, "Generate" CTA button
- Data Display Elements: Toggle state indicators
- Status Indicators: Active/inactive toggle states
- Media Components: 3 preview image containers

4. Interactive Patterns:
- Content Interactions: Toggle switches for features, clickable CTA
- State Changes: Toggle on/off states, button hover states
- Dynamic Content: Premium status message
- Mobile Interactions: Touch-friendly toggle sizes, tappable areas

</image_analysis>

<development_planning>
1. Component Structure:
- VideoSettingsToggle component for options
- PremiumFeatureCard component
- VideoPreviewGrid component
- GenerateButton component
- Props for toggle states, premium status
- State management for settings configuration

2. Content Layout:
- Flexbox for vertical content flow
- CSS Grid for preview images
- Responsive breakpoints for preview grid
- Consistent spacing variables

3. Integration Points:
- Theme tokens for colors and typography
- Shared button and toggle components
- Premium feature state management
- Video generation service integration

4. Performance Considerations:
- Lazy loading for preview images
- Optimized toggle state management
- Minimal re-renders for settings changes
- Efficient premium status checking
</development_planning>