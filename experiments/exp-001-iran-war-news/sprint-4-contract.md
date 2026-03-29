# Sprint 4 Contract: AI Summarization & Personal Watchlist

**Status:** ✅ COMPLETE  
**Completed:** 2026-03-29

## Sprint Goal
Add AI-powered article summarization and personal watchlist functionality for users to track specific topics.

## Implementation Details

### Features to Build
1. **AI-Powered Summary (F11)**:
   - "Summarize" button on each article
   - Generate 3-bullet point summary using mock AI
   - Extract key entities (people, organizations, locations)
   - Toggle between full text and summary view

2. **Personal Watchlist (F12)**:
   - Save keywords to follow (e.g., "Hormuz", "ceasefire", "oil embargo")
   - Add/remove keywords from watchlist
   - Highlight matching articles in feed
   - Filter feed by watchlist keywords
   - Persist watchlist in localStorage

### Technical Approach
- Use localStorage for persistence (no backend needed)
- Mock AI summary generation (can integrate real API later)
- Highlight text matching using regex
- Add Zustand store for watchlist state

### Testable Behaviors
- [x] Click "Summarize" shows 3-bullet summary
- [x] Toggle between summary and full text
- [x] Can add/remove keywords from watchlist
- [x] Watchlist persists after page refresh
- [x] Matching articles are highlighted
- [x] Can filter feed by watchlist
- [x] Keywords show in sidebar

## Definition of Done
- AI summary feature is functional
- Watchlist works end-to-end
- Data persists across sessions
- UI is intuitive and responsive
