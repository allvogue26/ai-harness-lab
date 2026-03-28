import { NewsCard } from './NewsCard';
import { mockArticles } from '../data/mockData';
import { useFilterStore } from '../store/filterStore';
import { Article } from '../types';

export function NewsFeed() {
  const { selectedCategory } = useFilterStore();

  const filteredArticles: Article[] = selectedCategory === 'All'
    ? mockArticles
    : mockArticles.filter(a => a.category === selectedCategory);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-slate-200">
          Latest Updates
        </h2>
        <span className="text-sm text-slate-500">
          {filteredArticles.length} articles
        </span>
      </div>

      <div className="space-y-4">
        {filteredArticles.map((article) => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <div className="text-center py-12 text-slate-500">
          No articles found in this category.
        </div>
      )}
    </div>
  );
}
