# Sprint 3 Contract: Timeline & Market Impact

## Sprint Goal
Build an interactive timeline of major war events and add oil price chart visualization to show market impact.

## Implementation Details

### Features to Build
1. **Interactive Timeline (F4)**:
   - Vertical timeline showing key events since Feb 27
   - Expandable event cards with details
   - Category-based filtering (Military/Diplomatic/Economic)
   - Date-based navigation

2. **Market Impact Section (F9)**:
   - Oil price chart (Brent crude, 30-day view)
   - Interactive chart with hover details
   - Price change indicators
   - Alternative: Gold price as safe haven indicator

### Technical Approach
- Use `recharts` for chart visualization
- Create vertical timeline component with framer-motion animations
- Mock historical data for oil prices
- Event data from real war timeline

### Testable Behaviors
- [ ] Timeline displays 8+ major events chronologically
- [ ] Clicking event expands to show details
- [ ] Oil price chart renders with data points
- [ ] Chart shows hover tooltip with exact price/date
- [ ] Timeline filters work by category
- [ ] Smooth scroll navigation

## Definition of Done
- Timeline is informative and visually clear
- Chart is interactive and responsive
- All animations smooth at 60fps
- Mobile-responsive design
