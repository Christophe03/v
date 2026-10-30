import React from 'react';
import { SlidersHorizontal, Check } from 'lucide-react';

interface CategoryFilterBarProps {
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedDietary: string[];
  toggleDietary: (tag: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  totalProductsCount: number;
}

export const CATEGORIES = [
  { id: 'all', label: 'All Marketplace' },
  { id: 'produce', label: 'Fresh Produce & Roots' },
  { id: 'bakery', label: 'Stone-Milled Bakery' },
  { id: 'dairy', label: 'Pasture Cheeses & Butter' },
  { id: 'pantry', label: 'Cold-Pressed Pantry' },
  { id: 'orchard', label: 'Orchard Fruits' }
];

export const DIETARY_OPTIONS = [
  'Bio',
  'Local',
  'Heirloom',
  'AOP',
  'Gluten Free'
];

export const CategoryFilterBar: React.FC<CategoryFilterBarProps> = ({
  selectedCategory,
  setSelectedCategory,
  selectedDietary,
  toggleDietary,
  sortBy,
  setSortBy,
  totalProductsCount
}) => {
  return (
    <div className="space-y-4 mb-8">
      {/* Category Segmented Navigation */}
      <div className="flex items-center gap-1.5 p-1 bg-[#edeeef] rounded-xl overflow-x-auto no-scrollbar">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                isActive
                  ? 'bg-white text-[#0d631b] shadow-sm font-bold'
                  : 'text-[#40493d] hover:text-[#191c1d] hover:bg-white/50'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Sub-Filters: Dietary Filters + Sort & Counter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-2 border-b border-[#e7e8e9]">
        
        {/* Dietary Filter Segmented Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-medium text-[#707a6c] flex items-center gap-1 mr-1">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filter:</span>
          </span>

          {DIETARY_OPTIONS.map((tag) => {
            const isSelected = selectedDietary.includes(tag);
            return (
              <button
                key={tag}
                onClick={() => toggleDietary(tag)}
                className={`text-xs px-2.5 py-1 rounded-md transition-all flex items-center gap-1.5 cursor-pointer font-medium border ${
                  isSelected
                    ? 'bg-[#cbffc2] text-[#002204] border-[#88d982] shadow-xs'
                    : 'bg-white text-[#40493d] border-[#d9dadb] hover:border-[#707a6c]'
                }`}
              >
                {isSelected && <Check className="w-3 h-3 text-[#0d631b]" />}
                <span>{tag}</span>
              </button>
            );
          })}

          {selectedDietary.length > 0 && (
            <button
              onClick={() => {
                DIETARY_OPTIONS.forEach(tag => {
                  if (selectedDietary.includes(tag)) toggleDietary(tag);
                });
              }}
              className="text-xs text-[#ac0c18] hover:underline cursor-pointer ml-1 font-medium"
            >
              Reset
            </button>
          )}
        </div>

        {/* Counter and Sort Dropdown */}
        <div className="flex items-center gap-4 text-xs text-[#40493d] shrink-0">
          <span className="tabular-nums">
            Showing <strong className="font-semibold text-[#191c1d]">{totalProductsCount}</strong> artisanal items
          </span>

          <div className="flex items-center gap-1.5">
            <label htmlFor="sort-select" className="text-[#707a6c]">Sort:</label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-[#d9dadb] rounded-lg px-2.5 py-1 text-xs text-[#191c1d] focus:border-[#0d631b] focus:outline-none cursor-pointer"
            >
              <option value="featured">Featured First</option>
              <option value="distance">Nearest Producer First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

      </div>
    </div>
  );
};
