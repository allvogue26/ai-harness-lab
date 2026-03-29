import { formatDistanceToNow } from 'date-fns';
import { ExternalLink, Clock, Bell } from 'lucide-react';
import { Article } from '../types';
import { AISummary } from './AISummary';
import { useWatchlistStore } from '../store/watchlistStore';

interface NewsCardProps {
  article: Article;
}

const categoryColors: Record<string, string> = {
  Military: 'bg-red-600',
  Diplomacy: 'bg-blue-600',
  Economic: 'bg-green-600',
  Humanitarian: 'bg-orange-600',
};

function highlightKeywords(text: string, keywords: string[]): JSX.Element {
  if (keywords.length === 0) return <>{text}</>;
  
  const regex = new RegExp(`(${keywords.join('|')})`, 'gi');
  const parts = text.split(regex);
  
  return (
    <>
      {parts.map((part, index) => {
        const isMatch = keywords.some(k => k.toLowerCase() === part.toLowerCase());
        return isMatch ? (
          <mark key={index} className="bg-yellow-500/30 text-yellow-200 px-0.5 rounded">{part}</mark>
        ) : (
          <span key={index}>{part}</span>
        );
      })}
    </>
  );
}

export function NewsCard({ article }: NewsCardProps) {
  const { keywords, isWatching } = useWatchlistStore();
  const hasMatch = isWatching(article.title + ' ' + article.summary);

  return (
    <article className={`bg-slate-800 rounded-lg p-5 border transition group ${
      hasMatch ? 'border-yellow-500/50 shadow-lg shadow-yellow-500/10' : 'border-slate-700 hover:border-slate-600'
    }`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-2 py-1 rounded text-xs font-semibold text-white ${categoryColors[article.category]}`}>
              {article.category}
            </span>
            <span className="text-xs text-slate-500">
              {article.source}
            </span>
            {hasMatch && (
              <span className="flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-yellow-500/20 text-yellow-400">
                <Bell className="w-3 h-3" />
                Watchlist Match
              </span>
            )}
          </div>
          
          <h3 className="text-lg font-semibold text-slate-100 mb-2 group-hover:text-blue-400 transition">
            {highlightKeywords(article.title, keywords)}
          </h3>
          
          <p className="text-slate-400 text-sm leading-relaxed mb-3">
            {highlightKeywords(article.summary, keywords)}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Clock className="w-3 h-3" />
              <time dateTime={article.publishedAt.toISOString()}>
                {formatDistanceToNow(article.publishedAt, { addSuffix: true })}
              </time>
            </div>
            
            <AISummary article={article} />
          </div>
        </div>
        
        <a
          href={article.url}
          className="p-2 text-slate-500 hover:text-blue-400 transition shrink-0"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </article>
  );
}
