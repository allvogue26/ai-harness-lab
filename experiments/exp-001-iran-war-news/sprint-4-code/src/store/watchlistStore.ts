import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WatchlistState {
  keywords: string[];
  addKeyword: (keyword: string) => void;
  removeKeyword: (keyword: string) => void;
  clearWatchlist: () => void;
  isWatching: (text: string) => boolean;
}

export const useWatchlistStore = create<WatchlistState>()(
  persist(
    (set, get) => ({
      keywords: ['Hormuz', 'ceasefire'],
      
      addKeyword: (keyword: string) => {
        const trimmed = keyword.trim();
        if (trimmed && !get().keywords.includes(trimmed)) {
          set({ keywords: [...get().keywords, trimmed] });
        }
      },
      
      removeKeyword: (keyword: string) => {
        set({ keywords: get().keywords.filter(k => k !== keyword) });
      },
      
      clearWatchlist: () => set({ keywords: [] }),
      
      isWatching: (text: string) => {
        return get().keywords.some(keyword => 
          text.toLowerCase().includes(keyword.toLowerCase())
        );
      },
    }),
    {
      name: 'iran-news-watchlist',
    }
  )
);
