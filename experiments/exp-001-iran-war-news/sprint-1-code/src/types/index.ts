export type Category = 'Military' | 'Diplomacy' | 'Economic' | 'Humanitarian';

export interface Article {
  id: string;
  title: string;
  summary: string;
  source: string;
  category: Category;
  publishedAt: Date;
  url: string;
  imageUrl?: string;
}

export type FilterState = {
  selectedCategory: Category | 'All';
  setSelectedCategory: (category: Category | 'All') => void;
};
