'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { toggleCart, updateQuantity, removeItem, setCartOpen } from '@/store/cartSlice';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const CartDrawer = () => {
  const dispatch = useDispatch();
  const { items, isOpen } = useSelector((state: RootState) => state.cart);
  
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => dispatch(setCartOpen(false))}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-[101] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="text-orange-600" size={24} />
                <h2 className="text-xl font-bold text-gray-900">Your Cart</h2>
                <span className="bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full text-xs font-bold">
                  {items.length} items
                </span>
              </div>
              <button 
                onClick={() => dispatch(setCartOpen(false))}
                className="p-2 hover:bg-gray-100 rounded-full transition"
              >
                <X size={24} className="text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-grow overflow-y-auto p-6 no-scrollbar">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="bg-orange-50 p-6 rounded-full mb-4">
                    <ShoppingBag size={48} className="text-orange-200" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Cart is empty</h3>
                  <p className="text-gray-500 mb-8 max-w-[200px]">
                    Looks like you haven't added any delicious food yet.
                  </p>
                  <button 
                    onClick={() => dispatch(setCartOpen(false))}
                    className="text-orange-600 font-bold hover:underline"
                  >
                    Start Ordering
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 group">
                      <div className="h-20 w-20 rounded-2xl overflow-hidden flex-shrink-0 bg-gray-100">
                        <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between mb-1">
                          <h4 className="font-bold text-gray-900 text-sm line-clamp-1">{item.name}</h4>
                          <button 
                            onClick={() => dispatch(removeItem(item.id))}
                            className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <p className="text-orange-600 font-bold text-sm mb-3">Rs. {item.price}</p>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center bg-gray-50 rounded-lg p-1 border border-gray-100">
                            <button 
                              onClick={() => dispatch(updateQuantity({ id: item.id, delta: -1 }))}
                              className="p-1 hover:bg-white rounded-md text-gray-500 hover:text-orange-600 transition"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-8 text-center text-xs font-bold text-gray-900">{item.quantity}</span>
                            <button 
                              onClick={() => dispatch(updateQuantity({ id: item.id, delta: 1 }))}
                              className="p-1 hover:bg-white rounded-md text-gray-500 hover:text-orange-600 transition"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-gray-100 bg-gray-50/50">
                <div className="flex justify-between mb-4">
                  <span className="text-gray-500 font-medium">Subtotal</span>
                  <span className="text-gray-900 font-bold text-lg">Rs. {subtotal}</span>
                </div>
                <div className="space-y-3">
                  <Link 
                    href="/checkout"
                    onClick={() => dispatch(setCartOpen(false))}
                    className="w-full flex items-center justify-center gap-2 py-4 bg-orange-600 text-white font-bold rounded-2xl hover:bg-orange-700 transition shadow-lg shadow-orange-200"
                  >
                    Checkout Now
                    <ArrowRight size={18} />
                  </Link>
                  <Link 
                    href="/cart"
                    onClick={() => dispatch(setCartOpen(false))}
                    className="w-full inline-block text-center py-3 text-orange-600 font-bold hover:bg-orange-50 rounded-2xl transition"
                  >
                    View Detailed Cart
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
