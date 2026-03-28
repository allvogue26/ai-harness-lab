# Experiment 001: Iran War News Hub

## Overview
First experiment with the AI Harness Lab framework - building a real-time news aggregation dashboard for the Iran war.

## Experiment Log

### Phase 1: Planning
**Date**: 2026-03-28
**Duration**: ~30 min
**Cost**: $0 (manual)

**Planner Output**:
- 12 features defined across 6 sprints
- Clear technical architecture
- Visual design direction with dark theme

**Key Decisions**:
- React + Vite + Tailwind stack
- Dark mode by default (easier on eyes for monitoring)
- Category-based filtering system
- Mock data for Sprint 1 (real APIs in later sprints)

### Phase 2: Sprint 1 Implementation
**Date**: 2026-03-28
**Duration**: ~2 hours
**Cost**: $0 (manual implementation)

**What Was Built**:
- 10 mock news articles
- Category filtering (Military, Diplomacy, Economic, Humanitarian)
- Responsive layout with sidebar
- Dark theme UI
- Key metrics sidebar

**Code Stats**:
- 12 files
- ~800 lines of code
- 5 React components

### Phase 3: Evaluation
**Date**: 2026-03-28
**Score**: 88/100 ✅ PASS

**Strengths**:
- Clean component architecture
- Good TypeScript usage
- Responsive design
- Consistent visual design

**Areas for Improvement**:
- Could add more visual polish (gradients, shadows)
- Missing error boundaries
- No loading states yet

## Results

### GitHub Repository
- **Experiment Directory**: `experiments/exp-001-iran-war-news/`
- **Code**: `sprint-1-code/`
- **Live Preview**: Can run locally with `npm run dev`

### Screenshots
(To be captured)

## Lessons Learned

### What Worked
1. **Sprint Contract**: Having clear testable behaviors before coding kept focus
2. **Component Separation**: Splitting UI into logical components (Header, NewsCard, etc.) made development smooth
3. **Zustand**: Simple and effective for filter state

### What Could Be Improved
1. **Mock Data**: Would be better to have real API integration from start
2. **Styling**: Tailwind is fast but could use a design system/tokens
3. **Testing**: No automated tests yet

## Next Steps

### Sprint 2: Metrics & Dashboard
- Key Metrics Dashboard (F3)
- Strait of Hormuz status map
- Animated counters

### Future Sprints
- Sprint 3: Timeline & Market Data
- Sprint 4: AI Summarization
- Sprint 5: Alerts & Watchlist
- Sprint 6: Polish & i18n

## Conclusion

Sprint 1 validates the Harness approach:
- ✅ Clear spec led to focused implementation
- ✅ Evaluator criteria caught potential issues early
- ✅ Result is production-quality foundation

Ready to proceed to Sprint 2!
