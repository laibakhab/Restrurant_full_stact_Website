'use client';

import React from 'react';
import { Plus, ShoppingCart } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addItem, setCartOpen } from '@/store/cartSlice';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface MenuCardProps {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  tags?: string[];
}

const MenuCard: React.FC<MenuCardProps> = ({ id, name, price, description, image, category, tags = [] }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addItem({ id, name, price, quantity: 1, image }));
    dispatch(setCartOpen(true));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden group"
    >
      <div className="relative h-56 w-full overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span 
              key={tag} 
              className={cn(
                "px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full text-white shadow-md",
                tag === 'veg' ? "bg-green-600" : tag === 'spicy' ? "bg-[#E31837]" : "bg-[#27251F]"
              )}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-black text-xl text-[#27251F] uppercase tracking-tighter leading-none">{name}</h3>
        </div>
        <p className="text-gray-500 text-sm mb-6 line-clamp-2 min-h-[40px]">
          {description}
        </p>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
          <span className="font-black text-2xl text-[#E31837]">Rs. {price}</span>
          <button
            onClick={handleAddToCart}
            className="p-3 bg-[#E31837] text-white rounded-2xl hover:bg-[#27251F] transition-all transform hover:scale-110 shadow-lg"
          >
            <Plus size={24} strokeWidth={3} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default MenuCard;
