'use client';

import React from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { updateQuantity, removeItem } from '@/store/cartSlice';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from 'lucide-react';

const CartPage = () => {
  const [mounted, setMounted] = React.useState(false);
  const dispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.cart);
  
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const totalAmount = items.reduce((total, item) => total + item.price * item.quantity, 0);

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <div className="bg-orange-50 p-6 rounded-full mb-6">
          <ShoppingBag size={64} className="text-orange-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-8 text-center max-w-md">
          Looks like you haven't added anything to your cart yet. Go ahead and explore our delicious menu.
        </p>
        <Link 
          href="/menu" 
          className="px-8 py-3 bg-orange-600 text-white font-bold rounded-full hover:bg-orange-700 transition shadow-lg"
        >
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/menu" className="p-2 bg-white rounded-full text-gray-600 hover:text-orange-600 shadow-sm border border-gray-100">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-3xl font-extrabold text-gray-900">Your Cart</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items List */}
          <div className="lg:w-2/3 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="h-24 w-24 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                </div>
                
                <div className="flex-grow">
                  <h3 className="font-bold text-gray-900 text-lg">{item.name}</h3>
                  <p className="text-orange-600 font-bold mb-2">Rs. {item.price}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center bg-gray-100 rounded-lg p-1">
                      <button 
                        onClick={() => dispatch(updateQuantity({ id: item.id, delta: -1 }))}
                        className="p-1 hover:bg-white hover:text-orange-600 rounded-md transition text-gray-500"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center font-bold text-gray-900">{item.quantity}</span>
                      <button 
                        onClick={() => dispatch(updateQuantity({ id: item.id, delta: 1 }))}
                        className="p-1 hover:bg-white hover:text-orange-600 rounded-md transition text-gray-500"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    
                    <button 
                      onClick={() => dispatch(removeItem(item.id))}
                      className="text-gray-400 hover:text-red-500 transition p-2"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>Rs. {totalAmount}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span className="text-green-600 font-medium">FREE</span>
                </div>
                <div className="border-t border-gray-100 pt-4 flex justify-between text-gray-900 font-bold text-xl">
                  <span>Total</span>
                  <span>Rs. {totalAmount}</span>
                </div>
              </div>
              
              <Link 
                href="/checkout"
                className="w-full inline-block text-center py-4 bg-orange-600 text-white font-bold rounded-2xl hover:bg-orange-700 transition shadow-lg"
              >
                Proceed to Checkout
              </Link>
              
              <div className="mt-6 flex items-center justify-center gap-2 text-gray-500 text-sm">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Order will be delivered in 30-45 mins
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
