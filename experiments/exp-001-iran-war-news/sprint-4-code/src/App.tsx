import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { CategoryFilter } from './components/CategoryFilter';
import { NewsFeed } from './components/NewsFeed';
import { MetricsDashboard } from './components/MetricsDashboard';
import { StraitMap } from './components/StraitMap';
import { Timeline } from './components/Timeline';
import { MarketImpact } from './components/MarketImpact';
import { WatchlistManager } from './components/WatchlistManager';

function App() {
  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <MetricsDashboard />
            <StraitMap />
            <Timeline />
            <MarketImpact />
            <WatchlistManager />
            <CategoryFilter />
            <NewsFeed />
          </div>
          
          {/* Sidebar */}
          <Sidebar />
        </div>
      </main>
    </div>
  );
}

export default App;
