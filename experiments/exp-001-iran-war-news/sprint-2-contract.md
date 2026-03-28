# Sprint 2 Contract: Metrics Dashboard & Strait Visualization

## Sprint Goal
Build an animated metrics dashboard and visualize the Strait of Hormuz status with an interactive map representation.

## Implementation Details

### Features to Build
1. **Key Metrics Dashboard (F3)**: 
   - 4 animated counters (Days in Conflict, Oil Price, Ships Stranded, Casualties)
   - Auto-updating with smooth number transitions
   - Visual indicators (up/down arrows)

2. **Strait of Hormuz Map (F5)**:
   - SVG-based map visualization
   - Show strait closure status
   - Animated traffic indicators
   - Alternative routes display

### Technical Approach
- Use `framer-motion` for smooth counter animations
- Create custom SVG components for the map
- Add pulsing indicators for live status
- Implement hover interactions

### Testable Behaviors
- [ ] Metrics animate on page load (count up effect)
- [ ] Numbers update smoothly when data changes
- [ ] Map displays with clear visual status indicators
- [ ] "Effectively Closed" status is prominently displayed
- [ ] All animations run at 60fps
- [ ] Responsive on mobile and desktop

## Definition of Done
- All metrics have animated transitions
- Map is visually clear and informative
- No performance issues (jank-free animations)
- Accessible (reduced motion support)
