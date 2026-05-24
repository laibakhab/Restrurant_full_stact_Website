'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { toggleCart } from '@/store/cartSlice';
import { cn } from '@/lib/utils';
import CartDrawer from './CartDrawer';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dispatch = useDispatch();
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const { items } = useSelector((state: RootState) => state.cart);
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <nav className="sticky top-0 z-[100] bg-white border-b-4 border-[#E31837] shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-3xl font-black text-[#E31837] flex items-center gap-2 italic">
                SPICEROUTE
              </Link>
            </div>
            
            <div className="hidden lg:flex space-x-10 items-center">
              <Link href="/" className="text-[#27251F] hover:text-[#E31837] font-black uppercase tracking-tighter transition-colors">Home</Link>
              <Link href="/menu" className="text-[#27251F] hover:text-[#E31837] font-black uppercase tracking-tighter transition-colors">Menu</Link>
              <Link href="/gallery" className="text-[#27251F] hover:text-[#E31837] font-black uppercase tracking-tighter transition-colors">Gallery</Link>
              <Link href="/about" className="text-[#27251F] hover:text-[#E31837] font-black uppercase tracking-tighter transition-colors">About</Link>
              <Link href="/contact" className="text-[#27251F] hover:text-[#E31837] font-black uppercase tracking-tighter transition-colors">Contact</Link>
              
              <button 
                onClick={() => dispatch(toggleCart())}
                className="relative p-3 bg-[#27251F] text-white rounded-2xl hover:bg-[#E31837] transition-all transform hover:scale-110 shadow-lg"
              >
                <ShoppingCart size={24} />
                {mounted && itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 inline-flex items-center justify-center w-6 h-6 text-xs font-black leading-none text-white bg-[#E31837] border-2 border-white rounded-full">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
            
            <div className="lg:hidden flex items-center gap-4">
              <button 
                onClick={() => dispatch(toggleCart())}
                className="relative p-2 text-[#27251F]"
              >
                <ShoppingCart size={28} />
                {mounted && itemCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-[10px] font-black leading-none text-white bg-[#E31837] rounded-full">
                    {itemCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-[#27251F] p-2 hover:bg-gray-100 rounded-xl transition"
              >
                {isOpen ? <X size={32} /> : <Menu size={32} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={cn("lg:hidden bg-white border-t border-gray-100 transition-all duration-300 overflow-hidden", isOpen ? "max-h-screen" : "max-h-0")}>
          <div className="px-4 py-8 space-y-4">
            <Link href="/" onClick={() => setIsOpen(false)} className="block text-2xl font-black text-[#27251F] uppercase hover:text-[#E31837]">Home</Link>
            <Link href="/menu" onClick={() => setIsOpen(false)} className="block text-2xl font-black text-[#27251F] uppercase hover:text-[#E31837]">Menu</Link>
            <Link href="/gallery" onClick={() => setIsOpen(false)} className="block text-2xl font-black text-[#27251F] uppercase hover:text-[#E31837]">Gallery</Link>
            <Link href="/about" onClick={() => setIsOpen(false)} className="block text-2xl font-black text-[#27251F] uppercase hover:text-[#E31837]">About Us</Link>
            <Link href="/contact" onClick={() => setIsOpen(false)} className="block text-2xl font-black text-[#27251F] uppercase hover:text-[#E31837]">Contact</Link>
          </div>
        </div>
      </nav>
      <CartDrawer />
    </>
  );
};

export default Navbar;
