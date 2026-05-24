'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const categories = [
  { name: 'Biryani', slug: 'biryani', icon: '🍚' },
  { name: 'BBQ', slug: 'bbq', icon: '🔥' },
  { name: 'Burgers', slug: 'burgers', icon: '🍔' },
  { name: 'Pizza', slug: 'pizza', icon: '🍕' },
  { name: 'Drinks', slug: 'drinks', icon: '🥤' },
  { name: 'Desserts', slug: 'desserts', icon: '🍦' },
];

const Categories = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-[#27251F] uppercase tracking-tighter mb-4">
            Browse by <span className="text-[#E31837]">Category</span>
          </h2>
          <div className="w-24 h-2 bg-[#E31837] mx-auto rounded-full"></div>
        </div>
        
        <div className="flex gap-6 overflow-x-auto pb-8 no-scrollbar md:justify-center">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <Link 
                href={`/menu?category=${cat.slug}`}
                className="flex flex-col items-center gap-4 p-8 bg-gray-50 rounded-[2.5rem] border-2 border-transparent hover:border-[#E31837] hover:bg-white hover:shadow-2xl transition-all min-w-[160px] group"
              >
                <span className="text-5xl group-hover:scale-125 transition-transform">{cat.icon}</span>
                <span className="font-black text-[#27251F] uppercase tracking-tighter text-lg">{cat.name}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
