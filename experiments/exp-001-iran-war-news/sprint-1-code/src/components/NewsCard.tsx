import { formatDistanceToNow } from 'date-fns';
import { ExternalLink, Clock } from 'lucide-react';
import { Article } from '../types';

interface NewsCardProps {
  article: Article;
}

const categoryColors: Record<string, string> = {
  Military: 'bg-red-600',
  Diplomacy: 'bg-blue-600',
  Economic: 'bg-green-600',
  Humanitarian: 'bg-orange-600',
};

export function NewsCard({ article }: NewsCardProps) {
  return (
    <article className="bg-slate-800 rounded-lg p-5 border border-slate-700 hover:border-slate-600 transition group">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-2 py-1 rounded text-xs font-semibold text-white ${categoryColors[article.category]}`}>
              {article.category}
            </span>
            <span className="text-xs text-slate-500">
              {article.source}
            </span>
          </div>
          
          <h3 className="text-lg font-semibold text-slate-100 mb-2 group-hover:text-blue-400 transition">
            {article.title}
          </h3>
          
          <p className="text-slate-400 text-sm leading-relaxed mb-3">
            {article.summary}
          </p>
          
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Clock className="w-3 h-3" />
            <time dateTime={article.publishedAt.toISOString()}>
              {formatDistanceToNow(article.publishedAt, { addSuffix: true })}
            </time>
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
