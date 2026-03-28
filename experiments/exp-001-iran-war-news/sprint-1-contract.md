# Sprint 1 Contract: Foundation & Core Feed

## Sprint Goal
Build the foundational UI and core news feed functionality with mock data, establishing the dark-mode dashboard aesthetic and category filtering system.

## Implementation Details

### Features to Build
1. **News Feed (F1)**: Display news cards with headline, source, timestamp, summary
2. **Category Filtering (F2)**: Military, Diplomacy, Economic, Humanitarian badges + filter buttons
3. **Basic Layout**: Header, sidebar filters, main content area, responsive design
4. **Dark Mode UI**: Implement complete dark mode color scheme

### Technical Approach
- React + Vite + TypeScript setup
- Tailwind CSS for styling
- Mock data in JSON format
- Zustand for filter state management
- Component structure: Header, Sidebar, NewsCard, NewsFeed, CategoryFilter

### Testable Behaviors
- [ ] Page loads with dark theme applied
- [ ] 10+ mock news articles display in feed
- [ ] Each article shows: category badge, headline, source, time, summary
- [ ] Clicking category filter button filters visible articles
- [ ] "All" button resets filter
- [ ] Layout is responsive (mobile: single column, desktop: sidebar + main)
- [ ] No console errors

## Definition of Done
- All testable behaviors pass
- UI matches design spec colors
- Code is committed to git
- Ready for Evaluator review
