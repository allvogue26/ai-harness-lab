import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { CategoryFilter } from './components/CategoryFilter';
import { NewsFeed } from './components/NewsFeed';

function App() {
  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
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
