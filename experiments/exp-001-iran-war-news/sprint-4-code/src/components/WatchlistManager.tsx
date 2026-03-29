import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Plus, X, Trash2, Filter } from 'lucide-react';
import { useWatchlistStore } from '../store/watchlistStore';

export function WatchlistManager() {
  const { keywords, addKeyword, removeKeyword, clearWatchlist } = useWatchlistStore();
  const [newKeyword, setNewKeyword] = useState('');
  const [showInput, setShowInput] = useState(false);

  const handleAdd = () => {
    if (newKeyword.trim()) {
      addKeyword(newKeyword.trim());
      setNewKeyword('');
      setShowInput(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAdd();
    } else if (e.key === 'Escape') {
      setShowInput(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-800 rounded-lg p-5 border border-slate-700 mb-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-yellow-500" />
          <h3 className="font-semibold text-slate-200">My Watchlist</h3>
          <span className="px-2 py-0.5 rounded-full bg-slate-700 text-slate-400 text-xs">
            {keywords.length}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          {!showInput && (
            <button
              onClick={() => setShowInput(true)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-700 text-slate-300 text-sm hover:bg-slate-600 transition"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          )}
          {keywords.length > 0 && (
            <button
              onClick={clearWatchlist}
              className="p-1.5 text-slate-500 hover:text-red-400 transition"
              title="Clear all"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {showInput && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-4"
        >
          <div className="flex gap-2">
            <input
              type="text"
              value={newKeyword}
              onChange={(e) => setNewKeyword(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter keyword to track..."
              className="flex-1 px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
              autoFocus
            />
            <button
              onClick={handleAdd}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-500 transition"
            >
              Add
            </button>            
            <button
              onClick={() => setShowInput(false)}
              className="p-2 text-slate-500 hover:text-slate-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>          
          <p className="text-xs text-slate-500 mt-2">
            Press Enter to add, Escape to cancel
          </p>
        </motion.div>
      )}

      {keywords.length === 0 ? (
        <div className="text-center py-6 text-slate-500">
          <Filter className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">No keywords in watchlist</p>
          <p className="text-xs mt-1">Add keywords to highlight matching articles</p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {keywords.map((keyword) => (
            <motion.span
              key={keyword}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-sm"
            >
              {keyword}
              <button
                onClick={() => removeKeyword(keyword)}
                className="p-0.5 hover:bg-yellow-500/20 rounded transition"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.span>
          ))}
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-slate-700">
        <p className="text-xs text-slate-500">
          Articles matching your watchlist keywords will be highlighted with a yellow border.
        </p>
      </div>
    </motion.div>
  );
}
