'use client';

import React from 'react';
import { Star, ShieldCheck, Heart, User } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Hero Section */}
      <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')" }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">Our Journey</h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            From a small street stall in 2010 to Karachi's most loved restaurant chain.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="flex flex-col lg:flex-row gap-16 items-center mb-24">
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-6">A Legacy of Taste</h2>
            <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
              <p>
                Founded by Chef Ahmed in the heart of Tariq Road, SpiceRoute began with a simple dream: to preserve the traditional recipes of Karachi while embracing the innovation of modern culinary techniques.
              </p>
              <p>
                We believe that great food starts with great ingredients. That's why we source our spices directly from the finest markets and our meat from trusted local farms. Every marinade is made fresh daily, and every Biryani is slow-cooked to perfection in heavy brass pots.
              </p>
              <p>
                Today, SpiceRoute is more than just a restaurant; it's a destination for families to gather, friends to celebrate, and food lovers to experience the true essence of Pakistani hospitality.
              </p>
            </div>
          </div>
          <div className="lg:w-1/2 relative">
             <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
               <img 
                 src="https://images.unsplash.com/photo-1583394293214-28dea15ee548?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                 className="w-full h-full object-cover" 
                 alt="Chef"
               />
             </div>
             <div className="absolute -bottom-8 -left-8 bg-orange-600 p-8 rounded-3xl text-white shadow-xl hidden md:block">
               <p className="text-4xl font-black mb-1">15+</p>
               <p className="text-sm uppercase tracking-widest font-bold">Years of Excellence</p>
             </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <div className="p-10 bg-gray-50 rounded-3xl text-center border border-gray-100 hover:border-orange-500 transition duration-300">
            <div className="inline-flex items-center justify-center p-4 bg-orange-100 text-orange-600 rounded-2xl mb-6">
              <ShieldCheck size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Quality Guaranteed</h3>
            <p className="text-gray-600">We never compromise on the quality of our ingredients or the standards of our kitchen.</p>
          </div>
          <div className="p-10 bg-gray-50 rounded-3xl text-center border border-gray-100 hover:border-orange-500 transition duration-300">
            <div className="inline-flex items-center justify-center p-4 bg-orange-100 text-orange-600 rounded-2xl mb-6">
              <Heart size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Made with Love</h3>
            <p className="text-gray-600">Every dish is prepared with passion and care, as if we were serving our own family.</p>
          </div>
          <div className="p-10 bg-gray-50 rounded-3xl text-center border border-gray-100 hover:border-orange-500 transition duration-300">
            <div className="inline-flex items-center justify-center p-4 bg-orange-100 text-orange-600 rounded-2xl mb-6">
              <Star size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Customer First</h3>
            <p className="text-gray-600">Your satisfaction is our ultimate goal. We strive to provide an exceptional experience.</p>
          </div>
        </div>

        {/* Chef Section */}
        <div className="bg-orange-600 rounded-[3rem] p-12 text-white flex flex-col md:flex-row items-center gap-12 overflow-hidden relative shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="w-48 h-48 rounded-full border-4 border-white overflow-hidden flex-shrink-0 z-10">
            <img src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover" alt="Head Chef" />
          </div>
          <div className="z-10">
            <span className="text-orange-200 font-bold uppercase tracking-widest text-sm block mb-2">Mastermind</span>
            <h2 className="text-4xl font-extrabold mb-4">Meet Chef Ahmed</h2>
            <p className="text-xl text-orange-50 leading-relaxed max-w-2xl italic">
              "Cooking is an art, and Karachi is my canvas. My goal is to make every person who tastes our food feel the rich history and vibrant energy of our beautiful city."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
