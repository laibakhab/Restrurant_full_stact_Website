'use client';

import React, { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, UtensilsCrossed } from 'lucide-react';
import MenuCard from '@/components/MenuCard';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const MenuPage = () => {
  const [items, setItems] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch('/api/menu');
        const data = await res.json();
        setItems(data.items || []);
        setCategories([{ name: 'All', slug: 'all' }, ...(data.categories || [])]);
      } catch (error) {
        console.error('Failed to fetch menu', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  const toggleFilter = (filter: string) => {
    setActiveFilters(prev => 
      prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
    );
  };

  const filteredItems = items.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category.slug === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilters = activeFilters.length === 0 || 
                          activeFilters.every(f => item.tags?.includes(f.toLowerCase()));
    
    return matchesCategory && matchesSearch && matchesFilters;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 pt-8 pb-4 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Explore Our Menu</h1>
          
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search for dishes..."
                className="w-full pl-10 pr-4 py-3 bg-gray-100 border-none rounded-2xl focus:ring-2 focus:ring-orange-500 transition-all outline-none text-gray-900"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
              {['Veg', 'Spicy', 'Popular'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => toggleFilter(filter)}
                  className={cn(
                    "px-4 py-2 rounded-xl border text-sm font-semibold transition-all whitespace-nowrap",
                    activeFilters.includes(filter)
                      ? "bg-orange-600 border-orange-600 text-white shadow-md"
                      : "bg-white border-gray-200 text-gray-600 hover:border-orange-500 hover:text-orange-600"
                  )}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Categories Horizontal Scroll */}
          <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar border-t border-gray-100 pt-4">
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setSelectedCategory(cat.slug)}
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap uppercase tracking-wider",
                  selectedCategory === cat.slug
                    ? "bg-orange-100 text-orange-600 ring-2 ring-orange-500"
                    : "text-gray-500 hover:text-orange-600 hover:bg-orange-50"
                )}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mb-4"></div>
            <p className="text-gray-500 font-medium">Loading deliciousness...</p>
          </div>
        ) : filteredItems.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            <AnimatePresence mode='popLayout'>
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <MenuCard
                    id={item.id}
                    name={item.name}
                    price={item.price}
                    description={item.description}
                    image={item.image}
                    category={item.category.slug}
                    tags={item.tags}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
            <UtensilsCrossed size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No dishes found</h3>
            <p className="text-gray-500">Try adjusting your filters or search query.</p>
            <button 
              onClick={() => {setSelectedCategory('all'); setSearchQuery(''); setActiveFilters([]);}}
              className="mt-6 text-orange-600 font-bold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuPage;
