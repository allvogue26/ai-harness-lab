# Product Spec: Iran War News Aggregator

## 1. Overview

**Product Name**: Iran War News Hub

**One-liner**: A real-time news aggregation dashboard tracking the Iran war, Strait of Hormuz crisis, and related geopolitical developments.

**Target Users**: 
- Investors and traders tracking oil/energy markets
- Policy researchers and analysts
- General public seeking consolidated war updates
- Journalists covering the conflict

**Core Value**: Centralized, categorized, and continuously updated news feed with key metrics and timeline tracking, saving users from visiting multiple sources.

---

## 2. Features (12 features)

### Feature 1: Real-time News Feed
**Priority**: P0
**User Story**: As a user, I want to see the latest Iran war news from multiple sources in one place so I don't have to check multiple websites.
**Acceptance Criteria**:
- [ ] Display news from CNN, BBC, Reuters, Al Jazeera, and local Iranian sources
- [ ] Auto-refresh every 5 minutes
- [ ] Show timestamp, source, headline, and summary
- [ ] Filter by source

### Feature 2: Category Filtering
**Priority**: P0
**User Story**: As a user, I want to filter news by category (Military, Diplomacy, Economic, Humanitarian) so I can focus on relevant topics.
**Acceptance Criteria**:
- [ ] Categories: Military Operations, Diplomatic Talks, Economic Impact, Humanitarian Crisis, Oil/Gas Markets
- [ ] Visual category badges on each article
- [ ] Click to filter
- [ ] Multi-select filtering

### Feature 3: Key Metrics Dashboard
**Priority**: P0
**User Story**: As a trader, I want to see key war metrics at a glance so I can understand the situation's severity.
**Acceptance Criteria**:
- [ ] Display: Days since conflict started, Oil price change, Ships stranded, Casualties estimate
- [ ] Auto-updating counters
- [ ] Visual indicators (up/down arrows for oil prices)

### Feature 4: Interactive Timeline
**Priority**: P1
**User Story**: As a researcher, I want to see a chronological timeline of major events so I can understand how the conflict evolved.
**Acceptance Criteria**:
- [ ] Vertical timeline showing key events
- [ ] Click to expand event details
- [ ] Date-based navigation
- [ ] Filter by event type

### Feature 5: Strait of Hormuz Status
**Priority**: P0
**User Story**: As an investor, I want to see the current status of the Strait of Hormuz so I can assess shipping risks.
**Acceptance Criteria**:
- [ ] Visual map showing strait closure status
- [ ] Ships waiting counter
- [ ] Alternative routes information
- [ ] Historical traffic comparison

### Feature 6: Source Credibility Indicators
**Priority**: P1
**User Story**: As a user, I want to know the credibility and bias of news sources so I can contextualize the information.
**Acceptance Criteria**:
- [ ] Source metadata (location, typical bias, reliability score)
- [ ] Visual indicators for official vs. social media sources
- [ ] Hover for source details

### Feature 7: Breaking News Alerts
**Priority**: P1
**User Story**: As a user, I want to receive breaking news alerts so I don't miss critical developments.
**Acceptance Criteria**:
- [ ] Toast notifications for major events
- [ ] Browser notification support
- [ ] Configurable alert threshold (all news / major only)
- [ ] Sound option for alerts

### Feature 8: Article Archive & Search
**Priority**: P1
**User Story**: As a researcher, I want to search historical articles so I can find past coverage on specific topics.
**Acceptance Criteria**:
- [ ] Full-text search across all articles
- [ ] Date range filtering
- [ ] Keyword highlighting in results
- [ ] Export article list to CSV

### Feature 9: Market Impact Section
**Priority**: P1
**User Story**: As an investor, I want to see how the war is affecting oil prices and stock markets so I can make informed decisions.
**Acceptance Criteria**:
- [ ] Brent crude oil price chart (7d, 30d, 90d)
- [ ] Energy sector stock indices
- [ ] Gold price (safe haven indicator)
- [ ] Related commodity prices

### Feature 10: Multi-language Support
**Priority**: P2
**User Story**: As an international user, I want to read news in my language so I can better understand the content.
**Acceptance Criteria**:
- [ ] Auto-translate non-English sources
- [ ] Language selector (EN, AR, FA, ZH)
- [ ] Original text toggle

### Feature 11: AI-powered Summary
**Priority**: P1
**User Story**: As a busy user, I want AI-generated summaries of complex articles so I can quickly grasp key points.
**Acceptance Criteria**:
- [ ] "Summarize" button on each article
- [ ] 3-bullet point summary
- [ ] Key entities extraction (people, organizations, locations)

### Feature 12: Personal Watchlist
**Priority**: P2
**User Story**: As a user, I want to save specific topics or keywords to follow so I can track developments on issues I care about.
**Acceptance Criteria**:
- [ ] Save keywords (e.g., "Hormuz", "ceasefire", "oil embargo")
- [ ] Custom alert for watchlist items
- [ ] Saved articles collection

---

## 3. Technical Architecture

**Stack**:
- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Headless UI
- **State**: Zustand for global state, React Query for server state
- **Charts**: Recharts for market data
- **Backend**: FastAPI (Python)
- **Database**: SQLite (dev) → PostgreSQL (prod)
- **News API**: Integration with NewsAPI, RSS feeds, web scraping
- **AI**: Claude API for article summarization
- **Maps**: Leaflet.js for Hormuz map

**Data Model**:
```
Article:
  - id, title, summary, content, url, source, category
  - published_at, fetched_at, image_url
  - sentiment_score, entities[]

Source:
  - id, name, url, country, bias_rating, reliability_score

Metric:
  - id, name, value, unit, updated_at, chart_data[]

Event:
  - id, title, description, date, category, importance
```

---

## 4. Visual Design Direction

**Overall Style**: 
- Professional news dashboard aesthetic
- Dark mode by default (easier on eyes for monitoring)
- Clean, information-dense layout
- Red accent color for alerts/breaking news

**Color Palette**:
- Background: #0f172a (slate-900)
- Card background: #1e293b (slate-800)
- Primary text: #f1f5f9 (slate-100)
- Secondary text: #94a3b8 (slate-400)
- Accent/Alert: #ef4444 (red-500)
- Success/Positive: #22c55e (green-500)
- Category colors:
  - Military: #dc2626 (red)
  - Diplomacy: #2563eb (blue)
  - Economic: #16a34a (green)
  - Humanitarian: #ea580c (orange)

**Key UI Patterns**:
- Card-based news grid
- Sticky metrics header
- Collapsible sidebar for filters
- Toast notifications for breaking news

---

## 5. Sprint Planning (6 sprints)

### Sprint 1: Foundation & Core Feed
**Features**: News Feed (F1), Category Filtering (F2), Basic Layout
**Success Criteria**:
- [ ] News feed displays mock data
- [ ] Category filters work
- [ ] Responsive layout implemented
- [ ] Dark mode UI complete

### Sprint 2: Metrics & Dashboard
**Features**: Key Metrics Dashboard (F3), Strait of Hormuz Status (F5)
**Success Criteria**:
- [ ] Metrics display with auto-update
- [ ] Hormuz map visualization
- [ ] Counter animations working

### Sprint 3: Timeline & Market Data
**Features**: Interactive Timeline (F4), Market Impact Section (F9)
**Success Criteria**:
- [ ] Timeline renders events
- [ ] Oil price chart displays
- [ ] Historical data navigation

### Sprint 4: AI Features & Search
**Features**: AI-powered Summary (F11), Article Archive & Search (F8)
**Success Criteria**:
- [ ] Claude API integration for summaries
- [ ] Full-text search working
- [ ] Export to CSV functional

### Sprint 5: Alerts & Personalization
**Features**: Breaking News Alerts (F7), Personal Watchlist (F12)
**Success Criteria**:
- [ ] Toast notifications display
- [ ] Browser notifications work
- [ ] Watchlist CRUD operations

### Sprint 6: Polish & Internationalization
**Features**: Source Credibility (F6), Multi-language Support (F10)
**Success Criteria**:
- [ ] Source badges displayed
- [ ] Translation working for 2+ languages
- [ ] Performance optimized (<2s load)

---

## 6. AI Integration Points

1. **Article Summarization**: Use Claude to generate 3-bullet summaries of long articles
2. **Sentiment Analysis**: Analyze article tone (escalatory / de-escalatory)
3. **Entity Extraction**: Auto-tag people, organizations, locations mentioned
4. **Trend Detection**: Identify emerging topics across multiple sources
5. **Translation**: Auto-translate non-English source articles

---

## Appendix: Sample User Flow

1. User lands on dashboard
2. Sees real-time metrics (oil price ↑ 3%, 2,000 ships waiting)
3. Scrolls through categorized news feed
4. Clicks "Diplomatic Talks" filter
5. Reads AI summary of latest ceasefire article
6. Adds "ceasefire" to watchlist
7. Receives breaking news alert when new development occurs

---

Generated by Planner Agent
Date: 2026-03-28
