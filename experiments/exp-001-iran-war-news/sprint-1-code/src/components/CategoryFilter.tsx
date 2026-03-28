import { useFilterStore } from '../store/filterStore';
import { Category } from '../types';

const categories: { id: Category | 'All'; label: string; color: string }[] = [
  { id: 'All', label: 'All News', color: 'bg-slate-700' },
  { id: 'Military', label: 'Military', color: 'bg-red-600' },
  { id: 'Diplomacy', label: 'Diplomacy', color: 'bg-blue-600' },
  { id: 'Economic', label: 'Economic', color: 'bg-green-600' },
  { id: 'Humanitarian', label: 'Humanitarian', color: 'bg-orange-600' },
];

export function CategoryFilter() {
  const { selectedCategory, setSelectedCategory } = useFilterStore();

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => setSelectedCategory(cat.id)}
          className={`
            px-4 py-2 rounded-full text-sm font-medium transition-all
            ${selectedCategory === cat.id
              ? `${cat.color} text-white shadow-lg`
              : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }
          `}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
